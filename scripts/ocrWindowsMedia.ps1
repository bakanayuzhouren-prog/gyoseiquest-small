param(
  [Parameter(Mandatory = $true)]
  [string]$InputDir,

  [Parameter(Mandatory = $true)]
  [string]$OutputDir,

  [string]$Language = 'ja',
  [int]$Limit = 0
)

$ErrorActionPreference = 'Stop'

Add-Type -AssemblyName System.Runtime.WindowsRuntime

[Windows.Storage.StorageFile, Windows.Storage, ContentType = WindowsRuntime] | Out-Null
[Windows.Storage.FileAccessMode, Windows.Storage, ContentType = WindowsRuntime] | Out-Null
[Windows.Graphics.Imaging.BitmapDecoder, Windows.Graphics.Imaging, ContentType = WindowsRuntime] | Out-Null
[Windows.Media.Ocr.OcrEngine, Windows.Foundation, ContentType = WindowsRuntime] | Out-Null
[Windows.Globalization.Language, Windows.Globalization, ContentType = WindowsRuntime] | Out-Null

function AwaitOperation($operation, [type]$resultType) {
  $method = [System.WindowsRuntimeSystemExtensions].GetMethods() |
    Where-Object {
      $_.Name -eq 'AsTask' -and
      $_.IsGenericMethodDefinition -and
      $_.GetParameters().Count -eq 1 -and
      $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncOperation`1'
    } |
    Select-Object -First 1
  if ($null -eq $method) {
    throw 'Could not locate WindowsRuntimeSystemExtensions.AsTask<T>(IAsyncOperation<T>).'
  }
  $task = $method.MakeGenericMethod($resultType).Invoke($null, @($operation))
  $task.GetAwaiter().GetResult()
}

$root = (Resolve-Path '.').Path
$resolvedInput = (Resolve-Path -LiteralPath $InputDir).Path
New-Item -ItemType Directory -Force -Path $OutputDir | Out-Null

$engine = [Windows.Media.Ocr.OcrEngine]::TryCreateFromLanguage([Windows.Globalization.Language]::new($Language))
if ($null -eq $engine) {
  throw "Windows OCR language is not available: $Language"
}

$files = Get-ChildItem -LiteralPath $resolvedInput -File |
  Where-Object { $_.Extension -match '^\.(jpg|jpeg|png|webp)$' } |
  Sort-Object Name

if ($Limit -gt 0) {
  $files = $files | Select-Object -First $Limit
}

$manifest = @()
$i = 0
foreach ($item in $files) {
  $i += 1
  Write-Host "[$i/$($files.Count)] $($item.Name)"
  $file = AwaitOperation ([Windows.Storage.StorageFile]::GetFileFromPathAsync($item.FullName)) ([Windows.Storage.StorageFile])
  $stream = AwaitOperation ($file.OpenAsync([Windows.Storage.FileAccessMode]::Read)) ([Windows.Storage.Streams.IRandomAccessStream])
  try {
    $decoder = AwaitOperation ([Windows.Graphics.Imaging.BitmapDecoder]::CreateAsync($stream)) ([Windows.Graphics.Imaging.BitmapDecoder])
    $bitmap = AwaitOperation ($decoder.GetSoftwareBitmapAsync()) ([Windows.Graphics.Imaging.SoftwareBitmap])
    $result = AwaitOperation ($engine.RecognizeAsync($bitmap)) ([Windows.Media.Ocr.OcrResult])
    $text = [string]$result.Text
  }
  finally {
    if ($null -ne $stream) {
      $stream.Dispose()
    }
  }

  $outName = '{0:D3}-{1}.txt' -f $i, [System.IO.Path]::GetFileNameWithoutExtension($item.Name)
  $outPath = Join-Path $OutputDir $outName
  Set-Content -LiteralPath $outPath -Value $text -Encoding UTF8
  $manifest += [pscustomobject]@{
    index = $i
    file = $item.Name
    output = $outName
    length = $text.Length
  }
}

$manifestPath = Join-Path $OutputDir 'manifest.json'
$manifest | ConvertTo-Json -Depth 4 | Set-Content -LiteralPath $manifestPath -Encoding UTF8
Write-Host "Output: $OutputDir"

