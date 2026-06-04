/**
 * 民法物権・見て聞いて覚える B列（LEARN_DEEPDIVE）を一括整形
 *
 *   node scripts/formatBukkenLearnB.mjs           # 確認のみ
 *   node scripts/formatBukkenLearnB.mjs --apply   # learn.js 反映
 *   node scripts/formatBukkenLearnB.mjs --apply --write-sheet  # シート B列も更新
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import dotenv from 'dotenv';
import { google } from 'googleapis';
import { formatLearnDeepdiveText } from './lib/formatLearnDeepdiveText.mjs';

/** 手修正・自動生成版（formatLearnDeepdiveText 適用前の素文） */
const MANUAL_RAW = {
  1: null, // Q2_MANUAL で上書き
  2: null, // Q3_MANUAL
  21: `1. 根拠（判例・法理）
結論：可能
Bが時効取得を完成させた後、Aが背信的悪意者であるGに売却した場合、BはGに対して登記なくして所有権を対抗できる。
根拠判例：最判昭43.11.15、最判昭36.11.22
判示：単なる悪意者ではなく、時効完成を知りながら害する目的で購入した背信的悪意者に対しては、占有者は登記がなくても所有権を主張できる。
考え方のポイント
177条の登記優先は信義則に反しない第三者への保護。GがBの時効完成を知り、嫌がらせ・追い出し目的で買った場合は背信的悪意者となり、177条の保護を受けない。
2. 具体例
状況：Bが20年占有して甲土地の時効取得を完成。AがBの完成を知るGに売却し、Gが登記まで完了
Gの意図：Bを追い出すためわざと買い取った
結果：Bは背信的悪意者Gに対して登記なくして所有権を主張できる
3. 過去問の急所（ひっかけ対策）
悪意者 vs 背信的悪意者
単に時効完成を知っているだけ（悪意者）→ 登記優先でGが勝ちやすい
→ 害する目的での購入（背信的悪意者）→ Bが登記なく対抗可能：○
4. 周辺知識
177条：不動産登記の対抗力
受験生へのアドバイス
「知っていた」（悪意）と「害する目的で買った」（背信的悪意）を必ず区別する。`,
  38: `1. 根拠（条文）
結論：可能
CがBから預かったゲーム機をデトウに盗まれた場合、Cは占有者としてデトウに対し返還請求および損害賠償請求ができる。
根拠条文：民法200条1項（占有回収の訴え）
占有者がその占有を侵奪されたときは、占有回収の訴えにより、その物の返還及び損害の賠償を請求することができる。
709条（不法行為）により窃盗等の損害賠償も請求可能。
2. 具体例
状況：Bが旅行の間、Cにゲーム機を預託。Cが保管中、デトウに盗まれた
Cの地位：Bから預かった占有者（所有権者ではない）
結果：Cはデトウ（侵奪者）に対し、占有回収の訴えで返還を、不法行為で損害賠償を請求できる
3. 過去問の急所（ひっかけ対策）
所有者でなくても占有回収
占有者であれば侵奪者に返還請求可能（200条）
→ 所有者でなければ請求できない：×
4. 周辺知識
201条3項：侵奪から1年以内の出訴
受験生へのアドバイス
Bが所有者、Cが占有者、デトウが侵奪者の三役を図解すると整理しやすい。`,
  39: `1. 根拠（条文・法理）
結論：可能
BがC（受寄者）に保管させていた物について、BがCに「Dのために保管せよ」と指図し、Dが承諾した場合、Dが占有権を取得する（指図による占有移転）。
根拠条文：民法184条（指図による占有移転）
占有者が他人に対し、その占有を移転するときは、その占有物を引き渡すことなく、指図の通知をするだけで足りる。
考え方のポイント
三者関係：指図者B・占有者C・指図を受けた者D。Dの承諾が必要。物はCが引き続き物理的に保持していても、法律上の占有はDに移転する。
2. 具体例
状況：B→Cにゲーム機を預託。後日BがCに「Dのために保管せよ」と指図、Dが承諾
結果：Cの手元にゲーム機があるままでも、占有権者はBからC→Dに移る
3. 過去問の急所（ひっかけ対策）
Dの承諾
指図＋Dの承諾で占有移転完成
→ 指図だけでDが自動的に占有者になる：×
4. 周辺知識
603条：賃貸借から指図占有移転の典型例も出題
受験生へのアドバイス
「誰が物理的に持っているか」と「誰が法律上の占有者か」は別。`,
  40: `1. 根拠（条文・法理）
結論：可能（ただし目かくしの設置義務あり）
境界線から1メートル未満の距離に窓・縁側・ベランダを設けること自体は可能だが、目かくしを設けなければならない。
根拠条文：民法235条1項
土地の所有者は、境界線から一メートル以内の距離に、窓、縁側、ベランダその他これらに類似する工作物を設けるときは、目かくしを設けなければならない。
2. 具体例
状況：自宅の2階に、隣地境界線から80cmの位置に窓を設けた
必要な対応：隣地からの視線を遮る目かくし（ブラインド・格子スクリーン等）の設置
3. 過去問の急所（ひっかけ対策）
1メートル未満
1m未満 → 目かくし必要
→ 1m以上なら目かくし不要：○
設置自体の可否
目かくしさえ設ければ、1m未満でも窓等の設置は可能
→ 1m未満では建てられない：×
4. 周辺知識
234条：境界から2m以内の開口部禁止（別ルール）
受験生へのアドバイス
「禁止」ではなく「条件付きで可能」が235条の結論。`,
};

