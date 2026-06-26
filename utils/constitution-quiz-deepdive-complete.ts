import { buildFinalConstitutionDeepDive } from '@/utils/constitution-quiz-deepdive-final';

type Input = { stem: string; choice: string; legallyCorrect: boolean | null };
type Override = { test: RegExp; title: string; axis: string; trap: string; story?: string };

const OVERRIDES: Override[] = [
  { test: /^次の文章は、基本的人権の分類/, title: '自由権と社会権の分類', axis: '自由権は国家の消極的規制を求める面、社会権は国家の積極的配慮を求める面を中心にします。ただし両者の区別は相対的で、社会権にも自由権的側面があります。', trap: '本文中に出る個別の権利名ではなく、我妻説が示す分類基準を問う問題です。' },
  { test: /^次の文章の空欄.*未決勾留/, title: '未決勾留者の閲読の自由', axis: '未決勾留は逃亡・罪証隠滅防止のため身体の自由を制限します。新聞・図書の閲読制限には、監獄内の規律・秩序に放置できない障害が生じる相当の蓋然性と、必要かつ合理的な範囲が必要です。', trap: '未決勾留そのものの目的と、施設内の規律維持による追加制約を分けます。', story: '未決勾留中の者が新聞閲読を制限され、拘禁目的を超えて知る自由を制約できる範囲が争われました。' },
  { test: /^基本的人権の間接的、付随的な制約/, title: '人権への間接的・付随的制約', axis: '規制が表現などを直接狙う場合と、別の公共目的を達成する過程で人権へ付随的影響を与える場合を区別し、目的と手段の合理性を検討します。', trap: '付随的制約だから常に緩やかな審査でよい、と決めつけないこと。' },
  { test: /^国務請求権/, title: '国務請求権の整理', axis: '請願権、国家賠償請求権、刑事補償請求権、裁判を受ける権利について、請求先、要件、法的効果を分けます。', trap: '請願を受理する義務と、請願内容どおりに処理する義務を混同しないこと。' },
  { test: /^次の文章の空欄.*国民投票制/s, title: '国民投票制の三類型', axis: '議会が議決した事項を国民が確認するレファレンダム、国民が法律案を提出するイニシアティブ、公務員を罷免するリコールを区別します。', trap: '事項を決める制度と、人を罷免する制度を混同しないこと。' },
  { test: /^次の文章の空欄.*大赦、特赦/s, title: '恩赦の決定と認証', axis: '大赦・特赦・減刑・刑の執行免除・復権は内閣が決定し、天皇が国事行為として認証します。実質的決定と形式的認証を分けます。', trap: '旧憲法上の大権と、現行憲法上の内閣の権能を入れ替えないこと。' },
  { test: /^次の文章は、最高裁判所判決.*国民審査/s, title: '最高裁判所裁判官の国民審査', axis: '国民審査は裁判官の任命を完成させる制度ではなく、罷免の可否を国民が判断するリコール型の制度です。', trap: '信任票の多さではなく、罷免を可とする票が投票総数の過半数かを見ます。', story: '最高裁判所裁判官の国民審査が、任命への信任投票なのか、罷免制度なのかが争われました。' },
  { test: /^次の文章の空欄.*予算表/s, title: '予算の法形式', axis: '諸外国で予算が法律形式をとる考え方と、日本国憲法が法律とは別の「予算」という法形式を採ることを区別します。', trap: '予算の内容が国会の議決を要することと、予算が法律そのものであることを同一視しないこと。' },
  { test: /^衆議院の解散/, title: '衆議院の解散', axis: '解散の実質的決定、内閣の助言と承認、天皇の国事行為、69条と7条による解散の議論を分けます。', trap: '形式的行為者と実質的決定権者を入れ替えないこと。' },
];

export function buildCompleteConstitutionDeepDive(input: Input): string {
  const guide = OVERRIDES.find((item) => item.test.test(input.stem));
  if (!guide) return buildFinalConstitutionDeepDive(input);

  const verdict = input.legallyCorrect == null
    ? 'この問題は、選択肢全体の組合せまたは空欄の対応で判定します。'
    : input.legallyCorrect
      ? 'この肢は、判例・条文の整理に沿っています。'
      : 'この肢は、判例・条文の整理と一致しません。';
  const choice = input.choice.replace(/\s+/g, ' ').slice(0, 100);
  return [
    `${guide.title}\nこの問題固有の判断軸で整理します。`,
    `1. この肢の判定\n${verdict}`,
    guide.story ? `2. 判例のストーリー\n${guide.story}` : '',
    `${guide.story ? '3' : '2'}. 判断の軸\n${guide.axis}`,
    `${guide.story ? '4' : '3'}. この肢の確認ポイント\n「${choice}${input.choice.length > 100 ? '…' : ''}」を判断の軸と照合します。`,
    `${guide.story ? '5' : '4'}. 本番の見分け方\n${guide.trap}`,
  ].filter(Boolean).join('\n\n');
}
