/**
 * 民法物権・元画像メモから「もっと深掘る」用の整理画像を生成する。
 *
 *   node scripts/renderMinpoBukkenReferenceImages.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createCanvas } from 'canvas';
import {
  COLORS,
  drawStackedBlock,
  drawWrapped,
  getFont,
  measureWrappedHeight,
  roundRect,
  trimCanvas,
} from './lib/chihouCanvasLayout.mjs';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = path.join(ROOT, 'assets', 'images', 'deepdive', 'bukken', 'reference');
const MD_OUT = path.join(ROOT, 'content', 'minpo-bukken-reference-deepdive.md');
const W = 1440;
const M = 54;
const CW = W - M * 2;
const FONT = getFont();

const C = {
  bg: '#f7fbf8',
  ink: '#0f172a',
  muted: '#475569',
  line: '#cbd5e1',
  green: '#0f766e',
  greenSoft: '#ecfdf5',
  blue: '#2563eb',
  blueSoft: '#eff6ff',
  orange: '#c2410c',
  orangeSoft: '#fff7ed',
  red: '#b91c1c',
  redSoft: '#fef2f2',
  graySoft: '#f8fafc',
};

const ITEMS = [
  {
    slug: 'delivery-patterns',
    title: '動産物権変動の引渡し',
    subtitle: '182条から184条までを「占有の動き」で分ける',
    sourceImages: ['PXL_20260611_144012359 (3).jpg'],
    placement: '民法物権 Q6・Q7 の「もっと深掘る」候補',
    lead: '動産物権変動の対抗要件は引渡し。現実に物を渡す場合だけでなく、占有の観念的な移転も含まれる。',
    traps: [
      '現実の引渡しは、物の直接占有が移る。',
      '簡易の引渡しは、すでに譲受人が占有している場合。',
      '占有改定は、譲渡人が手元に置いたまま占有代理人になる。',
      '指図による占有移転は、第三者が占有している物を指図で移す。',
    ],
    table: {
      headers: ['態様', '条文', 'イメージ'],
      rows: [
        ['現実の引渡し', '182条1項', '物を実際に渡す'],
        ['簡易の引渡し', '182条2項', '譲受人がすでに占有中'],
        ['占有改定', '183条', '譲渡人が占有代理人として保持'],
        ['指図による占有移転', '184条', '第三者占有を指図で移す'],
      ],
    },
    note: '「物が動くか」ではなく「占有が誰に移った扱いか」で見る。',
  },
  {
    slug: 'stolen-lost-recovery',
    title: '盗品・遺失物の回復',
    subtitle: '193条・194条は即時取得の例外として押さえる',
    sourceImages: ['PXL_20260611_144422144 (3).jpg', 'PXL_20260611_144654760.MP (2).jpg'],
    placement: '民法物権 Q6 の「もっと深掘る」候補',
    lead: '盗品・遺失物は、即時取得が成立しうる場面でも、被害者または遺失者が一定期間内に回復請求できる。',
    traps: [
      '回復請求できる期間は、盗難または遺失の時から2年間。',
      '競売・公開市場・商人から善意で買った場合は、代価弁償が問題になる。',
      '無償取得者には代価弁償の保護が及びにくい。',
    ],
    table: {
      headers: ['場面', '回復請求', '代価弁償'],
      rows: [
        ['盗品・遺失物一般', '2年間できる', '原則不要'],
        ['競売で取得', '2年間できる', '代価弁償が必要'],
        ['公開市場で取得', '2年間できる', '代価弁償が必要'],
        ['同種物を売る商人から取得', '2年間できる', '代価弁償が必要'],
      ],
    },
    note: '193条は「取り戻せる」、194条は「返すなら代価も返す」。',
  },
  {
    slug: 'possession-transfer-cases',
    title: '占有改定にあたる判例比較',
    subtitle: '占有移転の外形があるかを判例ごとに見る',
    sourceImages: ['PXL_20260611_144307894 (3).jpg'],
    placement: '民法物権 Q7 周辺の補助資料候補',
    lead: '占有改定は、譲渡人が物を手元に置いたまま、以後は譲受人のために占有する形。判例では、取引の外形と占有関係の変化が問われる。',
    traps: [
      '即時取得では、占有改定だけでは足りない。',
      '占有改定にあたるかは、物の保管関係が変わったかで見る。',
      '譲渡担保や仮登記担保では、占有改定が対抗要件として問題になりやすい。',
    ],
    table: {
      headers: ['判例・場面', '占有改定', '見るポイント'],
      rows: [
        ['動産売買 178条', 'あたる', '譲渡人が占有を続ける外形'],
        ['即時取得 192条', '足りない', '即時取得には現実的な占有取得が必要'],
        ['先取特権 333条', 'あたる', '占有の移転態様として整理'],
        ['質権 344条', '足りない', '質権設定は占有移転が厳格'],
        ['譲渡担保', 'あたる', '動産譲渡の対抗要件で問題'],
        ['仮登記担保', '足りない', '制度趣旨に照らして別処理'],
      ],
    },
    note: '占有改定は「手元にあるのに、占有する意味が変わる」場面。',
  },
  {
    slug: 'immediate-acquisition',
    title: '即時取得の要件',
    subtitle: '動産・取引行為・平穏公然善意無過失・占有取得',
    sourceImages: ['PXL_20260611_144511096 (2).jpg'],
    placement: '民法物権 Q6・Q7 の「もっと深掘る」候補',
    lead: '即時取得は、無権利者から動産を取得した者を保護する制度。ただし、占有改定だけでは即時取得は成立しない。',
    traps: [
      '対象は動産。不動産には適用されない。',
      '取引行為による取得が必要。',
      '平穏・公然・善意・無過失が必要。',
      '占有改定では、外部から所有状態が変わったと見えない。',
    ],
    table: {
      headers: ['要件', '内容', '注意点'],
      rows: [
        ['対象', '動産', '不動産は不可'],
        ['原因', '有効な取引行為', '相続などは不可'],
        ['主観', '平穏・公然・善意・無過失', '悪意や過失で崩れる'],
        ['占有取得', '現実の占有取得が必要', '占有改定は不可'],
      ],
    },
    note: '即時取得は「外から見て取引で占有が移った」ことが大事。',
  },
  {
    slug: 'possessor-owner-recovery',
    title: '占有者と回復者の関係',
    subtitle: '善意占有者と悪意占有者で果実・損害・費用が変わる',
    sourceImages: ['PXL_20260611_144654760.MP (2).jpg'],
    placement: '民法物権 Q8 の「もっと深掘る」候補',
    lead: '占有物が本来の権利者へ戻る場面では、占有者の善意・悪意により、果実取得・損害賠償・費用償還の扱いが変わる。',
    traps: [
      '善意占有者は果実を取得できる。',
      '悪意占有者は果実を返還し、代価も償還する方向。',
      '必要費は原則として償還対象になる。',
      '有益費は価格増加が現存する場合に問題になる。',
    ],
    table: {
      headers: ['項目', '善意占有者', '悪意占有者'],
      rows: [
        ['果実取得', '取得できる', '返還・代価償還'],
        ['損害賠償', '原則限定的', '損害全部'],
        ['必要費', '償還請求可', '償還請求可'],
        ['有益費', '価格増加が現存する限度', '価格増加が現存する限度'],
      ],
    },
    note: '善意は果実で守られ、悪意は返す方向に寄る。',
  },
  {
    slug: 'expense-reimbursement',
    title: '費用償還請求の横断整理',
    subtitle: '必要費と有益費を、占有・留置・質・買戻し・賃貸借で見る',
    sourceImages: ['PXL_20260611_144711282 (2).jpg'],
    placement: '横断整理画像。民法物権 Q8・Q13 周辺の補助資料候補',
    lead: '費用償還は、必要費と有益費で発想を分ける。必要費は保存のための費用、有益費は価値を増やす費用。',
    traps: [
      '有益費は「価格の増加が現存する場合に限り」が頻出。',
      '制度ごとに「誰の選択か」が違う。',
      '使用貸借・賃貸借は返還後1年以内など期間制限にも注意。',
    ],
    table: {
      headers: ['制度', '必要費', '有益費'],
      rows: [
        ['占有者', '果実取得時は通常必要費不可', '回復者の選択で支出額または増加額'],
        ['留置権', '全額請求可', '所有者の選択で支出額または増加額'],
        ['質権', '全額請求可', '所有者の選択で支出額または増加額'],
        ['買戻権', '果実取得時は通常必要費不可', '売主の選択で支出額または増加額'],
        ['使用貸借', '通常必要費不可', '貸主の選択。返還後1年以内'],
        ['賃貸借', '直ちに全額請求可', '貸主の選択。返還後1年以内'],
      ],
    },
    note: '必要費は「保存」、有益費は「価値増加の現存」が合言葉。',
  },
  {
    slug: 'possessory-actions',
    title: '占有訴権まとめ',
    subtitle: '保持・保全・回収で、要件と期間を切り分ける',
    sourceImages: ['PXL_20260611_144737853 (2).jpg'],
    placement: '民法物権 Q8 の「もっと深掘る」候補',
    lead: '占有訴権は、占有という事実状態を守るための訴え。妨害の状態によって、保持・保全・回収を使い分ける。',
    traps: [
      '占有保持の訴えは、妨害があるとき。',
      '占有保全の訴えは、妨害のおそれがあるとき。',
      '占有回収の訴えは、占有を奪われたとき。',
      '行使期間は、工事完成後は不可など細かい制限がある。',
    ],
    table: {
      headers: ['訴え', '要件', '請求内容'],
      rows: [
        ['占有保持の訴え', '占有者の占有が妨害されたとき', '妨害停止・損害賠償'],
        ['占有保全の訴え', '妨害のおそれがあるとき', '妨害予防・担保'],
        ['占有回収の訴え', '占有を奪われたとき', '物の返還・損害賠償'],
      ],
    },
    note: '保持は今ある妨害、保全はこれからの危険、回収は奪われた後。',
  },
  {
    slug: 'possessory-action-periods',
    title: '占有訴権の提起期間',
    subtitle: '妨害・危険・侵奪で、いつまで提起できるかを整理',
    sourceImages: ['PXL_20260611_145051167 (2).jpg'],
    placement: '民法物権 Q8 周辺の補助資料候補',
    lead: '占有訴権は、請求内容だけでなく提起期間がよく問われる。妨害・危険・侵奪後1年を分ける。',
    traps: [
      '占有保持の訴えは、妨害の存する間または消滅後1年以内。',
      '工事損害は、着手後1年経過または完成後は不可。',
      '占有保全の訴えは、妨害の危険が存する間。',
      '占有回収の訴えは、侵奪された時から1年以内。',
    ],
    table: {
      headers: ['訴え', '要件', '行使期間'],
      rows: [
        ['占有保持の訴え', '占有者の占有が妨害されたとき', '妨害存続中または消滅後1年以内'],
        ['工事による妨害', '工事で占有物に損害が生じたとき', '着手後1年経過または完成後は不可'],
        ['占有保全の訴え', '占有妨害のおそれがあるとき', '妨害の危険が存する間'],
        ['占有回収の訴え', '占有を奪われたとき', '侵奪時から1年以内'],
      ],
    },
    note: '保持は妨害、保全は危険、回収は侵奪後1年。',
  },
  {
    slug: 'neighboring-land-use',
    title: '相隣関係・隣地使用権',
    subtitle: '必要な範囲で隣地を使えるが、損害は償う',
    sourceImages: ['PXL_20260611_144800300 (2).jpg', 'PXL_20260611_144843729 (2).jpg'],
    placement: '民法物権 Q9 の「もっと深掘る」候補',
    lead: '土地所有者は、境界や工作物の築造・修繕などのため必要な範囲で隣地を使用できる。ただし、隣人への配慮と損害償還がセット。',
    traps: [
      '住家に立ち入るには、その居住者の承諾が必要。',
      '隣地使用者は、目的・日時・場所・方法を通知するのが原則。',
      '損害が生じたら償金を支払う。',
      '通行権も、必要性と損害最小化が軸になる。',
    ],
    table: {
      headers: ['場面', 'できること', '注意点'],
      rows: [
        ['境界・工作物の工事', '必要な範囲で隣地使用', '住家は承諾が必要'],
        ['袋地通行', '他土地を通行できる', '損害が最も少ない場所・方法'],
        ['通路開設', '必要なら通路を開設', '損害に対して償金'],
        ['分割・一部譲渡で袋地発生', '元の土地だけ通行', '原則として無償'],
      ],
    },
    note: '相隣関係は「使える」だけでなく「迷惑を最小化して償う」。',
  },
  {
    slug: 'emphyteusis-vs-superficies',
    title: '永小作権と地上権の比較',
    subtitle: '目的・存続期間・譲渡賃貸制限で区別する',
    sourceImages: ['PXL_20260611_144952394 (2).jpg'],
    placement: '民法物権 Q11 周辺の補助資料候補',
    lead: '永小作権と地上権は、どちらも他人の土地を利用する物権。目的と存続期間、譲渡・賃貸制限の有無で見分ける。',
    traps: [
      '永小作権は耕作・牧畜が目的。',
      '地上権は工作物・竹木の所有が目的。',
      '永小作権の存続期間は20年から50年。',
      '地上権には法定の最長・最短期間制限がない。',
    ],
    table: {
      headers: ['比較軸', '永小作権', '地上権'],
      rows: [
        ['設定目的', '耕作・牧畜', '工作物・竹木の所有'],
        ['譲渡・賃貸', '制限特約は第三者に対抗可', '原則として制限なし'],
        ['存続期間', '20年から50年', '最短・最長の制限なし'],
        ['地代', '必要', '必ずしも必要ではない'],
        ['第三者対抗', '登記が必要', '登記が必要'],
      ],
    },
    note: '農地利用寄りなら永小作権、建物・工作物寄りなら地上権。',
  },
  {
    slug: 'security-real-rights-map',
    title: '担保物権の比較',
    subtitle: '留置権・先取特権・質権・抵当権を横断で整理',
    sourceImages: ['PXL_20260611_145044591 (2).jpg'],
    placement: '横断整理画像。民法物権 Q12〜Q16 周辺の補助資料候補',
    lead: '担保物権は、付従性・随伴性・不可分性・物上代位性・優先弁済効などを横断比較すると整理しやすい。',
    traps: [
      '留置権は優先弁済効がない。',
      '先取特権・質権・抵当権は優先弁済効がある。',
      '登記や引渡しなどの公示方法は担保物権ごとに異なる。',
      '果実収取権や物上代位性の有無も狙われる。',
    ],
    table: {
      headers: ['担保物権', '強い特徴', '弱い・注意点'],
      rows: [
        ['留置権', '目的物を留置できる', '優先弁済効なし'],
        ['先取特権', '法律上当然に発生', '登記の要否が場面で変わる'],
        ['質権', '目的物を占有して担保', '設定者による利用はしにくい'],
        ['抵当権', '目的物を使わせたまま担保', '登記が重要'],
      ],
    },
    note: '留置権だけは「留める力」はあるが「優先して取る力」はない。',
  },
  {
    slug: 'third-party-177',
    title: '177条の「第三者」',
    subtitle: '登記がなくても対抗できる相手を先に外す',
    sourceImages: ['PXL_20260611_143932523 (3).jpg', 'PXL_20260611_143947581.MP (3).jpg'],
    placement: '民法物権 Q4 の各肢「もっと深掘る」',
    lead: '177条は「登記の欠缺を主張する正当な利益を有する者」を保護する。だから、そもそも第三者に当たらない者には登記なしで対抗できる。',
    traps: [
      '当事者・包括承継人は第三者ではない。',
      '不法占拠者や無権利の名義人にも、登記なしで対抗できる。',
      '背信的悪意者は、信義則上「第三者」から外れる。',
    ],
    table: {
      headers: ['相手方', '第三者性', '登記なし対抗'],
      rows: [
        ['当事者・包括承継人', '当たらない', 'できる'],
        ['前主後主の関係にある者', '当たらない', 'できる'],
        ['不法占拠者・無権利者', '当たらない', 'できる'],
        ['不動産登記法5条列挙の者', '当たらない', 'できる'],
        ['背信的悪意者', '信義則で排除', 'できる'],
        ['単なる悪意者', '第三者に当たる', '登記が必要'],
      ],
    },
    note: '迷ったら「その人を登記制度で守る正当な利益があるか」で切る。',
  },
  {
    slug: 'co-ownership-use',
    title: '共有物の使用と処分',
    subtitle: '各共有者は全部を使えるが、持分を超える使用は調整される',
    sourceImages: ['PXL_20260611_144823752.MP (2).jpg', 'PXL_20260611_144843729 (2).jpg'],
    placement: '民法物権 Q10 の各肢「もっと深掘る」',
    lead: '共有者は、共有物の全部について、その持分に応じた使用をすることができる。全部を物理的に分けるのではなく、使用利益を持分で調整するイメージ。',
    traps: [
      '共有物全体の処分は全員同意が必要。',
      '各共有者は自己の持分だけなら単独で処分できる。',
      '管理は原則として持分価格の過半数で決める。',
    ],
    table: {
      headers: ['行為', '必要な同意', '試験での見方'],
      rows: [
        ['自己の持分処分', '単独で可', '自分の権利なので自由'],
        ['共有物の使用', '持分に応じて可', '全部を使えるが清算問題が残る'],
        ['管理行為', '持分価格の過半数', '賃貸・利用方法の決定など'],
        ['変更・処分', '全員同意', '形や権利を大きく動かす'],
        ['分割請求', '各共有者が可', '共有関係から抜ける出口'],
      ],
    },
    note: '「全部を使える」と「全部を自由に処分できる」は別物。',
  },
  {
    slug: 'real-estate-priority',
    title: '不動産先取特権の優先順位',
    subtitle: '保存・工事は強いが、売買は登記順で考える',
    sourceImages: ['PXL_20260611_144910909 (2).jpg', 'PXL_20260611_144921008 (2).jpg', 'PXL_20260611_144946261.MP (2).jpg'],
    placement: '民法物権 Q14 の各肢「もっと深掘る」',
    lead: '不動産保存・不動産工事の先取特権は、適切な時期に登記すれば、既存の抵当権にも優先する。売買の先取特権はこの特別扱いが弱い。',
    traps: [
      '保存は「保存行為完了後、直ちに」登記。',
      '工事は「工事を始める前に予算額」を登記。',
      '売買は「売買契約と同時に」登記するが、既存抵当権を追い抜かない。',
    ],
    table: {
      headers: ['種類', '登記のタイミング', '既存抵当権との関係'],
      rows: [
        ['不動産保存', '保存行為完了後、直ちに', '優先する'],
        ['不動産工事', '工事開始前に予算額', '優先する'],
        ['不動産売買', '売買契約と同時', '登記の前後による'],
      ],
    },
    note: '保存・工事は「価値を守る・増やす」から強い。',
  },
  {
    slug: 'aggregate-movables-security',
    title: '集合動産の譲渡担保',
    subtitle: '中身が入れ替わっても、範囲を特定すれば一括担保にできる',
    sourceImages: ['PXL_20260611_145126817 (2).jpg', 'PXL_20260611_145153804 (2).jpg'],
    placement: '民法物権 Q21 の各肢「もっと深掘る」',
    lead: '在庫商品など、構成物が日々変動する集合動産でも、種類・所在場所・数量の範囲などで目的物が特定されていれば、譲渡担保の目的にできる。',
    traps: [
      '「中身が変わるから無効」とはならない。',
      '対抗要件は動産譲渡登記や占有改定などで問題になる。',
      '特定性が弱いと、何が担保に入るか第三者に示せない。',
    ],
    table: {
      headers: ['チェック軸', '見るポイント', '結論'],
      rows: [
        ['種類', '商品・原材料などの区別', '特定に役立つ'],
        ['所在場所', '倉庫・店舗・保管場所', '特定に役立つ'],
        ['範囲', '数量・期間・取引範囲', '広すぎると危ない'],
        ['変動性', '入庫・出庫で入れ替わる', 'それだけでは無効でない'],
      ],
    },
    note: '集合物は「固定メンバー」ではなく「枠」を担保に取る。',
  },
];

function setFont(ctx, size, weight = 'normal') {
  ctx.font = `${weight} ${size}px ${FONT}`;
}

function fillText(ctx, text, x, y, color = C.ink) {
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
}

function drawPanel(ctx, x, y, w, h, bg, border = C.line) {
  roundRect(ctx, x, y, w, h, 18);
  ctx.fillStyle = bg;
  ctx.fill();
  ctx.strokeStyle = border;
  ctx.lineWidth = 2;
  ctx.stroke();
}

function tableHeight(rows) {
  return 74 + rows.length * 76;
}

function drawTable(ctx, x, y, widths, data) {
  const totalW = widths.reduce((sum, n) => sum + n, 0);
  const headH = 74;
  const rowH = 76;
  const totalH = headH + data.rows.length * rowH;
  drawPanel(ctx, x, y, totalW, totalH, '#ffffff', C.line);

  roundRect(ctx, x, y, totalW, headH, 18);
  ctx.fillStyle = C.green;
  ctx.fill();
  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y + 18, totalW, headH - 18);
  ctx.clip();
  ctx.fillRect(x, y, totalW, headH);
  ctx.restore();

  let cx = x;
  data.headers.forEach((h, i) => {
    setFont(ctx, 24, 'bold');
    fillText(ctx, h, cx + 18, y + 45, '#ffffff');
    cx += widths[i];
  });

  cx = x;
  for (let i = 1; i < widths.length; i += 1) {
    cx += widths[i - 1];
    ctx.strokeStyle = C.line;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx, y);
    ctx.lineTo(cx, y + totalH);
    ctx.stroke();
  }

  data.rows.forEach((row, ri) => {
    const ry = y + headH + ri * rowH;
    if (ri % 2 === 1) {
      ctx.fillStyle = C.graySoft;
      ctx.fillRect(x + 1, ry, totalW - 2, rowH);
    }
    ctx.strokeStyle = C.line;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(x, ry);
    ctx.lineTo(x + totalW, ry);
    ctx.stroke();

    let cellX = x;
    row.forEach((cell, ci) => {
      setFont(ctx, ci === 0 ? 23 : 22, ci === 0 ? 'bold' : 'normal');
      ctx.fillStyle = ci === 0 ? C.ink : C.muted;
      drawWrapped(ctx, cell, cellX + 18, ry + 32, widths[ci] - 36, 30);
      cellX += widths[ci];
    });
  });
  return y + totalH + 22;
}

function drawImage(item) {
  const canvas = createCanvas(W, 2200);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = C.bg;
  ctx.fillRect(0, 0, W, 2200);

  let y = 48;
  drawPanel(ctx, M, y, CW, 132, '#ffffff', C.line);
  setFont(ctx, 22, 'bold');
  fillText(ctx, '民法物権', M + 26, y + 42, C.green);
  setFont(ctx, 42, 'bold');
  fillText(ctx, item.title, M + 26, y + 88, C.ink);
  setFont(ctx, 22, 'normal');
  fillText(ctx, item.subtitle, M + 620, y + 86, C.muted);
  y += 160;

  const leadH = measureWrappedHeight(ctx, item.lead, CW - 52, 34) + 72;
  drawPanel(ctx, M, y, CW, leadH, C.greenSoft, '#99f6e4');
  setFont(ctx, 24, 'bold');
  fillText(ctx, 'まず押さえる', M + 24, y + 36, C.green);
  setFont(ctx, 25, 'bold');
  ctx.fillStyle = C.ink;
  drawWrapped(ctx, item.lead, M + 24, y + 76, CW - 52, 34);
  y += leadH + 22;

  const half = (CW - 22) / 2;
  const leftLines = [
    { text: 'ひっかけポイント', font: `bold 24px ${FONT}`, color: C.orange, lh: 34 },
    ...item.traps.map((t) => ({ text: `・${t}`, font: `22px ${FONT}`, color: C.ink, lh: 32 })),
  ];
  const rightLines = [
    { text: '暗記の芯', font: `bold 24px ${FONT}`, color: C.blue, lh: 34 },
    { text: item.note, font: `bold 26px ${FONT}`, color: C.ink, lh: 36 },
  ];
  const y1 = drawStackedBlock(ctx, FONT, {
    x: M,
    y,
    w: half,
    pad: 18,
    bg: C.orangeSoft,
    border: '#fed7aa',
    borderW: 2,
    lines: leftLines,
  });
  const y2 = drawStackedBlock(ctx, FONT, {
    x: M + half + 22,
    y,
    w: half,
    pad: 18,
    bg: C.blueSoft,
    border: '#bfdbfe',
    borderW: 2,
    lines: rightLines,
  });
  y = Math.max(y1, y2) + 8;

  y = drawTable(ctx, M, y, [360, 456, 516], item.table);

  const sourceText = `元画像: ${item.sourceImages.join(' / ')}`;
  const sourceH = measureWrappedHeight(ctx, sourceText, CW - 52, 28) + 36;
  drawPanel(ctx, M, y, CW, sourceH, '#ffffff', C.line);
  setFont(ctx, 19, 'normal');
  ctx.fillStyle = C.muted;
  drawWrapped(ctx, sourceText, M + 24, y + 34, CW - 52, 28);
  y += sourceH + 46;

  return trimCanvas(canvas, y);
}

function markdown() {
  return [
    '# 民法物権 元画像ベース深掘り画像メモ',
    '',
    '元画像フォルダ: `temp_images/元画像/民法物権`',
    '',
    '写真教材の表・比較軸を優先し、無理にイラスト化せず、アプリ内の「もっと深掘る」で読める整理画像として再構成する。',
    '',
    ...ITEMS.flatMap((item) => [
      `## ${item.title}`,
      '',
      `- slug: \`${item.slug}\``,
      `- subtitle: ${item.subtitle}`,
      `- sourceImages: ${item.sourceImages.map((s) => `\`${s}\``).join(', ')}`,
      `- placement: ${item.placement}`,
      '',
      item.lead,
      '',
      '### ひっかけポイント',
      '',
      ...item.traps.map((t) => `- ${t}`),
      '',
      '### 整理表',
      '',
      `| ${item.table.headers.join(' | ')} |`,
      `| ${item.table.headers.map(() => '---').join(' | ')} |`,
      ...item.table.rows.map((row) => `| ${row.join(' | ')} |`),
      '',
      `### 暗記の芯`,
      '',
      item.note,
      '',
    ]),
  ].join('\n');
}

function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.mkdirSync(path.dirname(MD_OUT), { recursive: true });
  fs.writeFileSync(MD_OUT, markdown(), 'utf8');

  for (const item of ITEMS) {
    const out = path.join(OUT_DIR, `minpo-bukken-${item.slug}.png`);
    fs.writeFileSync(out, drawImage(item).toBuffer('image/png'));
    console.log(out);
  }
  console.log(MD_OUT);
}

main();