const Q2_MANUAL = `**1. 根拠（判例・法理）**

**結論：可能**

一筆の土地のうち、占有されている「一部」についても、範囲が特定されていれば所有権の時効取得が認められる。

**根拠判例：[[red:最判昭46.10.25]]**

判示：一筆の土地の一部について占有が行われ、その占有部分が境界などにより特定されているときは、当該部分について取得時効を完成させることができる。

**根拠条文：**

民法162条1項（所有権の時効取得）

**考え方のポイント**

登記簿上は「一筆の土地」として一つの地番で管理されるが、時効取得は**事実上の占有の範囲**に応じて評価される。フェンスで囲んだ一角、継続して耕作している特定の区画など、**範囲が明確**なら一部でもOK。

**2. 具体例**

- 状況：一筆の大きな農地の一角（約100㎡）を、20年間フェンスで囲んで継続して使用していた
- 結果：占有部分が特定されているため、当該部分について所有権の時効取得が認められる

**3. 過去問の急所（ひっかけ対策）**

**[[c:#1565c0&b]]範囲の特定[[/c]]**
占有部分が境界・フェンス等で明確に特定されていれば一部でも可
→ 一筆の土地は全部まとめてしか時効取得できない：**[[red:×]]**

**4. 周辺知識**

- **162条2項**：一筆の土地の一部について所有権を取得した場合の登記
- **覚え方：**[[red:フェンスで囲んだ角＝その部分だけ時効OK]]

**受験生へのアドバイス**

「一筆＝登記上の単位」「占有＝事実上の単位」と分けて考える。`;

const Q3_MANUAL = `**1. 根拠（判例・法理）**

**結論：可能**

構成部分が変動する集合体でも、一定の範囲で特定されていれば、一つの目的物として譲渡担保権を設定できる。

**根拠判例：[[red:最判昭54.2.15（昭和54年のブタ）]]**

事案：養豚業者が、飼育中のブタ（将来生まれるものも含む）をまとめて譲渡担保の目的とした。

判示：「種類、所在場所及び量的範囲を指定するなどの方法により目的物の範囲が特定される場合には、一個の集合物として譲渡担保の目的とすることができる」

**考え方のポイント**

一物一権の原則に対し、**「枠組み（種類・場所・数量）」**さえ決まれば、中身が入れ替わっても全体を一つの担保として認める。

**2. 具体例**

- 種類：繁殖用・肥育用のブタ
- 所在場所：第1・第2養豚舎内
- 量的範囲：現在いる全頭＋将来搬入される全頭

親豚が入れ替わっても、養豚舎の「枠」の中にいる限り担保の効力が及ぶ。

**3. 過去問の急所（ひっかけ対策）**

**[[c:#1565c0&b]]特定の3要素[[/c]]**
種類・所在場所・量的範囲で特定する。
→ 個々の個体を耳標等で特定しなければならない：**[[red:×]]**

**対抗要件**
占有改定（183条）により行う。
**[[red:最判昭62.11.10]]**：占有改定後に新たに加わった動産にも、効力・対抗要件が及ぶ。

**将来の動産**
設定時にまだ存在しない動産も対象にできる。
→ 現在存在する動産に限られる：**[[red:×]]**

**4. 周辺知識**

- **即時取得（192条）**：善意の買主は個別のブタについて所有権を得うる
- **実行**：集合物全体の競売・帰属清算
- **覚え方：**[[red:昭和54年＝ブタ、62年＝後から入った分もOK]]

**受験生へのアドバイス**

「判例の認める非典型担保」として後半・担保総論で出やすい。**特定さえできていれば中身の入れ替わりはOK**がキモ。`;

