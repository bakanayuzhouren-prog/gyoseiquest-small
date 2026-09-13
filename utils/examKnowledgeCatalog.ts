export type ExamKnowledgeOffer = {
  id: string;
  text: string;
  followUpQuestion: string;
  matchTerms: string[];
  coveredTerms: string[];
};

export type ExamKnowledgeCard = {
  id: string;
  title: string;
  subject: string;
  path: string;
  searchTerms: string[];
  body: string;
  offers: ExamKnowledgeOffer[];
};

export const EXAM_KNOWLEDGE_CARDS: ExamKnowledgeCard[] = [
  {
    id: 'exam-kb-lec-r2-q24-jichitai-keiyaku',
    title: '自治体の契約方法と原則・例外',
    subject: '地方自治法',
    path: 'data/knowledge/受験生向け知識ベース/lec-r2-q24-jichitai-keiyaku.md',
    searchTerms: [
      '自治体の契約',
      '地方公共団体の契約',
      '一般競争入札',
      '指名競争入札',
      '随意契約',
      'せり売り',
      '地方自治法234',
      '167条の3',
      'LEC公開2問24',
      'LEC公開２問24',
    ],
    body:
      '一般競争入札が原則。指名競争入札・随意契約・せり売りは政令所定の場合に限る（地方自治法234条1項・2項）。せり売りは動産の売払いに適する場合（施行令167条の3）。違法な随意契約も当然無効ではなく、制限の趣旨を没却する特段の事情があるときに私法上無効（最判昭62.5.19）。支出契約でも必ず最低価格とは限らない（施行令167条の10等）。地元業者への配慮にも裁量の限界がある（最判平18.10.26）。',
    offers: [
      {
        id: 'jichitai-keiyaku-gensoku',
        text: '自治体の契約方法と、原則・例外に関しても、学習しますか？',
        followUpQuestion:
          '地方公共団体の契約は一般競争入札が原則で、指名競争入札・随意契約・せり売りは政令所定の場合に限る。違法な随意契約の効力、最低価格の例外、地元業者への配慮の限界を説明して。',
        matchTerms: ['一般競争', '指名競争', '随意契約', 'せり売り', '自治体の契約', '地方公共団体の契約', '問24'],
        coveredTerms: ['一般競争が原則', '契約方法の原則と例外'],
      },
    ],
  },
  {
    id: 'exam-kb-lec-r2-q28-muken-dairi-sozoku',
    title: '無権代理と相続の五つのパターン',
    subject: '民法総則',
    path: 'data/knowledge/受験生向け知識ベース/lec-r2-q28-muken-dairi-sozoku.md',
    searchTerms: [
      '無権代理と相続',
      '無権代理',
      '追認拒絶',
      '117条',
      '共同相続',
      'LEC公開2問28',
      'LEC公開２問28',
    ],
    body:
      'Aが代理権なくB所有の土地を売った。効果の帰属と117条責任は別。1: BがAを単独相続しても追認拒絶可。成立した117条責任は承継。2: AがBを単独相続すると本人自ら契約したのと同様。3: Xが無権代理人と本人の地位を順に承継すると追認拒絶不可。4: A・Y・Zが共同相続しY・Zが拒絶しても、Aの相続分は当然に有効にならない。追認権は不可分。5: 生前の追認拒絶は、その後の相続で復活しない。117条は常に成立するとは限らない。',
    offers: [
      {
        id: 'muken-dairi-sozoku-5',
        text: '無権代理と相続の５つのパターンに関しても、学習しますか？',
        followUpQuestion:
          '無権代理と相続は、相続の向き、単独か共同か、生前に追認を拒絶したかを分けて見る。五つのパターンと、共同相続では自己の持分だけ当然に有効にならない理由を説明して。',
        matchTerms: ['無権代理', '追認', '117条', '共同相続', '問28'],
        coveredTerms: ['五つのパターン', '5つのパターン', '追認権は不可分'],
      },
    ],
  },
  {
    id: 'exam-kb-lec-r2-q30-u-fudosan-chintai',
    title: '不動産賃貸の先取特権の対象',
    subject: '民法物権',
    path: 'data/knowledge/受験生向け知識ベース/lec-r2-q30-u-fudosan-chintai.md',
    searchTerms: [
      '不動産賃貸の先取特権',
      '賃借人の動産',
      '備え付けた動産',
      '312条',
      '313条',
      'LEC公開2問30',
      'LEC公開２問30',
      '問30ウ',
    ],
    body:
      '不動産賃貸の先取特権が保護するのは家賃などの債権。対象は賃借人の動産で、建物賃貸では建物に備え付けた動産（312条・313条2項）。貸している建物そのものではない。制度名の不動産は債権の原因であり、対象物が不動産だという意味ではない。優先弁済は換価手続の話であり、大家が家具を持ち去ってよいわけではない。',
    offers: [
      {
        id: 'fudosan-chintai-taisho',
        text: '先取特権が保護する債権と、対象となる財産に関しても、学習しますか？',
        followUpQuestion:
          '不動産賃貸の先取特権が保護するのは家賃などの債権であり、対象は賃借人の動産である。制度名の不動産と対象物を混同しない理由を説明して。',
        matchTerms: ['不動産賃貸', '賃借人の動産', '備え付け', '家賃', 'その不動産', '問30'],
        coveredTerms: ['対象は賃借人の動産', '備付動産'],
      },
    ],
  },
  {
    id: 'exam-kb-lec-r2-q35-shiin-zoyo-izo',
    title: '死因贈与と遺贈の違い',
    subject: '家族法',
    path: 'data/knowledge/受験生向け知識ベース/lec-r2-q35-shiin-zoyo-izo.md',
    searchTerms: [
      '死因贈与',
      '遺贈',
      '負担付',
      '554条',
      '961条',
      'LEC公開2問35',
      'LEC公開２問35',
    ],
    body:
      '死因贈与は契約で承諾が必要。遺贈は単独行為で成立に承諾は不要。どちらも死亡によって効力が生じる。遺言の方式は死因贈与には不要。遺贈は法定の遺言方式が必要。負担は両方に付けられる。死因贈与は代理可、遺贈は代理不可。15歳の者が財産を与える場合、死因贈与は法定代理人の同意がなければ原則取り消し得る。遺贈は満15歳で可能で、未成年であることを理由には取り消せない。554条の準用は性質に反しない限度。',
    offers: [
      {
        id: 'shiin-zoyo-izo',
        text: '死因贈与と遺贈の違いに関しても、学習しますか？',
        followUpQuestion:
          '死因贈与は契約で承諾が必要、遺贈は単独行為で成立に承諾は不要。負担は両方に付けられる。方式・代理・15歳の与える側の違いを説明して。',
        matchTerms: ['死因贈与', '遺贈', '負担付', '問35'],
        coveredTerms: ['死因贈与は契約', '遺贈は遺言'],
      },
    ],
  },
];

export function examKnowledgeCardById(id: string): ExamKnowledgeCard | undefined {
  return EXAM_KNOWLEDGE_CARDS.find((c) => c.id === id);
}

export function examKnowledgeOfferById(offerId: string): { card: ExamKnowledgeCard; offer: ExamKnowledgeOffer } | undefined {
  for (const card of EXAM_KNOWLEDGE_CARDS) {
    const offer = card.offers.find((o) => o.id === offerId);
    if (offer) return { card, offer };
  }
  return undefined;
}
