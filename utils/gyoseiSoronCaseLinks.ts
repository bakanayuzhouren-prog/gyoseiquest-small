/** 行政法の肢に、事件名も判決日も無いときの結び。問題文は持たない。 */

export type GyoseiSoronCaseHit = {
  id: string;
  name: string;
  date: string;
};

type Rule = GyoseiSoronCaseHit & {
  all: string[];
  note: string;
};

const RULES: Rule[] = [
  {
    id: 'kouchisho',
    name: '拘置所の被勾留者と安全配慮義務',
    date: '最判平28.4.21',
    all: ['未決勾留', '安全配慮'],
    note: '未決勾留で拘置所に入っている被勾留者に対し、国は信義則上の安全配慮義務を負わない。勾留は意思に基づく関係ではない。',
  },
  {
    id: 'hachinohe-anzen',
    name: '陸上自衛隊八戸車両整備工場事件',
    date: '最判昭50.2.25',
    all: ['国家公務員', '安全配慮'],
    note: '国は国家公務員に対し、公務の施設と公務の管理について生命と健康を守る安全配慮義務を負う。この損害賠償の時効は民法の10年である。',
  },
  {
    id: 'hachinohe-inochi',
    name: '陸上自衛隊八戸車両整備工場事件',
    date: '最判昭50.2.25',
    all: ['国家公務員', '生命'],
    note: '国は国家公務員に対し、公務の施設と公務の管理について生命と健康を守る安全配慮義務を負う。この損害賠償の時効は民法の10年である。',
  },
  {
    id: 'hachinohe-sesshoku',
    name: '陸上自衛隊八戸車両整備工場事件',
    date: '最判昭50.2.25',
    all: ['特別な社会的接触', '安全配慮'],
    note: '国は国家公務員に対し、公務の施設と公務の管理について生命と健康を守る安全配慮義務を負う。この損害賠償の時効は民法の10年である。',
  },
  {
    id: 'hachinohe-kaikei',
    name: '陸上自衛隊八戸車両整備工場事件',
    date: '最判昭50.2.25',
    all: ['安全配慮', '会計法'],
    note: '国は国家公務員に対し、公務の施設と公務の管理について生命と健康を守る安全配慮義務を負う。この損害賠償の時効は民法の10年である。',
  },
  {
    id: 'ginoza',
    name: '宜野座工場誘致事件',
    date: '最判昭56.1.27',
    all: ['将来にわたって継続すべき'],
    note: '施策の変更で特定の者に特別の犠牲が出ても、損失補償の要否と、変更が違法かどうかは別である。',
  },
  {
    id: 'ginoza-songai',
    name: '宜野座工場誘致事件',
    date: '最判昭56.1.27',
    all: ['積極的損害'],
    note: '施策の変更で特定の者に特別の犠牲が出ても、損失補償の要否と、変更が違法かどうかは別である。',
  },
  {
    id: 'tax',
    name: '租税法律関係と信義則',
    date: '最判昭62.10.30',
    all: ['租税法律主義', '信義則'],
    note: '租税法規に合う課税処分を信義則で取り消せるのは、平等と公平を犠牲にしても保護しなければ正義に反する特別の事情があるときだけである。',
  },
  {
    id: 'tax-short',
    name: '租税法律関係と信義則',
    date: '最判昭62.10.30',
    all: ['租税', '信義'],
    note: '租税法規に合う課税処分を信義則で取り消せるのは、平等と公平を犠牲にしても保護しなければ正義に反する特別の事情があるときだけである。',
  },
  {
    id: 'amari-yuen',
    name: '余目町個室付浴場事件',
    date: '最判昭53.5.26',
    all: ['児童遊園'],
    note: '児童福祉の権限を、個室付浴場の営業阻止という別目的で使う許可は、権限の目的外行使として違法である。',
  },
  {
    id: 'amari-koshitsu',
    name: '余目町個室付浴場事件',
    date: '最判昭53.5.26',
    all: ['個室付'],
    note: '児童福祉の権限を、個室付浴場の営業阻止という別目的で使う許可は、権限の目的外行使として違法である。',
  },
  {
    id: 'hibaku-gentei',
    name: '在外被爆者健康管理手当事件',
    date: '最判平19.2.6',
    all: ['極めて限定'],
    note: '普通地方公共団体の金銭債権について、時効の主張が信義則に反して許されない場合は極めて限定される。根拠のない通達で権利行使を塞いだあとの時効主張は、特段の事情がない限り許されない。',
  },
  {
    id: 'hibaku-tsutatsu',
    name: '在外被爆者健康管理手当事件',
    date: '最判平19.2.6',
    all: ['通達', '消滅時効'],
    note: '普通地方公共団体の金銭債権について、時効の主張が信義則に反して許されない場合は極めて限定される。根拠のない通達で権利行使を塞いだあとの時効主張は、特段の事情がない限り許されない。',
  },
  {
    id: 'kiinagashima',
    name: '紀伊長島町水道水源保護条例事件',
    date: '最判平16.12.24',
    all: ['水道水源'],
    note: '水道水源保護条例の認定は、協議の機会があったのに、事業者の地位を不当に害しない配慮を尽くさないと違法になる。',
  },
  {
    id: 'koeijutaku',
    name: '公営住宅の使用権と相続',
    date: '最判平2.10.18',
    all: ['公営住宅', '相続', '同居'],
    note: '公営住宅の入居者が死亡しても、相続人が使用権を当然に承継する余地はない。',
  },
  {
    id: 'kobe-kosen',
    name: '神戸高専剣道実技拒否事件',
    date: '最判平8.3.8',
    all: ['剣道'],
    note: '信仰上の理由で剣道実技を拒否した学生に、代替措置を検討せず原級留置等をするのは、裁量の逸脱として違法である。',
  },
  {
    id: 'ikata',
    name: '伊方原発訴訟',
    date: '最判平4.10.29',
    all: ['原子炉', '安全'],
    note: '原子炉設置許可の安全審査は、科学的で専門技術的な裁量に属する。裁判所は、判断の過程に看過し難い過誤欠落がないかを審査する。',
  },
  {
    id: 'yubin-yakuji',
    name: '薬事法の郵便等販売規制',
    date: '最判平25.1.11',
    all: ['郵便', '薬事'],
    note: '第一類・第二類医薬品の店舗外の郵便等販売を一律に禁止する部分は、法律の委任の範囲を逸脱し違法で無効である。',
  },
  {
    id: 'yubin-hanbai',
    name: '薬事法の郵便等販売規制',
    date: '最判平25.1.11',
    all: ['郵便', '販売'],
    note: '第一類・第二類医薬品の店舗外の郵便等販売を一律に禁止する部分は、法律の委任の範囲を逸脱し違法で無効である。',
  },
  {
    id: 'kukaku',
    name: '土地区画整理事業計画',
    date: '最大判平20.9.10',
    all: ['土地区画整理', '事業計画'],
    note: '土地区画整理の事業計画の決定には処分性がある。青写真判決（昭41.2.23）から変わった。',
  },
  {
    id: 'kazei-mukou',
    name: '課税処分の当然無効',
    date: '最判昭48.4.26',
    all: ['課税処分', '明白'],
    note: '課税処分は第三者の保護が薄い。重大な瑕疵があれば、明白でなくても当然無効になり得る。ただし重大だけでは足りない。',
  },
  {
    id: 'youto',
    name: '用途地域の指定',
    date: '最判昭57.4.22',
    all: ['用途地域'],
    note: '用途地域の指定は、一般的で抽象的な計画の決定であり、抗告訴訟の処分には当たらない。争うのは建築確認である。',
  },
  {
    id: 'shinagawa',
    name: '品川マンション事件',
    date: '最判昭60.7.16',
    all: ['品川'],
    note: '建築確認を、行政指導に協力させるために留保することは、法律の根拠なく確認を拒むことになり違法である。',
  },
  {
    id: 'kunitachi',
    name: '国立マンション事件',
    date: '最判平18.3.30',
    all: ['国立'],
    note: '良好な景観の恵沢を受ける利益は、条例が建築の高さを制限して保護するとき、法律上保護される利益になり得る。',
  },
  {
    id: 'hanbatsu',
    name: '反則金納付通告事件',
    date: '最判昭57.7.15',
    all: ['反則金'],
    note: '交通反則金の納付通告は、納付するかどうかを任意に選べる手続であり、抗告訴訟の処分には当たらない。',
  },
  {
    id: 'kangoku',
    name: '監獄法施行規則事件',
    date: '最判昭59.12.12',
    all: ['監獄', '委任'],
    note: '法律の委任なく、省令や規則で国民の権利を制限する部分は無効である。',
  },
  {
    id: 'kaimbotsu',
    name: '海没地',
    date: '最判昭61.12.16',
    all: ['海没'],
    note: '海そのものは土地ではない。海没しても、支配して利用でき、他の海面と区別できれば土地であり得る。',
  },
  {
    id: 'koyo-haishi',
    name: '黙示的公用廃止',
    date: '最判昭51.12.24',
    all: ['公用廃止'],
    note: '公物が形態と機能を失い、平穏かつ公然に占有され、維持する理由もなければ、明示の廃止がなくても公用廃止になり、取得時効を妨げない。',
  },
  {
    id: 'shitei',
    name: '指定医の指定の撤回',
    date: '最判昭63.6.17',
    all: ['指定医'],
    note: '人工妊娠中絶を行い得る医師の指定は、撤回の明文がなくても、不利益を考慮したうえで公益上の必要が高ければ撤回できる。',
  },
  {
    id: 'kogyo',
    name: '工業地域の指定',
    date: '最判昭57.4.22',
    all: ['工業地域'],
    note: '工業地域の指定は、一般的で抽象的な計画の決定であり、抗告訴訟の処分には当たらない。争うのは建築確認である。',
  },
  {
    id: 'genkyo',
    name: '現業職員の勤務関係',
    date: '最判昭49.7.19',
    all: ['現業', '任用'],
    note: '国の現業職員でも、任用、分限、懲戒、服務は公法関係である。懲戒は抗告訴訟で争う。',
  },
  {
    id: 'daini',
    name: '第二種市街地再開発',
    date: '最判平4.11.26',
    all: ['第二種', '再開発'],
    note: '第二種市街地再開発事業の決定と公告には処分性がある。公告は、収用の事業認定の告示とみなされる。',
  },
  {
    id: 'byoin',
    name: '病院開設中止勧告',
    date: '最判平17.7.15',
    all: ['病院', '勧告'],
    note: '病院の開設中止勧告は、実質的に開設を妨げる効果があり、抗告訴訟の処分に当たる。',
  },
  {
    id: 'kaihatsu-doi',
    name: '開発許可の同意拒否',
    date: '最判平7.3.23',
    all: ['開発許可', '同意'],
    note: '開発許可の前提となる公共施設管理者の同意拒否は、開発を禁止する効果がなく、抗告訴訟の処分には当たらない。',
  },
  {
    id: 'kasanz',
    name: '加算税と罰金の併科',
    date: '最大判昭33.4.30',
    all: ['加算税', '罰金'],
    note: '加算税は納税の実を挙げる行政上の措置であり、罰金とは性質が違う。併科しても憲法39条に反しない。',
  },
  {
    id: 'kentei-monbu',
    name: '教科書検定の施行細則',
    date: '最判平9.8.29',
    all: ['教科書', '文部'],
    note: '文部大臣が教科書検定の審査内容、基準、手続を定めても、法律の委任を欠くとまではいえない。',
  },
  {
    id: 'kentei-saisoku',
    name: '教科書検定の施行細則',
    date: '最判平9.8.29',
    all: ['細則', '文部'],
    note: '文部大臣が教科書検定の審査内容、基準、手続を定めても、法律の委任を欠くとまではいえない。',
  },
  {
    id: 'besso',
    name: '別荘の水道料金',
    date: '最判平18.7.14',
    all: ['給水', '別荘'],
    note: '別荘の給水契約者の基本料金を一般より高くすること自体は、水道事業者の裁量の範囲である。合理性のない大きな格差は、地方自治法244条3項の不当な差別的取扱いに当たり無効である。',
  },
  {
    id: 'mukou-torikeshi-kikan',
    name: '無効でも取消訴訟はできる',
    date: '',
    all: ['無効', '成立当初から', '取消訴訟を提起することはできない'],
    note: 'この文は誤り。処分が無効でも、出訴期間内なら取消訴訟を提起できる。期間を過ぎたあとは、無効確認などによる。言い方が違っても、同じ結論の肢がある。',
  },
  {
    id: 'mukou-torikeshi-futekihou',
    name: '無効でも取消訴訟はできる',
    date: '',
    all: ['無効', '出訴期間内であっても', '取消訴訟は不適法'],
    note: 'この文は誤り。処分が無効でも、出訴期間内なら取消訴訟を提起できる。期間を過ぎたあとは、無効確認などによる。言い方が違っても、同じ結論の肢がある。',
  },
];

