# Avatar Guidelines

## Shared Avatar Style

- Style: consistent flat editorial character, soft outlines, warm exam-coach atmosphere.
- Rendering: vector-like, simple shadows, no photorealistic skin texture.
- Line weight: medium and consistent across characters.
- Face: clear expression, small number of features, readable even as a small icon.
- Clothing: simple study-app friendly outfits; avoid excessive details that change between generations.
- Background: transparent or plain light background unless the app placement requires context.

## Core Characters

Define or update recurring characters here before generating many images.

### AI Teacher

- Role: explains legal traps, shows diagrams, encourages review.
- Visual cues: calm expression, small pointer or tablet, teal/blue accent.
- Mood range: neutral, encouraging, alert, celebrating.
- Avoid: overly childish mascot style, fantasy costume, dramatic poses.

### Learner Avatar

- Role: represents てらしぃ（あぷし）の受験生ペルソナ。アプリ選択は **male / female** の2種。
- 正本シート: `assets/images/characters/gyosei_student_male_sheet.png` / `gyosei_student_female_sheet.png`
- アプリアイコン: `assets/images/avatar_student_male.png` / `avatar_student_female.png`
- Visual cues: flat editorial、濃紺線、私服（ネイビークルーネック＋白襟／ティールニット＋白襟）。短髪黒髪（男）・肩丈ダークヘア（女）。ノート・六法はシート小物のみ。
- Mood range: thinking, noticing, correcting, confident.
- Avoid: スーツ標準化、行政書士バッジ、ちゃちゃロット混入、写実・3D・子どもっぽさ、性的強調。
- X: https://x.com/appshi113 （@appshi113）／表示名「あぷし / 行政書士受験生」。参考: `assets/x-profile-apushi.png`（画風はフラット版を優先）

## ちゃちゃロット（にっこり帽子）

通称: ちゃちゃロット / Chachalot。帽子のにっこり顔が名前の由来。  
視覚正本（両方開く）:

- アプリ本体: `assets/images/characters/chachalot.png`
- 教材図ポーズ正本（フクロウ枠）: `assets/approved-chachalot-pointer.png`（下の余白・指し棒）

新規のキャラクター生成、および案内役を含む教材図では、生成前に**この節と上記PNGを必ず開く**。プロンプトに「ちゃちゃロット」と名前を書く（無名の帽子マスコットにしない）。

### 役割

- Gyosei Quest / あぷし教材図の**標準案内役**。
- **役割は従来のフクロウと同じ。** 下の余白に小さく立ち、**指し棒**で暗記（または判断軸）を指すだけ。
- 中央の登場人物にしない。名札「ちゃちゃロット」は図に書かない。
- 緑の講師服＋指し棒。本文・矢印・表を隠さない。

### 固定デザイン

- 上部は耳ではなく、独立した「にっこり顔の帽子」。
- 帽子は薄い水色。左右の丸い山、中央の低い山、滑らかな長いツバを持つ。
- 帽子の顔は、左右の内側線と、にっこり閉じた2本の目。
- 顔は横長で丸く、左右に柔らかな頬の膨らみがある。
- 肌は薄いクリーム色。
- 輪郭は濃紺で、滑らかな曲線と均整の取れた線幅。
- 黒い瞳は左右同径・水平配置の真円。
- 白いハイライトも左右同径の真円で、各瞳の左上に置く。
- 鼻は小さな濃紺の楕円。小さな白い光を入れてよい。
- 鼻下から短い縦線、左右へ分かれる笑顔、下部に小さなコーラル色の口。
- 頬には左右4本の短い濃紺マークと、控えめなピンクの血色。
- 帽子と顔に、弱いセル塗りの陰影を加える。
- アプリの小サイズでも認識できる太さとコントラストを保つ。

### 禁止

- 帽子を猫耳、熊耳、フクロウ、犬などの身体部位として解釈しない。
- ひげ、マズル、毛、くちばし、羽、肉球、眼鏡を加えない。
- 瞳やハイライトを楕円、豆形、涙形、不規則形にしない。
- 輪郭に不自然な折れ、へこみ、二重線、切れ目を残さない。
- 勝手に左右非対称へ崩さない。
- 写実、3Dプラスチック、強いグラデーション、過度な光沢にしない。

### 最短生成手順

1. `approved-smiling-hat-mascot.png` を画像参照として必ず渡す。
2. キャラクターの形・顔・瞳を identity invariant として固定する。
3. ポーズ、衣装、小物だけを案件に合わせて変更する。
4. 初回生成時点から、滑らかな輪郭、真円の瞳と真円の光、薄水色の帽子、クリーム肌、濃紺線、コーラル口、弱いセル陰影を指定する。
5. 生成後に、瞳の真円、左右同径、輪郭の歪み、帽子の誤解釈、頬マーク数を目視確認する。
6. 不一致がある場合は全体を再設計せず、該当箇所だけ局所編集する。

### 標準プロンプト

```text
Create ちゃちゃロット (Chachalot), Gyosei Quest's niconico-hat guide.
Use `assets/images/characters/chachalot.png` and `approved-smiling-hat-mascot.png` as identity references.
Preserve exactly: the separate pale-sky-blue smiling hat, smooth brim,
wide pale-cream face, equal perfect-circle navy eyes, equal perfect-circle
white highlights in the upper-left, four navy cheek marks per side,
small oval nose, smiling mouth, and coral mouth interior.
Use smooth intentional navy outlines, restrained cel shading, soft blush,
and crisp app-ready rendering.
Change only the requested pose, clothing, or prop.
Do not reinterpret the hat as ears or convert the character into any animal.
No whiskers, muzzle, fur, beak, feathers, glasses, distorted circles,
wobbly outlines, text, watermark, or unrequested accessories.
```

### Green Owl Instructor（既存図のみ・移行前）

- Role: 過去の教材図ガイド。承認レイアウト見本 `assets/approved-shusaisha-kyoka.png` 右下に残る。
- **新規画像の標準案内役には使わない**（標準は **ちゃちゃロット**）。
- 既存フクロウ画像は、てらしぃから明示の移行指示があるまで変更・一括置換しない。
- 見本図内のフクロウは「余白・指示棒・本文を隠さない」役割の参考としてだけ読む。

## Avatar Prompt Skeleton

案内役以外（AI Teacher / Learner）向け。案内役は上記 **ちゃちゃロット** の標準プロンプトを使う。

```text
Create a consistent flat editorial avatar for Gyosei Quest.
Character: [AI Teacher / Learner Avatar].
Pose and emotion: [specific].
Style: simple vector-like illustration, warm exam-prep app, clean outlines, minimal shading, teal/blue/green accents, transparent or plain light background.
Keep the character consistent with previous Gyosei Quest avatars: rounded friendly face, readable expression, simple clothing, no photorealism.
Avoid text, complex background, excessive accessories, mascot fantasy elements.
```

## Consistency Rules

- Reuse the same character role, accent color, clothing type, and face proportions across prompts.
- For ちゃちゃロット, treat face/hat/eyes as invariants; change pose and expression only as much as the learning state requires.
- Do not generate a new avatar style for each subject.
- If a new avatar is approved, save one reference image under `assets/` and describe its stable traits here.
- Do not bulk-migrate owl diagrams to the smiling-hat character without an explicit migration request.
