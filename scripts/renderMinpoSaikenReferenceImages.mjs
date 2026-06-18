/**
 * 民法債権・元画像メモから「もっと深掘る」用の整理画像を生成する。
 *
 *   node scripts/renderMinpoSaikenReferenceImages.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createCanvas } from 'canvas';
import {
  drawStackedBlock,
  drawWrapped,
  getFont,
  measureWrappedHeight,
  roundRect,
  trimCanvas,
} from './lib/chihouCanvasLayout.mjs';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE_DIR = path.join(ROOT, 'temp_images', '元画像');
const OUT_DIRS = {
  soron: path.join(ROOT, 'assets', 'images', 'deepdive', 'saikensouron', 'reference'),
  kakuron: path.join(ROOT, 'assets', 'images', 'deepdive', 'kakuronn', 'reference'),
};
const MD_OUT = path.join(ROOT, 'content', 'minpo-saiken-reference-deepdive.md');
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
  graySoft: '#f8fafc',
};

const ITEMS = [
  {
    group: 'soron',
    slug: 'specific-obligation-care',
    title: '種類債権の特定と注意義務',
    subtitle: '401条・413条を「いつ特定し、どの注意で保管するか」で整理',
    sourceImages: ['PXL_20260612_092102835.jpg'],
    placement: '債権総論 Q2〜Q4 の「もっと深掘る」候補',
    lead: '種類債権は、品質の定めがなければ中等の品質を給付する。給付に必要な行為完了または債権者の同意による指定で目的物が特定し、その後は特定物として扱う。',
    traps: [
      '履行期後も、現実の引渡しまでは保存義務が残る。',
      '債務者が履行遅滞なら、不可抗力による滅失にも責任が及びやすい。',
      '債権者が受領遅滞なら、債務者の注意義務は自己の財産に対するのと同一程度へ軽減される。',
    ],
    table: {
      headers: ['場面', '処理', '覚える芯'],
      rows: [
        ['品質の定めなし', '中等の品質を給付', '401条1項'],
        ['目的物の特定', '必要行為の完了・債権者同意による指定', '401条2項'],
        ['債務者の履行遅滞', '注意義務・責任が重くなる', '413条の2'],
        ['債権者の受領遅滞', '自己財産と同一の注意で足りる', '413条1項'],
      ],
    },
    note: '種類債権は「不特定」から「特定物」へ変わる瞬間を押さえる。',
  },
  {
    group: 'soron',
    slug: 'due-date-delay',
    title: '確定期限・不確定期限と履行遅滞',
    subtitle: '412条は「いつ責任が始まるか」を期限の種類で分ける',
    sourceImages: ['PXL_20260612_092205591.jpg'],
    placement: '債権総論 Q3〜Q5 の「もっと深掘る」候補',
    lead: '履行遅滞の開始時期は、確定期限・不確定期限・期限の定めなしで変わる。請求や期限到来を知った時など、責任開始の入口を間違えない。',
    traps: [
      '確定期限は、期限到来時から遅滞に陥る。',
      '不確定期限は、期限到来後に債務者が到来を知った時、または履行請求を受けた時から。',
      '期限の定めがない債務は、履行請求を受けた時から。',
      '返還時期の定めがない消費貸借は、催告後相当期間経過後が軸になる。',
    ],
    table: {
      headers: ['期限の種類', '遅滞開始', '条文'],
      rows: [
        ['確定期限あり', '期限到来時', '412条1項'],
        ['不確定期限あり', '到来を知った時または請求時', '412条2項'],
        ['期限の定めなし', '履行請求を受けた時', '412条3項'],
        ['消費貸借の返還時期なし', '催告後相当期間経過後', '591条1項'],
      ],
    },
    note: '期限の問題は「到来」だけでなく「債務者が知ったか・請求されたか」まで見る。',
  },
  {
    group: 'soron',
    slug: 'nonperformance-remedies',
    title: '債務不履行の効果',
    subtitle: '履行不能・遅滞・解除・損害賠償を一枚で分ける',
    sourceImages: ['PXL_20260612_092219544.jpg', 'PXL_20260612_092230830.jpg'],
    placement: '債権総論 Q3〜Q6 の「もっと深掘る」候補',
    lead: '債務不履行では、履行請求、追完請求、代金減額、解除、損害賠償が横断的に出る。原因が契約内容に適合しないのか、履行不能なのかで使う道具が変わる。',
    traps: [
      '履行不能なら履行請求はできないが、損害賠償や解除は別に検討する。',
      '債務者に帰責事由がなければ、損害賠償責任は原則として生じない。',
      '解除は債務不履行があっても常に催告不要ではない。',
    ],
    table: {
      headers: ['救済', '主な場面', '注意点'],
      rows: [
        ['追完請求', '契約不適合', '修補・代替物引渡しなど'],
        ['代金減額', '追完不能・追完拒絶など', 'まず追完との関係を見る'],
        ['解除', '催告解除・無催告解除', '541条・542条'],
        ['損害賠償', '帰責事由ある不履行', '415条'],
      ],
    },
    note: '救済は「何が壊れたか」と「まだ直せるか」で選ぶ。',
  },
  {
    group: 'soron',
    slug: 'third-party-performance-subrogation',
    title: '第三者弁済と弁済による代位',
    subtitle: '弁済できる第三者・できない第三者・代位の効果を整理',
    sourceImages: ['PXL_20260612_092621305.jpg'],
    placement: '債権総論 Q10〜Q14 の「もっと深掘る」候補',
    lead: '第三者弁済は原則可能だが、債務の性質や当事者の意思、第三者の正当な利益で制限される。弁済者は債務者に求償権を得て、債権者の権利に代位する。',
    traps: [
      '一身専属的給付では第三者弁済が許されない。',
      '当事者が禁止・制限したときは、その意思表示の前後関係も見る。',
      '正当な利益のない第三者は、債務者の意思に反して弁済できない。',
      '弁済による代位で、債権・担保権などが弁済者へ移る。',
    ],
    table: {
      headers: ['論点', '結論', '試験での見方'],
      rows: [
        ['債務の性質が許さない', '第三者弁済不可', '一身専属的給付'],
        ['当事者が禁止・制限', '原則不可', '意思表示の時期に注意'],
        ['正当な利益なし', '債務者の意思に反して不可', '親族などは原則含まれにくい'],
        ['弁済による代位', '求償権を確保', '債権・担保が移る'],
      ],
    },
    note: '第三者弁済は「誰が払うか」より「払う正当な利益があるか」。',
  },
  {
    group: 'soron',
    slug: 'alternative-obligation-selection',
    title: '選択債権の選択権',
    subtitle: '406条から410条までを「誰が選び、いつ確定するか」で整理',
    sourceImages: ['PXL_20260612_092122199.jpg', 'PXL_20260612_092131059.jpg'],
    placement: '債権総論 Q2 の各肢「もっと深掘る」',
    lead: '選択債権は、数個の給付の中から選択で目的が定まる債権。特約がなければ選択権は債務者に属し、選択の意思表示後は相手方の承諾なしに撤回できない。',
    traps: [
      '特約がなければ、選択権は債権者ではなく債務者に属する。',
      '第三者が選ぶ場合、債権者または債務者への意思表示で足りる。',
      '選択権者の過失で一方が不能になったときは、残存給付について債権が存在する。',
    ],
    table: {
      headers: ['論点', '結論', '条文'],
      rows: [
        ['選択権の帰属', '特約なければ債務者', '406条'],
        ['選択権の行使', '相手方への意思表示', '407条'],
        ['第三者の選択', '債権者または債務者へ表示', '409条'],
        ['不能による特定', '選択権者の過失なら残存給付へ', '410条'],
      ],
    },
    note: '選択債権は「選ぶ人」と「選んだ後に戻せるか」を先に見る。',
  },
  {
    group: 'soron',
    slug: 'creditor-delay-risk',
    title: '受領遅滞と危険負担',
    subtitle: '債権者が受け取らないとき、注意義務・費用・危険が動く',
    sourceImages: ['PXL_20260612_092405564.jpg', 'PXL_20260612_092427407.jpg'],
    placement: '債権総論 Q3・Q4 の「もっと深掘る」候補',
    lead: '債権者が受領を拒み、または受領できないときは受領遅滞となる。債務者の保存注意義務が軽くなり、増加費用や危険の帰属も問題になる。',
    traps: [
      '債権者の受領遅滞でも、債務者の履行提供の有無を見る。',
      '受領遅滞中は、自己の財産と同一の注意で保存すれば足りる。',
      '受領遅滞後に当事者双方に責めのない不能が生じた場合、反対給付の扱いが問題になる。',
    ],
    table: {
      headers: ['効果', '内容', '見るポイント'],
      rows: [
        ['注意義務軽減', '自己財産と同一の注意', '413条1項'],
        ['増加費用', '債権者負担へ寄る', '受領しないことが原因か'],
        ['履行不能', '危険負担と反対給付', '536条2項'],
        ['解除・損害賠償', '債務者の帰責性とは別に検討', '415条・542条'],
      ],
    },
    note: '受領遅滞は「受け取らない側に不利益が寄る」と押さえる。',
  },
  {
    group: 'soron',
    slug: 'damages-scope-foreseeability',
    title: '損害賠償の範囲',
    subtitle: '416条の通常損害・特別損害を、予見可能性で切る',
    sourceImages: ['PXL_20260612_092842215.jpg', 'PXL_20260612_092850613.jpg'],
    placement: '債権総論 Q5・Q6 の「もっと深掘る」候補',
    lead: '債務不履行による損害賠償は、通常生ずべき損害が基本。特別事情による損害は、当事者がその事情を予見すべきであったときに賠償範囲へ入る。',
    traps: [
      '特別損害は、実際に予見していたことまでは不要で、予見可能性が軸になる。',
      '契約責任では416条、不法行為では相当因果関係として似た発想が出る。',
      '金銭債務の遅延損害は419条の特則も確認する。',
    ],
    table: {
      headers: ['損害の種類', '賠償範囲', '暗記ポイント'],
      rows: [
        ['通常損害', '原則として賠償対象', '416条1項'],
        ['特別損害', '予見すべき事情があると対象', '416条2項'],
        ['金銭債務', '法定利率・約定利率の特則', '419条'],
        ['不法行為との比較', '相当因果関係で整理', '709条・722条'],
      ],
    },
    note: '損害賠償の範囲は「普通に起きるか、特別事情を予見できたか」。',
  },
  {
    group: 'soron',
    slug: 'creditor-subrogation-vs-fraudulent',
    title: '債権者代位権と詐害行為取消権',
    subtitle: '423条系と424条系を、目的・要件・効果で比較',
    sourceImages: ['PXL_20260612_092332587.jpg'],
    placement: '債権総論 Q7・Q8 の「もっと深掘る」候補',
    lead: '債権者代位権は債務者の権利を債権者が代わりに行使する制度。詐害行為取消権は、債務者の財産を減らす行為を取り消して責任財産を回復する制度。',
    traps: [
      '代位権は、被保全債権の期限到来が原則。ただし保存行為などは例外がある。',
      '代位行使できる権利は、原則として債務者の一身専属権を除く。',
      '詐害行為取消権は、財産減少行為と債務者・受益者側の主観を分ける。',
    ],
    table: {
      headers: ['制度', '目的', '使う場面'],
      rows: [
        ['債権者代位権', '債務者の権利を行使', '債務者が権利を行使しない'],
        ['詐害行為取消権', '責任財産を回復', '債務者が財産を減少させる'],
        ['保存行為', '期限前でも代位可能', '財産保全が必要'],
        ['取消しの効果', '債務者の責任財産へ戻す', '相手方との関係も見る'],
      ],
    },
    note: '代位は「代わりに行使」、取消しは「逃がした財産を戻す」。',
  },
  {
    group: 'soron',
    slug: 'multiple-debtors-map',
    title: '多数当事者の債権債務',
    subtitle: '分割・不可分・連帯・保証を、対外関係と内部関係で分ける',
    sourceImages: ['PXL_20260612_092356459.jpg'],
    placement: '債権総論 Q9〜Q11 の「もっと深掘る」候補',
    lead: '多数当事者では、債権者に対する対外関係と、当事者同士の内部関係を分ける。分割債権、不可分債権、連帯債務、保証債務で絶対効・相対効が問われる。',
    traps: [
      '分割債権債務は、原則として各人が等しい割合で権利義務を持つ。',
      '不可分債権は目的の性質上不可分なときに問題になる。',
      '連帯債務では、絶対効が限定され、相対効が原則になる。',
      '保証債務では、主たる債務との付従性・補充性を確認する。',
    ],
    table: {
      headers: ['類型', '外部への効き方', '内部で見ること'],
      rows: [
        ['分割債務', '各自の割合だけ負担', '原則等割合'],
        ['不可分債務', '全部給付が問題', '目的の性質'],
        ['連帯債務', '各自が全部履行義務', '求償・絶対効'],
        ['保証債務', '主債務を担保', '付従性・補充性'],
      ],
    },
    note: '多数当事者は「債権者から見た外側」と「当事者同士の内側」を分ける。',
  },
  {
    group: 'kakuron',
    slug: 'simultaneous-performance-cancellation',
    title: '同時履行・履行着手・解除',
    subtitle: '533条と解除の場面を「引換え」と「手付」で切り分ける',
    sourceImages: ['PXL_20260612_092756080.jpg', 'PXL_20260612_092801399.jpg', 'PXL_20260612_092918636.jpg'],
    placement: '債権各論 Q1〜Q4 の「もっと深掘る」候補',
    lead: '双務契約では、相手が履行提供するまで自己の履行を拒める。解除は催告解除と無催告解除に分かれ、手付解除では相手方が履行に着手するまでという制限が重要。',
    traps: [
      '履行提供が一度あっても、提供が継続されなければ同時履行の抗弁は残る。',
      '解除手付は、相手方が履行に着手するまでは解除できる。',
      '債務不履行解除があっても、損害賠償請求は可能。',
      '売買契約費用は、当事者双方が等しい割合で負担する。',
    ],
    table: {
      headers: ['制度', '要点', '間違えやすい点'],
      rows: [
        ['同時履行', '引換給付の公平', '提供の継続が問題'],
        ['催告解除', '相当期間を定めた催告', '軽微な不履行は解除不可'],
        ['無催告解除', '不能・拒絶など', '542条の類型で見る'],
        ['解除手付', '履行着手前まで', '自分の着手ではなく相手方の着手'],
      ],
    },
    note: '契約解除は「催告が要るか」と「相手方がもう動いたか」が分岐点。',
  },
  {
    group: 'kakuron',
    slug: 'seller-warranty-remedies',
    title: '売主の担保責任と買主の救済',
    subtitle: '契約不適合を、追完・代金減額・解除・損害賠償で整理',
    sourceImages: ['PXL_20260612_093035401.jpg'],
    placement: '債権各論 Q3・Q6 の「もっと深掘る」候補',
    lead: '売買目的物が種類・品質・数量・権利の点で契約内容に適合しないとき、買主は追完請求などの救済を検討する。期間制限と帰責事由の要否がひっかけになる。',
    traps: [
      '追完請求と代金減額請求は、種類・品質・数量の不適合で中心になる。',
      '損害賠償と解除では、債務不履行の一般原則との接続を確認する。',
      '権利の全部が他人に属する場合などは、権利移転不能として処理する。',
    ],
    table: {
      headers: ['不適合', '使う救済', '条文の軸'],
      rows: [
        ['種類・品質・数量', '追完・減額・解除・損害賠償', '562条〜564条'],
        ['移転した権利の不適合', '追完・減額など', '565条'],
        ['期間制限', '知った時から1年通知', '566条'],
        ['費用償還', '買主の費用処理', '売買の付随問題'],
      ],
    },
    note: '契約不適合は「目的物のズレ」と「権利のズレ」を分けて見る。',
  },
  {
    group: 'kakuron',
    slug: 'gift-vs-death-gift',
    title: '贈与と死因贈与の比較',
    subtitle: '単独行為の遺贈と、契約である死因贈与を混同しない',
    sourceImages: ['PXL_20260612_093009276.jpg'],
    placement: '債権各論 Q5・家族法 Q11〜Q12 周辺の補助候補',
    lead: '贈与は契約、遺贈は単独行為、死因贈与は契約である点が出発点。撤回可能性、方式、能力、負担付きかどうかで比較する。',
    traps: [
      '死因贈与は遺贈ではなく契約なので、受贈者との合意がある。',
      '書面によらない贈与は原則撤回できるが、履行済み部分は撤回できない。',
      '負担付き死因贈与では、負担履行後の撤回制限が問題になる。',
    ],
    table: {
      headers: ['比較軸', '遺贈', '死因贈与'],
      rows: [
        ['法的性質', '単独行為', '契約'],
        ['行為能力', '15歳で単独可', '18歳で単独可'],
        ['効力発生', '遺言者の死亡', '贈与者の死亡'],
        ['撤回', 'いつでも可', '遺贈規定を準用。ただし負担履行に注意'],
      ],
    },
    note: '死因贈与は「死んだらあげる契約」。遺言とは入口が違う。',
  },
  {
    group: 'kakuron',
    slug: 'loan-return-timing',
    title: '貸借の返還時期',
    subtitle: '消費貸借・使用貸借・賃貸借・寄託を返還時期で比較',
    sourceImages: ['PXL_20260612_093105941.jpg'],
    placement: '債権各論 Q7〜Q10 の「もっと深掘る」候補',
    lead: '貸借・寄託は、返還時期の定めの有無で結論が変わる。貸主側から請求できるか、借主・受寄者側からいつ返せるかを分ける。',
    traps: [
      '返還時期の定めがない消費貸借は、貸主の催告から相当期間経過後。',
      '使用貸借は、目的・期間・使用収益の終了で返還時期を判断する。',
      '寄託は、返還時期の定めがなければいつでも返還請求できる。',
    ],
    table: {
      headers: ['契約', '返還時期あり', '返還時期なし'],
      rows: [
        ['消費貸借', '期限到来時', '催告後相当期間経過後'],
        ['使用貸借', '期限・目的終了時', '目的に従った使用収益終了時など'],
        ['賃貸借', '期間満了・解約申入れ', '617条の解約申入れ'],
        ['寄託', '期限到来時。ただし受寄者は事情により前も可', 'いつでも返還請求可'],
      ],
    },
    note: '返還時期は「貸した側の請求」と「借りた側の返還」を分けると崩れにくい。',
  },
  {
    group: 'kakuron',
    slug: 'contract-type-map',
    title: '典型契約の横断比較',
    subtitle: '使用貸借・賃貸借・委任・寄託・請負を表で見る',
    sourceImages: ['PXL_20260612_093110589.jpg', 'PXL_20260612_093127081.MP.jpg'],
    placement: '債権各論 Q7〜Q13 の横断整理候補',
    lead: '典型契約は、無償・有償、諾成・要物、報酬請求、費用償還、終了原因を横断で見ると、個別条文の暗記がつながる。',
    traps: [
      '使用貸借は無償、賃貸借は有償。',
      '委任は原則無償だが、特約で報酬請求できる。',
      '寄託は改正後の諾成契約化と、返還時期の処理が狙われる。',
      '請負は仕事完成と報酬、目的物引渡しの有無を分ける。',
    ],
    table: {
      headers: ['契約', '中心義務', '試験での比較軸'],
      rows: [
        ['使用貸借', '無償で使用収益させる', '通常必要費・返還時期'],
        ['賃貸借', '有償で使用収益させる', '賃料・修繕・対抗力'],
        ['委任', '事務処理', '善管注意・報酬・解除'],
        ['寄託', '物の保管', '返還時期・損害賠償'],
        ['請負', '仕事完成', '報酬時期・契約不適合'],
      ],
    },
    note: '典型契約は「何を約束した契約か」を先に言語化する。',
  },
  {
    group: 'kakuron',
    slug: 'earnest-money-and-performance',
    title: '手付解除と履行着手',
    subtitle: '557条は「相手方が履行に着手するまで」が境界線',
    sourceImages: ['PXL_20260612_092850613.jpg', 'PXL_20260612_092918636.jpg'],
    placement: '債権各論 Q2〜Q4 の「もっと深掘る」候補',
    lead: '買主が手付を交付したとき、当事者の一方は相手方が履行に着手するまでは、買主は手付放棄、売主は倍額償還で解除できる。',
    traps: [
      '解除できる限界は、自分ではなく相手方の履行着手。',
      '履行着手は、客観的に外部から認識できる履行行為かで判断する。',
      '手付解除ができても、別に債務不履行解除や損害賠償が問題になる場合がある。',
    ],
    table: {
      headers: ['当事者', '解除方法', '限界'],
      rows: [
        ['買主', '手付を放棄', '相手方の履行着手まで'],
        ['売主', '手付の倍額を現実に提供', '相手方の履行着手まで'],
        ['履行着手', '履行の準備を超えた行為', '事案ごとに判断'],
        ['契約費用', '双方が等しい割合で負担', '558条'],
      ],
    },
    note: '手付解除は「相手がもう本気で動いたか」で止まる。',
  },
  {
    group: 'kakuron',
    slug: 'sale-expenses-risk',
    title: '売買の費用・危険・果実',
    subtitle: '558条・575条周辺を、目的物引渡しまでの処理で整理',
    sourceImages: ['PXL_20260612_092926452.jpg', 'PXL_20260612_093035401.jpg'],
    placement: '債権各論 Q1〜Q6 の補助資料候補',
    lead: '売買では、契約費用、目的物の果実、代金利息、危険の移転などが細かく問われる。目的物を誰が支配しているか、代金支払時期はいつかで整理する。',
    traps: [
      '売買契約費用は、当事者双方が等しい割合で負担する。',
      '目的物の引渡し前後で、果実と代金利息の処理が変わる。',
      '契約不適合と危険負担を混同しない。',
    ],
    table: {
      headers: ['項目', '原則', '注意点'],
      rows: [
        ['契約費用', '双方が等しい割合で負担', '558条'],
        ['果実', '目的物の引渡しまで売主側に寄る', '575条'],
        ['代金利息', '引渡しと代金支払時期を確認', '575条'],
        ['危険負担', '不能原因と帰責性を見る', '536条'],
      ],
    },
    note: '売買の細部は「引渡し前か後か」で線を引く。',
  },
  {
    group: 'kakuron',
    slug: 'lease-assignment-sublease',
    title: '賃借権譲渡・転貸',
    subtitle: '612条・613条を、無断転貸と転借人の地位で押さえる',
    sourceImages: ['PXL_20260612_093025440.jpg'],
    placement: '債権各論 Q8〜Q10 の「もっと深掘る」候補',
    lead: '賃借人は、賃貸人の承諾なく賃借権を譲渡し、または賃借物を転貸できない。無断転貸では解除の可否、適法転貸では転借人の直接義務が問題になる。',
    traps: [
      '無断譲渡・無断転貸でも、背信的行為と認めるに足りない特段事情があれば解除できないことがある。',
      '適法転貸では、転借人は賃貸人に対して直接義務を負う。',
      '原賃貸借が終了したときの転借人保護は、終了原因で分ける。',
    ],
    table: {
      headers: ['場面', '結論', '見るポイント'],
      rows: [
        ['無断譲渡・転貸', '原則解除可能', '612条'],
        ['背信性なし', '解除不可の余地', '信頼関係破壊の有無'],
        ['適法転貸', '転借人が直接義務を負う', '613条'],
        ['原賃貸借終了', '終了原因で転借人の地位が変わる', '合意解除・債務不履行解除'],
      ],
    },
    note: '転貸は「承諾の有無」と「信頼関係が壊れたか」で見る。',
  },
  {
    group: 'kakuron',
    slug: 'mandate-termination-reward',
    title: '委任の報酬・解除・終了',
    subtitle: '善管注意、報酬請求、いつでも解除を一枚で整理',
    sourceImages: ['PXL_20260612_093110589.jpg', 'PXL_20260612_093127081.MP.jpg'],
    placement: '債権各論 Q12・Q13 の「もっと深掘る」候補',
    lead: '委任は事務処理を目的とする契約。受任者は善管注意義務を負い、報酬は特約があるときに請求できる。各当事者はいつでも解除できるが、損害賠償が問題になることがある。',
    traps: [
      '委任は原則無償だが、特約があれば報酬請求できる。',
      '受任者は善良な管理者の注意をもって事務処理をする。',
      'いつでも解除できるが、不利な時期の解除では損害賠償が問題になる。',
    ],
    table: {
      headers: ['項目', '委任の処理', '条文'],
      rows: [
        ['注意義務', '善管注意義務', '644条'],
        ['報酬', '特約があるとき請求可', '648条'],
        ['費用償還', '必要費等の償還', '650条'],
        ['解除', '各当事者がいつでも解除可', '651条'],
      ],
    },
    note: '委任は「頼まれた事務を善管注意で処理する契約」。',
  },
  {
    group: 'kakuron',
    slug: 'management-without-mandate',
    title: '事務管理',
    subtitle: '頼まれていない事務処理でも、本人のためなら法律関係が生じる',
    sourceImages: ['PXL_20260612_093127081.MP.jpg', 'PXL_20260612_093308630.MP.jpg'],
    placement: '債権各論 Q13 の「もっと深掘る」候補',
    lead: '事務管理は、義務なく他人のために事務を管理する制度。管理者には本人の意思・利益に適合する管理義務があり、費用償還などが問題になる。',
    traps: [
      '本人のためにする意思が必要。',
      '本人の意思を知っている、または推知できるときはそれに従う。',
      '必要費・有益費の償還は、本人の利益との関係で見る。',
    ],
    table: {
      headers: ['論点', '処理', '覚え方'],
      rows: [
        ['成立', '義務なく他人の事務を管理', '697条'],
        ['管理方法', '本人の意思・利益に適合', '本人中心'],
        ['通知・継続', '本人へ通知し、必要なら継続', '699条・700条'],
        ['費用償還', '有益費などの償還', '702条'],
      ],
    },
    note: '事務管理は「頼まれていないけど、本人のために動いた」場面。',
  },
  {
    group: 'kakuron',
    slug: 'tort-basic-map',
    title: '不法行為の基本構造',
    subtitle: '709条から責任無能力・監督義務者・使用者責任へ広げる',
    sourceImages: ['PXL_20260612_093308630.MP.jpg', 'PXL_20260612_093421464.jpg'],
    placement: '債権各論 Q14〜Q22 の「もっと深掘る」候補',
    lead: '不法行為は、故意・過失、権利侵害または法律上保護される利益侵害、損害、因果関係が基本。そこから責任能力、監督義務者責任、使用者責任、工作物責任へ広がる。',
    traps: [
      '責任無能力者本人は賠償責任を負わないが、監督義務者責任を検討する。',
      '使用者責任では、事業の執行について加えた損害かを見る。',
      '工作物責任は、土地工作物の設置・保存の瑕疵が軸になる。',
    ],
    table: {
      headers: ['責任類型', '条文', '見るポイント'],
      rows: [
        ['一般不法行為', '709条', '故意過失・損害・因果関係'],
        ['責任無能力', '712条・713条', '本人責任なし'],
        ['監督義務者', '714条', '監督義務違反'],
        ['使用者・工作物', '715条・717条', '事業執行性・瑕疵'],
      ],
    },
    note: '不法行為は709条の骨格から、特殊責任へ枝分かれさせる。',
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
  fillText(ctx, item.group === 'soron' ? '民法 債権総論' : '民法 債権各論', M + 26, y + 42, C.green);
  setFont(ctx, 42, 'bold');
  fillText(ctx, item.title, M + 26, y + 88, C.ink);
  setFont(ctx, 22, 'normal');
  fillText(ctx, item.subtitle, M + 660, y + 86, C.muted);
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
    '# 民法債権 元画像ベース深掘り画像メモ',
    '',
    `元画像フォルダ: \`${path.relative(ROOT, SOURCE_DIR).replace(/\\/g, '/')}\``,
    '',
    '- `債権総論` フォルダ内に各論素材が混在していたため、条文番号・論点名で総論/各論を分類した。',
    '- `債権各論` と `家族法` フォルダは空だった。今回、家族法として確実に配置できる元画像は確認できていない。',
    '',
    ...ITEMS.flatMap((item) => [
      `## ${item.group === 'soron' ? '債権総論' : '債権各論'}: ${item.title}`,
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
      '### 暗記の芯',
      '',
      item.note,
      '',
    ]),
  ].join('\n');
}

function main() {
  for (const dir of Object.values(OUT_DIRS)) fs.mkdirSync(dir, { recursive: true });
  fs.mkdirSync(path.dirname(MD_OUT), { recursive: true });
  fs.writeFileSync(MD_OUT, markdown(), 'utf8');

  for (const item of ITEMS) {
    const prefix = item.group === 'soron' ? 'minpo-saikensouron' : 'minpo-saikenkakuron';
    const out = path.join(OUT_DIRS[item.group], `${prefix}-${item.slug}.png`);
    fs.writeFileSync(out, drawImage(item).toBuffer('image/png'));
    console.log(out);
  }
  console.log(MD_OUT);
}

main();