const Q46_MANUAL = `**1. 根拠（条文・法理）**

**結論：その通り**

共有者の一人**G**は、無断で**共有地甲**に**乙建物**を建てて占有する**B**に対し、**建物の収去**・**土地の明け渡し**・**自己持分の損害賠償**を請求できる。

**根拠条文：**

民法252条5項（保存行為）
「各共有者は、……共有物の保存行為をすることができる。」

**考え方のポイント**

**物権的請求（収去・明渡）**：不法占拠者Bから共有地甲を取り戻す行為は「保存行為」。Gは**単独で**建物ごと・土地ごと請求できる。

**金銭請求（損害賠償）**：賃料相当額などは**可分債権**。Gが請求できるのは**自分の持分の範囲**のみ。

**2. 具体例**

（図解4コマと同じ流れ）

- **第1コマ**：共有者Gは、Bが共有地甲に無断で乙建物を建てたことに激怒。「B、共有地に勝手に建てるな！」
- **第2コマ**：GはBに請求書を渡し、「**建物収去・土地明渡・損害賠償**」を請求する。
- **第3コマ**：Bは困り果て、**Gの持分に応じた**損害賠償額を計算する（他共有者分までは請求されない）。
- **第4コマ**：裁判所はGの主張を認め、Bに**速やかな退去**と**賠償金の支払**を命じる。

**3. 過去問の急所（ひっかけ対策）**

**[[c:#1565c0&b]]単独でできること[[/c]]**
建物収去・土地明渡 → G一人で**全部**請求OK（保存行為）
→ 他共有者全員の同意が必要：**[[red:×]]**

**[[c:#1565c0&b]]持分に限られること[[/c]]**
損害賠償・不当利得 → **Gの持分のみ**請求可
→ 賃料相当額の全額をG一人が請求できる：**[[red:×]]**

**4. 周辺知識**

- **保存行為（252条5項）**：各共有者が単独でできる（不法占拠者への収去・明渡）
- **管理行為（252条1項）**：持分過半数
- **変更行為（251条1項）**：全員一致
- **覚え方：**[[red:追い出す＝G一人OK、お金＝持分だけ]]

**受験生へのアドバイス**

図のとおり **G＝共有者・B＝不法占拠者** で固定して覚える。請求書の3行（収去・明渡・賠償）のうち、**賠償だけ持分限定**が試験の分かれ目。`;

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const LEARN_FILE = path.join(__dirname, '../src/learn.js');
const SHEET = '民法物権';

function getAuth(write = false) {
  const scope = write
    ? 'https://www.googleapis.com/auth/spreadsheets'
    : 'https://www.googleapis.com/auth/spreadsheets.readonly';
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    return new google.auth.GoogleAuth({
      keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
      scopes: [scope],
    });
  }
  return process.env.GOOGLE_SHEETS_API_KEY;
}

function patchLearnDeepdive(nextDeepDive) {
  const fileContent = fs.readFileSync(LEARN_FILE, 'utf8');
  const start = fileContent.indexOf('export const LEARN_DEEPDIVE = ');
  const end = fileContent.indexOf('export const LEARN_F_EXPLAIN = ');
  if (start < 0 || end < 0) throw new Error('LEARN_DEEPDIVE block not found');
  return (
    fileContent.slice(0, start) +
    `export const LEARN_DEEPDIVE = ${JSON.stringify(nextDeepDive, null, 2)};\n` +
    fileContent.slice(end)
  );
}