/** 同じ事件名の肢を持つ問題番号。言い回しが違っても、2問以上なら黄カードにする。 */
export function caseQuestionIndexMap(
  subject: string | undefined,
  questions: Array<{ choices?: unknown }>,
): Map<string, number[]> {
  const map = new Map<string, number[]>();
  if (subject !== '行政法') return map;
  questions.forEach((item, index) => {
    const names = new Set<string>();
    const choices = Array.isArray(item?.choices) ? item.choices : [];
    choices.forEach((choice) => {
      const hit = matchGyoseiSoronCase(String(choice || ''));
      if (hit) names.add(hit.name);
    });
    names.forEach((name) => {
      const list = map.get(name) || [];
      list.push(index);
      map.set(name, list);
    });
  });
  return map;
}

export function choiceIsSharedCase(choiceText: string, indexMap: Map<string, number[]>): boolean {
  const hit = matchGyoseiSoronCase(choiceText);
  if (!hit) return false;
  return (indexMap.get(hit.name) || []).length >= 2;
}

export function matchGyoseiSoronCase(choiceText: string): GyoseiSoronCaseHit | null {
  const text = choiceText || '';
  for (const rule of RULES) {
    if (rule.all.every((needle) => text.includes(needle))) {
      return { id: rule.id, name: rule.name, date: rule.date };
    }
  }
  return null;
}

/** 結び付いた事件の結論。解説文が空の肢に出す。 */
export function gyoseiSoronCaseNote(
  subject: string | undefined,
  field: string | undefined,
  choiceText: string,
): string | null {
  if (subject !== '行政法') return null;
  const text = choiceText || '';
  for (const rule of RULES) {
    if (rule.all.every((needle) => text.includes(needle))) return rule.note;
  }
  return null;
}

/** 肢に事件名も判決日も無いときだけ、画面用の1行を返す。 */
export function gyoseiSoronCaseLabel(
  subject: string | undefined,
  field: string | undefined,
  choiceText: string,
): string | null {
  if (subject !== '行政法') return null;
  const hit = matchGyoseiSoronCase(choiceText);
  if (!hit) return null;
  if (choiceText.includes(hit.name)) return null;
  if (hit.date && choiceText.includes(hit.date)) return null;
  if (!hit.date) return hit.name;
  return `${hit.name}（${hit.date}）`;
}
