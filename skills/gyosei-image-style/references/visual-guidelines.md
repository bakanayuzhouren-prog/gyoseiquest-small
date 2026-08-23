# Visual Guidelines

## Brand / X（てらしぃ）

- X: [あぷし / 行政書士受験生 @appshi113](https://x.com/appshi113)
- 教材図・プロンプト考案時は、てらしぃが過去に投稿・承認した図の密度・色分け・底部3カード構成を優先する。
- 承認済みレイアウト見本: `skills/gyosei-image-style/assets/approved-shusaisha-kyoka.png`（主宰者の許可 — 要る３つ / 要らないもの）
- 承認済み案内役: **ちゃちゃロット**（`assets/images/characters/chachalot.png` ＋ `approved-smiling-hat-mascot.png`）
- 詳細なキャラ固定仕様は `references/avatar-guidelines.md` の **ちゃちゃロット**。

## Design Direction

- Tone: friendly, serious, exam-focused（あぷしの投稿図と同系統）。
- Shape language: rounded panels, clear column headers, icon+短ラベルの行リスト、スタンプ／GOバッジで結論を見せる。
- Background: warm off-white / cream. Avoid dark, blurred, photographic, and heavy gradient backgrounds.
- Main colors（見本準拠）:
  - **Navy / deep blue**: タイトル帯・中立の手続・中央イラスト枠
  - **Green**: できる／不要／GO（許可不要ルート）
  - **Orange / amber-brown**: 許可が必要・注意・例外側パネル
  - **Red**: 禁止・誤り・「許可」スタンプ・×指摘のみ
  - **Teal accents**: アイコン・矢印の補助
- Typography: 大見出しは太字ゴシック、行ラベルは大きく、条文番号は括弧で小さく添える。画像内に長い段落を置かない。

## Guide Character（新規 vs 既存）

- **新規画像の標準案内役**は **ちゃちゃロット**（にっこり帽子。`chachalot.png` ＋ `approved-smiling-hat-mascot.png`）。緑のフクロウ講師を新規の絶対要件にしない。プロンプトに名前を書く。
- `approved-shusaisha-kyoka.png` 内のフクロウは、**配置位置・指示棒・本文を隠さない役割**の見本として扱う（キャラの見た目正本ではない）。
- **既存フクロウ画像**は、別途移行指示があるまで変更しない。
- キャラ生成・案内役入り図では、生成前に `avatar-guidelines.md` と承認PNGを開く。

## あぷし承認レイアウト（プロンプト考案の標準骨格）

てらしぃが「これ参考に」と出した主宰者許可図から抽出した必須構造。新規プロンプトはこの骨格を先に書き、論点だけ差し替える。

1. **タイトル帯（上）**  
   - 論点名を一文で。可能なら「要るN / 要らないもの」「原則／例外」など対比をタイトルに入れる。  
   - 右上に小さく **漢字・用語のひっかけ訂正**（例: 主催者×→主宰者〇）を置ける。

2. **中央メタファー（1つだけ）**  
   - 比較・許可・分岐なら中央に場面イラスト（聴聞室、関門、天秤など）。  
   - **登場人物の直下は `役割（何をしたいか／立場）`。** 例: `保佐人（契約を取り消したい）`／`相手方（売買の相手）`。`だれが` は書かない。顔だけ置かない。  
   - 英語スタンプ（PERMIT 等）は1つまで。装飾のためだけの人物は増やさない。

3. **左右（または上下）の色分けパネル**  
   - 左＝緑（できる／不要／原則側）、右＝橙（要る／例外／制限側）が定番。  
   - **左見出しは必ず「論点」。** 「問が聞くこと」は使わない。  
   - **右見出しは必ず「ひっかけ」。** 「（聞かない）」は付けない。  
   - **論点の中身は Q&A**（「〜？ → 結論」）。見本は民法記述Q1: 取り消せる？→YES／起算時期は→追認することができるとき／期間は→５年または２０年。  
   - **論点に GO と YES を混在させない。** 結論は YES／NO／短い語句だけ。論点パネルへ GO／STOP バッジを置かない。  
   - 各行: **アイコン＋短名＋（〇条）**。条番号はタイトルだけでなく説明行にも出す。ひっかけ側だけ注意スタンプ可。  
   - 行は詰めすぎない。スマホ幅で読める字サイズを前提。

4. **底部3カード（必須）**  
   - **判断軸**: 誰が／何が／どの分岐か、を1〜2行。  
   - **ひっかけ**: 受験生がやりがちな取り違えをアンバーで1枚。  
   - **暗記**: 口に出せる一行（「許可＝参加・質問・補佐人。不要＝…」型）。  
   - **新規図**: **ちゃちゃロット**は従来のフクロウと同じ。下の余白に小さく、指し棒で暗記を指すだけ。中央の登場人物にしない。名札は書かない。

5. **フッター合言葉（任意）**  
   - 暗記カードと同内容を一行で繰り返してよい（見本と同じ）。

## Exciting Learning Diagram System

- Design each diagram as a tiny learning adventure, not a decorated spreadsheet.
- Choose one topic-fitting visual metaphor aligned with the approved sample:
  - requirements / permission: GO vs 許可 stamp columns（主宰者図型）;
  - procedure: journey or route;
  - comparison: split-screen match-up with color panels;
  - priority: race or podium;
  - legal effect: rescue-tool branches;
  - parties and claims: character relationship map.
- Give the learner three anchors: **判断軸 / ひっかけ / 暗記**（底部3カード）。
- For **new** images, use **ちゃちゃロット** as the recurring guide when space permits. Keep it in the margin, point it toward the learning target, and never cover labels or arrows. Do not require a green owl on new images.
- Build a clear visual reading order: title → center metaphor → left/right panels → 判断軸 → ひっかけ → 暗記.
- Prefer expressive people, objects, arrows, badges, gates, and signs that reveal who acts and what changes. Avoid characters that exist only as decoration.
- Preserve statutes, legal relationships, comparison axes, and conclusions exactly when restyling an existing diagram.
- Remove source filenames, production notes, and template labels from learner-facing images.
- Reject outputs that remain mostly text boxes or tables without a visible legal relationship or decision path.
- Reject outputs that omit the bottom three cards or use unreadably tiny Japanese.
- Reject guide characters that turn the smiling hat into animal ears, or morph into cat/bear/owl/dog.

## Prompt Crafting Checklist（スキル向上用）

プロンプトを書く前に次を埋める。空欄のまま生成しない。

| 欄 | 内容 |
|----|------|
| 見本参照 | レイアウト=`approved-shusaisha-kyoka.png`／案内役=`approved-smiling-hat-mascot.png` |
| タイトル対比 | 例: 要る2つ / 原則は取消不可 |
| 左右の意味 | 緑＝論点（Q&A）／橙＝ひっかけ（「聞かない」禁止） |
| 各行の短名＋条文 | Q&A＋（〇条）。長文禁止 |
| 役割ラベル | `役割（何をしたいか）`。だれが禁止。例: 保佐人（契約を取り消したい） |
| 中央メタファー | 1語で |
| 判断軸 | 1〜2行 |
| ひっかけ | 1枚 |
| 暗記一行 | 答案の芯に近い合言葉 |
| 案内役 | ちゃちゃロット（chachalot.png ＋ 承認PNG）。既存フクロウ図の移行でない |
| 配置先 | textbook / deepdive 等のパス |

## Default GPT Image Prompt Skeleton（あぷし型）

```text
Create a Japanese legal-study infographic for Gyosei Quest / あぷし exam prep.
Match the approved LAYOUT of the reference diagram「主宰者の許可 — 要る３つ / 要らないもの」
(assets/approved-shusaisha-kyoka.png): color-coded left/right panels, central scene illustration,
bottom three cards (判断軸 / ひっかけ / 暗記), warm off-white background, flat editorial icons,
large readable Japanese, navy title bar.
Guide character: ちゃちゃロット (Chachalot). Match chachalot.png and approved-smiling-hat-mascot.png.
Place ちゃちゃロット in the SAME slot as the green owl: SMALL, bottom-right margin only, wooden 指し棒 pointing at 暗記. Not a scene character. No nameplate.
Preserve the separate pale-sky-blue smiling hat (not ears), cream face, equal perfect-circle eyes
and highlights, four cheek marks per side. Do not convert into owl, cat, bear, or any animal.
Canvas: [size, prefer landscape 1536x1024 or portrait 1024x1280 for phone].
Topic: [legal topic].
Learning goal: [one sentence — what the learner can answer after one glance].

Layout:
1) Top title:「[対比タイトル]」+ optional small kanji-trap chip.
2) Center metaphor: [one scene].
3) Left green panel「論点」as Q&A rows (〜？ → YES/NO or short phrase) + (〇条). NEVER mix GO badges with YES. No GO/STOP on 論点. Never label it「問が聞くこと」.
4) Right orange panel「ひっかけ」with icon rows + 注意 badges + (〇条). Never add「（聞かない）」.
   Center characters: labels like「保佐人（契約を取り消したい）」／「相手方（売買の相手）」. Never write「だれが」.
5) Bottom cards: 判断軸 / ひっかけ / 暗記 — exact Japanese phrases below.
6) ちゃちゃロット in owl slot: SMALL bottom-right, 指し棒 pointing at 暗記. Not a scene character.

Exact Japanese labels to include:
- 判断軸:「...」
- ひっかけ:「...」
- 暗記:「...」

Avoid: tiny text, dense paragraphs, decorative clutter, heavy gradients, dark photo mood, mock-exam page copy, watermarks, filenames, English UI chrome except one optional stamp, owl/cat/bear misreads of the mascot.
Ensure no overlapping text/icons; keep margins; mobile-readable.
```

## Legal Diagram Types

Use the diagram type that fits the learning problem:

- Comparison / permission split: **あぷし承認レイアウト**（上記）を最優先。
- Flowchart: procedure, litigation route, administrative process, inheritance calculation.
- Timeline: deadlines, appeal periods, formation-to-effect sequences.
- Relationship map: parties, rights, claims, authority, standing.
- Calculation diagram: money movement, shares, damages, special contribution, inheritance.

## Deep-Dive Image Rules

- Put the issue title at the top.
- Show the deciding axis in the bottom 判断軸 card and, if useful, in the center metaphor.
- Include one ひっかけ card when the topic is a frequent wrong answer.
- Keep the source problem invisible; show only transformed knowledge and original explanations.
- If a figure corresponds to a specific question or choice, record that relation in the implementation notes.

## App Placement Rules

- `もっと深掘る`: use for diagrams tied to a card, quiz, choice, or past mistake.
- `君の教科書` / DB教科書記述: place **under the question（問の下）**.
- `見て聞いて覚える`: use for compact visual memory aids.
- Bonus question explanation: use when the figure explains why an option is correct or wrong.
- Cross-topic reference: use when a figure connects several areas and has no single direct question.
- X投稿用: あぷしアカウント（@appshi113）向けに、見本と同じ情報密度・可読性を保つ（アプリ用と同一ソース可）。

## Quality Checklist

- Matches approved sample structure (panels + center + bottom 3 cards + margin guide).
- New images use the smiling-hat guide (not required to use owl).
- Existing owl images were not bulk-changed without a migration request.
- Text is readable at mobile width.
- Arrows and boxes do not overlap labels.
- Legal terms are not paraphrased into inaccurate everyday language.
- Article numbers appear where they aid memorization (括弧付き短記).
- No copied mock-exam wording appears.
- The image file is compressed after approval of the visual.
- **Mascot identity (when guide is present):**
  - 帽子が耳や動物として解釈されていない
  - 黒い瞳が左右同径の真円
  - 白いハイライトも左右同径の真円
  - 帽子・顔・口の輪郭に不自然な歪みや継ぎ目がない
  - 頬マークが左右4本
  - 小サイズでも顔と表情を認識できる