async function writeSheetB(formattedByIndex) {
  const spreadsheetId = process.env.SHEET_ID;
  const auth = getAuth(true);
  const sheets = google.sheets({ version: 'v4', auth });
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${SHEET}!A:B`,
  });
  const dataRows = (res.data.values || []).slice(1);
  const updates = [];
  let cardIndex = 0;

  for (let i = 0; i < dataRows.length; i++) {
    if (cardIndex >= 105) break;
    const valA = (dataRows[i][0] || '').trim();
    if (!valA || valA === '問題' || valA === '肢' || valA.startsWith('科目')) continue;
    const formatted = formattedByIndex[cardIndex];
    if (formatted != null) {
      updates.push({ rowNum: i + 2, text: formatted });
    }
    cardIndex++;
  }

  const BATCH = 20;
  for (let i = 0; i < updates.length; i += BATCH) {
    const slice = updates.slice(i, i + BATCH);
    await sheets.spreadsheets.values.batchUpdate({
      spreadsheetId,
      requestBody: {
        valueInputOption: 'RAW',
        data: slice.map((u) => ({ range: `${SHEET}!B${u.rowNum}`, values: [[u.text]] })),
      },
    });
    console.log(`シート書込 ${Math.min(i + BATCH, updates.length)}/${updates.length}`);
    await new Promise((r) => setTimeout(r, 800));
  }
}

async function main() {
  const apply = process.argv.includes('--apply');
  const writeSheet = process.argv.includes('--write-sheet');

  const learnMod = require(LEARN_FILE);
  const src = [...(learnMod.LEARN_DEEPDIVE['民法物権'] || [])];
  const next = [...src];
  const changed = [];

  for (let i = 0; i < src.length && i < 105; i++) {
    const raw = src[i] || '';
    if (i === 1) {
      next[i] = Q2_MANUAL;
      if (Q2_MANUAL !== raw) {
        changed.push({ card: i + 1, beforeLen: raw.length, afterLen: Q2_MANUAL.length, note: 'Q2手修正版' });
      }
      continue;
    }
    if (i === 2) {
      next[i] = Q3_MANUAL;
      if (Q3_MANUAL !== raw) {
        changed.push({ card: i + 1, beforeLen: raw.length, afterLen: Q3_MANUAL.length, note: 'Q3手修正版' });
      }
      continue;
    }
    if (i === 45) {
      next[i] = Q46_MANUAL;
      if (Q46_MANUAL !== raw) {
        changed.push({ card: i + 1, beforeLen: raw.length, afterLen: Q46_MANUAL.length, note: 'Q46画像合わせ' });
      }
      continue;
    }
    const manualRaw = MANUAL_RAW[i];
    const source = manualRaw != null ? manualRaw : raw;
    if (!String(source).trim()) continue;
    const formatted = formatLearnDeepdiveText(source);
    if (formatted !== raw || manualRaw != null) {
      next[i] = formatted;
      changed.push({
        card: i + 1,
        beforeLen: raw.length,
        afterLen: formatted.length,
        nl: (formatted.match(/\n/g) || []).length,
        red: (formatted.match(/\[\[red:/g) || []).length,
        note: manualRaw != null ? '手動/自動生成' : undefined,
      });
    }
  }

  console.log(`民法物権: ${src.length} 問 / 整形 ${changed.length} 問`);
  for (const c of changed.slice(0, 5)) {
    console.log(`  Q${c.card}: ${c.beforeLen}→${c.afterLen}字, 改行${c.nl}, 赤${c.red}`);
  }
  if (changed.length > 5) console.log(`  …他 ${changed.length - 5} 問`);

  if (!apply) {
    console.log('\n--apply で learn.js に反映');
    return;
  }

  const patched = patchLearnDeepdive({ ...learnMod.LEARN_DEEPDIVE, 民法物権: next });
  fs.writeFileSync(LEARN_FILE, patched, 'utf8');
  console.log(`\n✓ learn.js 更新 (${changed.length} 問)`);

  if (writeSheet) {
    if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      console.warn('GOOGLE_APPLICATION_CREDENTIALS なし → シート未更新');
      return;
    }
    await writeSheetB(next);
    console.log('✓ スプレッドシート B列 更新完了');
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
