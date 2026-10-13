import AsyncStorage from '@react-native-async-storage/async-storage';

import { choiceNeverAgainHash } from '@/utils/never-again-choices';
import { getQuestionTextHash } from '@/utils/question-stats';

const PREFIX = 'qox_';

export type ChoiceOxStats = { correct: number; wrong: number };

const EMPTY: ChoiceOxStats = { correct: 0, wrong: 0 };

function storageKey(subject: string, field: string, questionText: string, choiceText: string): string {
  return `${PREFIX}${subject}|${field}|${getQuestionTextHash(questionText)}|${choiceNeverAgainHash(choiceText)}`;
}

function parseStats(raw: string | null): ChoiceOxStats {
  if (!raw) return { ...EMPTY };
  try {
    const parsed = JSON.parse(raw);
    return {
      correct: Math.max(0, Number(parsed.correct) || 0),
      wrong: Math.max(0, Number(parsed.wrong) || 0),
    };
  } catch {
    return { ...EMPTY };
  }
}

/** 庁の長官が「規則その他の命令」を自ら発する、とだけ書く肢。13条より広いので誤り。 */
export function agencyHeadOrderIsOverbroad(choiceText: string): boolean {
  const text = (choiceText || '').replace(/\s+/g, '');
  if (!text.includes('庁の長官') || !text.includes('規則') || !text.includes('命令')) return false;
  if (text.includes('別に') || text.includes('政令') || text.includes('特別')) return false;
  return true;
}

export function agencyHeadOrderNote(choiceText: string): string | null {
  if (!agencyHeadOrderIsOverbroad(choiceText)) return null;
  return '庁の長官が自ら発することができるのは、別に法律の定めがあるときの、政令および省令以外の規則その他の特別の命令である。規則その他の命令、とだけ書くと広すぎて誤り。';
}

/** 省の部を「それぞれに置かれる」と書く肢。7条2項は、官房又は局に置くことができる。 */
export function ministryDepartmentIsMandatory(choiceText: string): boolean {
  const text = (choiceText || '').replace(/\s+/g, '');
  if (!text.includes('省') || !text.includes('官房') || !text.includes('局') || !text.includes('部')) return false;
  if (text.includes('ことができる') || text.includes('又は')) return false;
  return text.includes('それぞれ') && text.includes('置かれ');
}

export function ministryDepartmentNote(choiceText: string): string | null {
  if (!ministryDepartmentIsMandatory(choiceText)) return null;
  return '省には官房と局を置く（国家行政組織法7条1項）。部は、官房又は局に、特に必要があるときに置くことができる（7条2項）。それぞれに部が置かれる、と書くと、両方に必ず置かれるように読めて誤り。';
}

/** 委員会と庁の全部が内閣府に置かれる、と書く肢。省の外局もある。 */
export function cabinetOrgAllInNaikakufu(choiceText: string): boolean {
  const text = (choiceText || '').replace(/\s+/g, '');
  if (!text.includes('委員会') || !text.includes('庁') || !text.includes('内閣府')) return false;
  if (text.includes('外局')) return false;
  return text.includes('内部部局') || text.includes('独立性');
}

export function cabinetOrgNote(choiceText: string): string | null {
  if (!cabinetOrgAllInNaikakufu(choiceText)) return null;
  return [
    '委員会と庁の全部が内閣府にあるわけではない。',
    '内閣',
    '内閣官房。主任は内閣総理大臣。',
    '内閣法制局。',
    '内閣府。宮内庁は内閣府に置く（内閣府設置法48条）。64条の外局表には入らない。',
    '外局の委員会は、公正取引、国家公安、個人情報保護、カジノ管理、サイバー通信情報監理。',
    '外局の庁は、金融庁、消費者庁、こども家庭庁（64条）。',
    '警察庁は、国家公安委員会の下。',
    'デジタル庁と復興庁は、内閣に置く。内閣府の外局ではない。',
    '各省。委員会と庁は、省の外局にも置かれる（国家行政組織法3条3項）。国税庁は財務省。',
    '委員会、庁は内閣府に置かれる、と全部を内閣府に書くと誤り。',
  ].join('\n');
}

/** 各省大臣が「省令その他の特別の命令」を発する、と書く肢。12条は省令まで。 */
export function ministerOrderMixesSpecialOrder(choiceText: string): boolean {
  const text = (choiceText || '').replace(/\s+/g, '');
  return text.includes('省令その他') && text.includes('大臣');
}

export function ministerOrderNote(choiceText: string): string | null {
  if (!ministerOrderMixesSpecialOrder(choiceText)) return null;
  return '各省大臣が発することができるのは省令である（国家行政組織法12条1項）。その他の特別の命令は、委員会と庁の長官である（13条1項）。省令とその他の特別の命令を同じに書くと誤り。';
}

/** 一般職の懲戒・分限・政治的行為の罰則。国家公務員法。 */
export function civilServiceDisciplineNote(choiceText: string): string | null {
  const text = (choiceText || '').replace(/\s+/g, '');
  if (text.includes('すべての職種') && text.includes('処分基準')) {
    return '懲戒処分を行うのは、任命権者である（国家公務員法84条1項）。人事院がすべての職種の処分基準を定めて自ら処分する、ではない。';
  }
  if (text.includes('職務時間外')) {
    return '国民全体の奉仕者にふさわしくない非行があれば、職務時間外の行為も懲戒理由になりうる（82条1項3号）。';
  }
  if (text.includes('勤務実績') && text.includes('懲戒')) {
    return '勤務実績がよくないときは、分限として降任または免職ができる（78条1号）。懲戒ではない。懲戒は、免職、停職、減給、戒告（82条1項）。分限の休職は79条。降給は地方公務員法の分限で、この4つに入らない。';
  }
  if (text.includes('降任') && text.includes('休職') && text.includes('懲戒')) {
    return '懲戒は、免職、停職、減給、戒告の4つ（82条1項）。降任と休職は分限で、懲戒の種類ではない。';
  }
  if (text.includes('政治的行為') && text.includes('罰則')) {
    return '102条1項の政治的行為の制限に違反すると、3年以下の拘禁刑または100万円以下の罰金に処する（110条1項18号）。月数ではない。罰則がない、は誤り。懲戒処分も別にある。';
  }
  return null;
}

/** 第一種・第二種とインターネットと行政規則で、郵便等販売の判例を書き違えた肢。 */
export function yakujiInternetBanMisstated(choiceText: string): boolean {
  const text = (choiceText || '').replace(/\s+/g, '');
  return text.includes('第一種') && text.includes('第二種') && text.includes('インターネット');
}

export function yakujiInternetBanNote(choiceText: string): string | null {
  if (!yakujiInternetBanMisstated(choiceText)) return null;
  return '結論の「委任を逸脱して無効」は、最判平25.1.11のとおり。この文が妥当でないのは、次の3語が判決と違うから。医薬品は第一類・第二類で、第一種・第二種ではない。禁止されたのは、店舗外の郵便等販売の一律禁止で、インターネット販売だけではない。無効なのは薬事法施行規則（省令）で、行政規則ではない。';
}

/** 意見公募の対象を法規命令だけとし、行政規則を外す肢。 */
export function publicCommentAdminRuleNote(choiceText: string): string | null {
  const text = (choiceText || '').replace(/\s+/g, '');
  if (!text.includes('意見公募') || !text.includes('行政規則') || !text.includes('法規命令')) return null;
  return 'この肢の行政規則は、審査基準、処分基準、行政指導指針を指す。通達や訓令の形でも、この3つなら命令等に入る（行政手続法2条8号）。意見公募の対象になる（39条1項）。法規命令だけが対象、は誤り。組織や給与だけの内部規則は、意見公募の対象外（3条2項5号、4条）。';
}

/** 審査基準・処分基準・行政指導指針を、法律に基づく命令と言い切る肢。 */
export function standardIsNotMeireiNote(choiceText: string): string | null {
  const text = (choiceText || '').replace(/\s+/g, '');
  if (!text.includes('審査基準') || !text.includes('処分基準') || !text.includes('行政指導指針')) return null;
  if (!text.includes('命令')) return null;
  if (text.includes('意見公募')) return null;
  return '命令等には入る（行政手続法2条8号）。法律に基づく命令には入らない。条文が「命令」と略すのは、法律に基づく命令（処分の要件を定める告示を含む）又は規則だけ（2条8号イ）。審査基準、処分基準、行政指導指針は、その横に別に並ぶ。この文は誤り。';
}

/** 裁判所が懲戒の軽重を比較衡量しない、という否定文の肢。 */
export function disciplineCompareNote(choiceText: string): string | null {
  const text = (choiceText || '').replace(/\s+/g, '');
  if (!text.includes('比較衡量') || !text.includes('懲戒')) return null;
  return 'この文は正しい。最判昭52.12.20（神戸税関）は、裁判所が、いかなる処分をすべきだったかを割り出し、その結果と実際の懲戒の軽重を比較するものではない、とした。見るのは、社会観念上著しく妥当を欠いて裁量権を濫用したか、だけ。「比較衡量するものではない」が、その言い方である。';
}

/** 老齢加算の改定に、厚生労働大臣の政策的裁量がないとする肢。 */
export function oldAgeAdditionNote(choiceText: string): string | null {
  const text = (choiceText || '').replace(/\s+/g, '');
  if (!text.includes('老齢加算')) return null;
  return '老齢加算は、生活保護の生活扶助で、原則として70歳以上の者の基準生活費に上乗せされていた加算である。68歳と69歳の病弱者にも一定額があった。最判平24.2.28は、この部分を改定するとき、厚生労働大臣に専門技術的かつ政策的な見地からの裁量がある、とした。裁量がない、は誤り。平成16年度から3年かけて減額し、平成18年の告示で廃止した改定は、逸脱または濫用ではない。';
}

/** 処分の取消し・無効・承継・強制執行の複数解。 */
export function dispositionDefectNote(choiceText: string): string | null {
  const text = (choiceText || '').replace(/\s+/g, '');
  if (text.includes('裁決または決定によってのみ') || text.includes('裁決又は決定によってのみ')) {
    return 'この文は誤り。瑕疵を理由とする取消しは、取消判決と不服申立ての裁決・決定だけではない。処分庁や上級行政庁が、職権で取り消すこともできる。当事者訴訟は、取り消しうる処分を取り消す方法ではない。当事者訴訟で争えるのは、無効を前提にした法律関係である。';
  }
  if (text.includes('金銭納付義務') && text.includes('国家賠償') && text.includes('取り消されていなければならない')) {
    return 'この文は誤り。金銭の納付を命ずる処分の違法を理由に国家賠償を請求するときは、事前にその処分の取消しを得ておく必要はない。取消訴訟の排他性は、この請求には及ばない。';
  }
  if (text.includes('無効確認の訴えのみ')) {
    return 'この文は誤り。出訴期間の経過後も、無効は当事者訴訟や民事訴訟で主張できる。無効確認の訴えは、現在の法律関係の訴えでは目的を達することができないときに限る補充的な訴えである（行政事件訴訟法36条）。';
  }
  if (text.includes('承継されることが認められる場合であっても') && text.includes('出訴期間')) {
    return 'この文は誤り。違法性の承継が認められるときは、処分Aの出訴期間が過ぎていても、後の処分Bの取消訴訟でAの違法を主張できる。承継は、そのために認める。';
  }
  if (text.includes('明白なものであるとまでは認められなくても')) {
    return 'この文は正しい。原則の無効は、重大かつ明白な瑕疵があるときである。課税処分は、処分を信頼する第三者の保護が薄いので、明白でなくても無効とされる場合がある（最判昭48.4.26）。重大であれば常に無効、ではない。内容の過誤が課税要件の根幹に関わり、徴税の安定を考えても不利益を甘受させるのが著しく不当なときに、明白性は緩和される。';
  }
  if (text.includes('強制執行') && text.includes('法律上の根拠')) {
    return 'この文は正しい。行政庁が国民に強制執行をするには、できる旨の法律の根拠が要る。法律の留保である。代執行は行政代執行法、滞納処分は国税徴収法のように、それぞれの法律が根拠になる。同じ留保で、政令の罰則は、特にその法律の委任がなければ置けない（憲法73条6号ただし書）。省令の罰則も、法律の委任がなければ置けない（国家行政組織法12条3項）。政令への委任だけでは足りない。規則その他の特別の命令も、13条2項が12条3項を準用する。';
  }
  return null;
}

const SAIRYO_YOKEN_KISOKU_TABLE = `
| | 何を判断するか | 裁量 | 例 |
|---|---|---|---|
| 羈束行為 | 法令の要件を満たすか。満たせば必ずする | ない | 建築確認。収用委員会の補償額（平9.1.28） |
| 要件裁量 | 法律の要件に当てはまるか | ある | マクリーン。在留更新の相当の理由（昭53.10.4） |
| 効果裁量 | 要件を満たしたあと、どの処分にするか | ある | 神戸税関。懲戒の種類（昭52.12.20） |

羈束裁量は、裁量はあるが幅が狭い、という古い言い方。羈束行為（裁量がない）とは別。`.trim();

/** 羈束行為・要件裁量・効果裁量。建築確認と収用補償は裁量がない。 */
export function sairyoyokenKisokuNote(choiceText: string): string | null {
  const text = (choiceText || '').replace(/\s+/g, '');
  const table = SAIRYO_YOKEN_KISOKU_TABLE;
  if (text.includes('収用委員会') && text.includes('建築確認') && text.includes('羈束')) {
    return `この文は正しい。収用委員会の補償額に裁量はない。相当な価格は、社会通念に従って客観的に認定する（最判平9.1.28）。建築確認は、法令に適合すれば確認しなければならない羈束行為である。どちらも要件裁量ではない。\n\n${table}`;
  }
  if (text.includes('懲戒権者') && text.includes('軽重')) {
    return `この文は誤り。裁判所は、懲戒権者と同一の立場に立って処分の軽重を比較しない（最判昭52.12.20、神戸税関）。懲戒の種類の選択は効果裁量である。\n\n${table}`;
  }
  if (text.includes('分限') && text.includes('動機') && text.includes('適法')) {
    return `この文は誤り。分限制度の目的と関係のない目的や動機に基づく分限は、違法である（最判昭48.9.14）。純然たる自由裁量ではない。\n\n${table}`;
  }
  if (text.includes('生活保護') && text.includes('廃止') && text.includes('厚生労働大臣')) {
    return `この文は誤り。生活保護の個別の廃止や却下は、実施機関がする。厚生労働大臣の広い裁量は、保護基準の設定である。\n\n${table}`;
  }
  return null;
}

const GYOSEI_KOUI_BUNRUI_TABLE = `
| | 性質 | 効果 | 裁量 |
|---|---|---|---|
| 下命 | 命令的 | 作為を命じる | — |
| 禁止 | 命令的 | 不作為を命じる | — |
| 許可 | 命令的 | 一般的禁止を解く | 狭い |
| 免除 | 命令的 | 下命を解く | — |
| 特許 | 形成的 | 新しい権利を設定する | 広い |
| 認可 | 形成的 | 私人の行為を補充する | 狭い |
| 確認 | 準法律行為的 | 存否を確定する | ない |`.trim();

/** 行政行為の分類。許可・特許・認可・確認・下命。 */
export function gyoseiKouiBunruiNote(choiceText: string): string | null {
  const text = (choiceText || '').replace(/\s+/g, '');
  if (text.includes('認可') && text.includes('形成的') && text.includes('特許') && text.includes('裁量')) {
    return `この文は誤り。認可は形成的行為だが、裁量は狭い。私人の法律行為を補充して完成させる。適法ならすべきである。裁量が広いのは特許である。\n\n${GYOSEI_KOUI_BUNRUI_TABLE}`;
  }
  if (text.includes('許可は形成的行為') && text.includes('裁量は広い')) {
    return `この文は誤り。許可は命令的行為である。一般的禁止を解いて自由を戻す。裁量は狭い。形成的で裁量が広いのは特許である。\n\n${GYOSEI_KOUI_BUNRUI_TABLE}`;
  }
  if (text.includes('特許は命令的行為') && text.includes('裁量は狭い')) {
    return `この文は誤り。特許は形成的行為である。新しい権利か法的地位を設定する。裁量は広い。命令的で裁量が狭いのは許可である。\n\n${GYOSEI_KOUI_BUNRUI_TABLE}`;
  }
  if (text.includes('許可は命令的') && text.includes('特許は形成的') && text.includes('裁量は広い')) {
    return `この文は正しい。許可は命令的で裁量は狭い。特許は形成的で裁量は広い。認可は形成的でも裁量は狭い。\n\n${GYOSEI_KOUI_BUNRUI_TABLE}`;
  }
  if (text.includes('特許') && text.includes('新たな法律上の地位') && text.includes('裁量')) {
    return 'この文は正しい。特許は、特定の人に新しい権利か法的地位を設定する形成的行為である。裁量が出やすい。許可は自由の回復で、新しい権利の設定ではない。名前が許可でも中身が特許や認可のことがある。';
  }
  if (text.includes('許可') && text.includes('自由回復')) {
    return 'この文は誤り。許可は、一般的禁止を解いて自由を戻す。新しい権利の創設ではない。運転免許は伝統的に許可で、裁量は狭い。農地の権利移動は、名前が許可でも中身は認可。事業の許認可は、許可という名でも裁量が広く論じられることがある。';
  }
  if (text.includes('確認') && text.includes('政策裁量')) {
    return 'この文は誤り。確認は、既存の事実や法律関係の存否を公に確定する。新しい権利の設定でも、広い政策裁量でもない。建築確認も分類上は確認である。処分性はある。裁量は原則ない。';
  }
  if (text.includes('認可') && text.includes('事実通知')) {
    return 'この文は誤り。認可は、私人の法律行為を補充して効力を完成させる。適法ならすべきで、裁量は狭い。事実を知らせるだけなのは通知。名前が許可でも、農地の権利移動は認可である。';
  }
  if (text.includes('下命') && text.includes('補充')) {
    return 'この文は誤り。私人の法律行為を補充して完成させるのは認可。下命は、作為義務を命じる命令的行為である。例は、違法建築物の除却を命じること。';
  }
  return null;
}

/** 行政法総論の問29以降。無効、契約、代執行、執行罰、調査。 */
export function gyoseiFrom29Note(choiceText: string, stem?: string): string | null {
  const text = (choiceText || '').replace(/\s+/g, '');
  const head = (stem || '').replace(/\s+/g, '');
  const bare = text.replace(/^[・●◦]+/, '');
  if (head.includes('実力強制調査') && (bare === '１つ' || bare === '1つ')) {
    return 'この数ではない。三つの整理はどれも当たる。正解は3つ。';
  }
  if (head.includes('実力強制調査') && (bare === '２つ' || bare === '2つ')) {
    return 'この数ではない。三つの整理はどれも当たる。正解は3つ。';
  }
  if (head.includes('実力強制調査') && (bare === '３つ' || bare === '3つ')) {
    return 'この数が正しい。実力強制と間接強制は法律の根拠が要る。任意調査の根拠は要らない。令状が要るのは臨検、捜索、差押え。質問と検査は令状がなく、権限の範囲を超えない個別の判断が要る。一斉検問は任意調査。';
  }
  if (text.includes('実質的当事者訴訟や民事訴訟において主張することは許されない')) {
    return 'この文は誤り。処分が無効なら、当事者訴訟や民事訴訟でその無効を前提に主張できる。無効確認の訴えは、現在の法律関係の訴えでは目的を達することができないときに限る（行政事件訴訟法36条）。';
  }
  if (text.includes('たとえ出訴期間内であっても') && text.includes('取消訴訟は不適法')) {
    return 'この文は誤り。無効な処分でも、出訴期間内なら取消訴訟を提起できる。無効だから取り消せない、ではない。';
  }
  if (text.includes('直ちに無効確認訴訟を提起することが許される')) {
    return 'この文は正しい。審査請求を経なければ取消訴訟を提起できない、という個別法の定めは、取消訴訟の話である。無効確認の訴えにはその前置は準用されない（行政事件訴訟法38条1項の準用列挙に8条がない）。';
  }
  if (text.includes('何人でも') && text.includes('無効確認訴訟')) {
    return 'この文は誤り。無効確認の訴えは、法律上の利益を有する者で、現在の法律関係の訴えでは目的を達することができない者に限る（行政事件訴訟法36条）。何人でもではない。';
  }
  if (text.includes('執行停止制度の準用はなされていない')) {
    return 'この文は誤り。無効確認の訴えには、取消訴訟の執行停止が準用される（行政事件訴訟法38条3項、25条）。';
  }
  if (text.includes('法律上の利益を有する者ではなく') && text.includes('不服がある者')) {
    return 'この文は正しい。審査請求をすることができるのは、行政庁の処分に不服がある者である（行政不服審査法2条）。取消訴訟の原告適格のような「法律上の利益を有する者」という文言ではない。';
  }
  if (text.includes('地位確認の訴えと無効の確認の訴え')) {
    return 'この文は正しい。実質的当事者訴訟は、公法上の法律関係そのものを争う訴えである（行政事件訴訟法4条）。公務員の地位確認と、法律関係の無効の確認がそれにあたる。処分の無効等確認の訴え（36条）は抗告訴訟で、ここには入らない。';
  }
  if (text.includes('無効の確認と所有権の確認')) {
    return 'この文は正しい。所有権の確認は民事訴訟でできる。処分が無効なら、その無効を前提にして民事訴訟で争える。取り消しうるだけの処分の効力を、民事訴訟で否定することはできない。';
  }
  if (text.includes('無効') && text.includes('取消訴訟を提起することはできない') && text.includes('成立当初から')) {
    return 'この文は誤り。処分が無効でも、出訴期間内なら取消訴訟を提起できる。期間を過ぎたあとは、無効確認などによる。同じ結論の肢が、別の言い方でも出る。';
  }
  if (text.includes('審査請求期間にかかわらず') && text.includes('審査請求をすることができる')) {
    return 'この文は誤り。処分が無効でも、審査請求の期間が原則としてかかる。期間を過ぎたあと、いつでも審査請求できるわけではない。';
  }
  if (text.includes('出訴期間内に行わなければならない') && text.includes('職権取消し')) {
    return 'この文は誤り。職権取消しは、取消訴訟の出訴期間に縛られない。相手方の信頼と、取り消す公益を衡量する。';
  }
  if (text.includes('有効確認の訴えを提起しなければならない')) {
    return 'この文は誤り。職権取消し自体が処分なら、争うのはその職権取消しの取消訴訟である。元の処分の有効確認をしなければならない、ではない。';
  }
  if (text.includes('国家賠償') && text.includes('必要はない') && text.includes('無効確認')) {
    return 'この文は正しい。処分の違法を理由に国家賠償を請求するのに、あらかじめ取消しまたは無効確認の確定判決は要らない。';
  }
  if (text.includes('行政契約につき定義規定')) {
    return 'この文は誤り。行政手続法は、行政契約の定義も、契約締結の手続も置いていない。';
  }
  if (text.includes('専ら民法が適用される') && text.includes('特別な手続は規定されていない')) {
    return 'この文は誤り。地方公共団体の契約には、地方自治法の締結手続がある。民法だけではない。';
  }
  if (text.includes('正当の理由') && text.includes('給水契約を拒む')) {
    return 'この文は正しい。水道事業者は、正当の理由がなければ給水契約の申込みを拒めない（水道法15条1項）。適正かつ合理的な供給計画では対応できない申込みは、正当の理由にあたる。';
  }
  if (text.includes('不可変更力') && text.includes('出訴期間')) {
    return 'この文は誤り。出訴期間を過ぎると相手方から原則として争えなくなるのは、不可争力である。不可変更力は、争訟の判断が確定したあと、行政庁が自らその判断を変更しにくい効力である。争えない主体が違う。';
  }
  if (text.includes('授益的行政行為') && text.includes('常に職権で撤回できない')) {
    return 'この文は誤り。授益的行政行為の撤回は、相手方の信頼保護との衡量で制限される。常にできないわけではない。撤回の明文がなくても、不利益を考慮したうえで公益上の必要が高ければ撤回できる（最判昭63.6.17）。撤回は、当初から適法だった行為を、後の事情で将来に向かって失わせる。職権取消しは、当初の違法を理由にする。';
  }
  if (text.includes('公害防止協定') && text.includes('法的拘束力を有しない')) {
    return 'この文は誤り。公害防止協定は、法律の根拠がないから当然に無効、ではない。合意として当事者を拘束し得る。';
  }
  if (text.includes('随意契約') && text.includes('私法上有効')) {
    return 'この文は正しい。随意契約によることができない契約を随意契約で結んでも、法令の趣旨を没却する特別の事情がなければ、私法上は有効である。';
  }
  if (text.includes('行政指導は法律上の根拠を有するものでなければならない')) {
    return 'この文は誤り。行政指導は、相手方の任意の協力を求めるものであって、法律の個別の根拠が必ず要るわけではない（行政手続法2条6号、32条）。';
  }
  if (text.includes('国税滞納処分の例によりこれを徴収')) {
    return 'この文は正しい。代執行の費用は、義務者に納付を命じ、納付されないときは国税滞納処分の例により徴収できる（行政代執行法5条、6条）。';
  }
  if (text.includes('審査請求を行うことができる旨の規定は') && text.includes('置かれていない')) {
    return 'この文は正しい。戒告と通知は原則として必要である。行政代執行法自体は、その戒告と通知について審査請求ができる旨を特に置いていない。';
  }
  if (text.includes('民事執行の例により相当な手段')) {
    return 'この文は誤り。行政代執行法1条は、別に法律で定めるものを除き、義務の履行確保を代執行による、とする。執行罰や直接強制を一般に認める規定はない。';
  }
  if (text.includes('戒告においては') && text.includes('通知においては')) {
    return 'この文は誤り。戒告で示すのは、履行期限と、その期限までに履行しないときは代執行をする旨である（行政代執行法3条1項）。通知で示すのは、代執行の時期、執行責任者、費用の概算である（3条2項）。代執行そのものの要件は2条。この肢は中身が逆である。';
  }
  if (text.includes('督促状を発した日')) {
    return 'この文は誤り。代執行の着手は督促状ではない。原則は、戒告で相当の履行期限と代執行をする旨を示し、期限を過ぎても履行がなければ、代執行令書で時期、執行責任者、費用の概算を通知する（行政代執行法3条）。期限は法定期間ではなく、戒告が定める。督促は、実施後の費用を国税滞納処分の例で取るときの入口である（5条、6条）。';
  }
  if (text.includes('適用除外項目にない')) {
    return 'この文は誤り。戒告は、行政手続法2条4号イの、事実上の行為をするに当たりその範囲、時期等を明らかにするために法令上必要とされている手続としての処分である。不利益処分から除かれる。代執行そのものは、同じイの事実上の行為である。3条1項の号の一覧に戒告という項目はないが、聴聞がかからない理由は2条4号イの方である。項ではなく号。';
  }
  if (text.includes('罰金を科すことにより') && text.includes('執行罰')) {
    return 'この文は誤り。執行罰は罰金ではない。過料である。将来の履行を確保する強制執行の一つで、過去の違反への刑罰ではない。';
  }
  if (text.includes('非訟事件手続法の定める手続') && text.includes('執行罰')) {
    return 'この文は誤り。裁判所が非訟事件手続法で科すのは、国の法律違反に対する秩序罰の過料である。執行罰は行政庁が科す。条例・規則の過料は、地方公共団体の長が科す（地方自治法149条3号）。科料は刑罰で、前科が付く。過料は秩序罰で、前科は付かない。';
  }
  if (text.includes('複数回にわたり科すことも認められる')) {
    return 'この文は正しい。執行罰は刑罰ではないので、憲法39条の二重処罰の禁止はそのまま及ばない。同じ義務の不履行について、履行まで重ねて科すことができる。';
  }
  if (text.includes('条例で定めることも明文で許容')) {
    return 'この文は誤り。執行罰を認める一般法はない。個別の法律の定めが要る。行政代執行法は、条例で執行罰を定めることを明文で許していない。';
  }
  if (text.includes('軽微な手続上の義務')) {
    return 'この文は誤り。届出義務などの軽い手続違反に科す過料は、秩序罰である。執行罰ではない。国の法律違反の過料は裁判所が非訟で科し、条例・規則の過料は長が科す（地方自治法149条3号）。科料は刑罰、過料は秩序罰。';
  }
  if (text.includes('砂防法36条') || text.includes('砂防法３６条')) {
    return 'この文は正しい。現行法で執行罰を定めるのは、砂防法36条だけである。';
  }
  if (text.includes('即時強制とは')) {
    return 'この文は誤り。即時強制は、事前の義務の不履行を前提にしない。義務を履行させる手段ではない。目前の危害を防ぐため、法律の根拠に基づいて身体または財産に実力を加える。';
  }
  if (text.includes('直接強制') && text.includes('行政代執行法に規定')) {
    return 'この文は誤り。直接強制の手続は、行政代執行法にない。代執行は代替的作為義務に限る。';
  }
  if (text.includes('条例は含まれない')) {
    return 'この文は誤り。行政代執行法2条の「法律」には、法律の委任に基づく命令、規則および条例が含まれる。条例に基づく代替的作為義務も、同法で代執行できる。';
  }
  if (text.includes('条例に基づく過料') && text.includes('非訟事件手続法')) {
    return 'この文は誤り。条例の過料を裁判所が非訟で科す、ではない。科すのは地方公共団体の長である（地方自治法149条3号）。裁判所が非訟で科すのは、国の法律違反の過料。科料は刑罰で前科が付く。過料は秩序罰で前科は付かない。執行罰の過料は強制執行で、秩序罰ではない。条例は14条3項で5万円以下の過料も置ける。規則が置ける罰則は過料だけで、5万円以下（15条2項）。長が科す過料は行政処分なので、審査請求と取消訴訟ができる。';
  }
  if (text.includes('秩序罰である過料') && text.includes('規則によらなければならない')) {
    return 'この文は誤り。過料は規則だけ、ではない。条例でも過料を置ける（地方自治法14条3項。5万円以下）。規則が置ける罰則は過料だけで、5万円以下（15条2項）。科すのは長（149条3号）。国の法律違反の過料は、裁判所が非訟事件手続法で科す。科料は刑罰、過料は秩序罰。';
  }
  if (text.includes('非訟事件手続法') && text.includes('秩序罰') && text.includes('国の法律違反')) {
    return 'この文は正しい。国の法律違反の秩序罰は、刑罰ではない。過料を、非訟事件手続法により裁判所が科す。問題文にない試験の芯は、次である。条例・規則の過料は長が科す（地方自治法149条3号）。科料は刑罰で前科が付く。過料は秩序罰で前科は付かない。執行罰の過料は強制執行で、ここではない。条例は14条3項で5万円以下の過料も置ける。規則の罰則は過料だけで、5万円以下（15条2項）。長が科す過料は行政処分なので、審査請求と取消訴訟ができる。裁判所の過料は、そのルートではない。';
  }
  if (text.includes('反則金') && text.includes('取消訴訟')) {
    return 'この文は誤り。交通反則通告には処分性がない（最判昭57.7.15）。通告の取消訴訟は選べない。争うなら刑事手続である。';
  }
  if (text.includes('第三者に義務者のなすべき行為を行わせる')) {
    return 'この文は正しい。代執行は、行政庁が自ら行うほか、第三者に義務者のなすべき行為をさせることもできる（行政代執行法2条）。';
  }
  if (text.includes('法律上の争訟に該当しない') && text.includes('行政上の義務履行を求める')) {
    return 'この文は誤り。法律上の争訟に当たらない理由は、法令の適用で終局的に解決できないから、ではない。専ら行政権の主体として国民に義務の履行を求める訴えは、自分の権利を守る目的ではなく、法規の適正な適用と一般公益の保護が目的だからである。法律に特別の規定がなければ不適法である（最判平14.7.9）。財産権の主体として自分の権利を守る訴えは、民事訴訟になる。';
  }
  if (text.includes('特別の規定が法律にあれば') && text.includes('適法となりうる')) {
    return 'この文は正しい。行政権の主体として国民に行政上の義務の履行を求める訴えは、法律にその訴えを認める特別の規定があれば、適法になり得る（最判平14.7.9）。';
  }
  if (text.includes('財産権の主体として') && text.includes('法律上の争訟に該当しない')) {
    return 'この文は誤り。財産権の主体として義務の履行を求める訴えは、通常の民事訴訟であり、法律上の争訟にあたる。';
  }
  if (text.includes('代執行が認められる場合に限り')) {
    return 'この文は誤り。不適法になるのは、代執行ができる場合に限らない。法律の特別の規定がなければ、代執行の有無で適法にはならない。';
  }
  if (text.includes('特別の規定があるため') && text.includes('提起することが許されている')) {
    return 'この文は誤り。財産権の主体としての訴えは、特別の規定がなくても、法律上の争訟として提起できる。';
  }
  if (text.includes('所持品検査を行うことができると規定')) {
    return 'この文は誤り。警察官職務執行法2条は職務質問を定める。所持品検査の明文はない。判例は、職務質問に付随し、任意で、必要性と相当性があるときに限り許す。';
  }
  if (text.includes('外観上不審な車両に限って')) {
    return 'この文は誤り。交通取締りの自動車検問は、外観上不審な車両だけに限らない。一定の場所で短時間の停止を求めることも、任意の協力を求める限度で許される（最判昭55.9.22）。';
  }
  if (text.includes('調査の日時') && text.includes('事前に通知しなければならない')) {
    return 'この文は誤り。行政手続法は、行政調査一般について、日時、場所、目的の事前通知を義務付けていない。個別の法律の定めによる。';
  }
  if (text.includes('犯則事件の証拠として利用することは認められない')) {
    return 'この文は誤り。国税通則法は、質問検査権を犯罪捜査のために認められたものと解してはならない、と定める。その調査で得た資料を、その後の犯則事件の証拠に用いることまで、一律に禁じてはいない。';
  }
  if (text.includes('刑罰を科すことにつき法律に明文の根拠')) {
    return 'この文は正しい。調査に応じない者へ刑罰を科すには、調査権限の根拠とは別に、刑罰の法律の明文が要る。政令や省令の罰則に法律の委任が要るのと同じ留保である。';
  }
  return null;
}

/** 違法な行政行為を、別の行政行為として扱うことを当然に許されないとする肢。 */
export function illegalActConversionNote(choiceText: string): string | null {
  const text = (choiceText || '').replace(/\s+/g, '');
  if (!text.includes('新たな行政行為') || !text.includes('当然に許されない')) return null;
  return 'この文は誤り。違法な行政行為を、要件を満たす別の行政行為として扱うことを、違法行為の転換という。当然には許されない、ではない。最判令3.3.2は、補助金の財産処分の承認について、別の根拠の承認と目的が共通で、相手に不利益にならず、瑕疵を知っていても別の承認をしなかったとはいえない事情の下で、別の承認として適法に扱った。群馬中央バス事件でも、違法性の承継でもない。';
}

/** 違法性の承継を、一連の手続で同一の効果を目指すときに認める肢。 */
export function illegalitySuccessionNote(choiceText: string): string | null {
  const text = (choiceText || '').replace(/\s+/g, '');
  if (!text.includes('違法性の承継') || !text.includes('一連') || !text.includes('同一')) return null;
  return 'この文は正しい。原則、先行処分の違法は、後行処分の取消訴訟で主張できない。例外は、連続した一連の手続で、同一の法律効果を目指すとき。安全認定の違法を建築確認の取消訴訟で主張できるのが、その例である（最判平21.12.17）。代執行の戒告で、先行の除却命令の違法を言うのは、義務を課すことと義務を強制することで目的が違い、原則できない。「承継は許されることはない」と絶対に書くと誤り。群馬中央バス事件（最判昭50.5.29）は、路線免許の聴聞と公聴会の話で、承継ではない。';
}

/** 個人タクシー免許の具体的審査基準の肢。第三セクターではない。 */
export function personalTaxiStandardNote(choiceText: string): string | null {
  const text = (choiceText || '').replace(/\s+/g, '');
  if (!text.includes('個人タクシー') || !text.includes('具体的審査基準')) return null;
  return '第三セクター法人ではない。一人一車制の個人タクシー事業の免許を申請した個人の話である（最判昭46.10.28）。多数の申請から少数を選ぶときは、具体的審査基準を設定し、公正かつ合理的に適用する。これに反する審査手続で却下すると、その却下は違法となる。言い分を聞く話の最判昭37.11.28や、路線バスの群馬中央バス事件（最判昭50.5.29）とは別である。';
}

/** 量定加重の処分基準に反する後行処分を当然無効とする肢。 */
export function laterDispositionVoidNote(choiceText: string): string | null {
  const text = (choiceText || '').replace(/\s+/g, '');
  if (!text.includes('処分基準') || !text.includes('量定') || !text.includes('当然に無効')) return null;
  return '最判平27.3.3は、公にされた処分基準で先行処分を理由に後行の量定を加重する定めがあるとき、基準と異なる後行の取扱いは、特段の事情がない限り裁量権の逸脱または濫用に当たる、とした。当然に無効、ではない。取消しうる違法である。同じ判決は、加重される期間内は先行処分の取消しの利益が残る、ともいう。';
}

/** 肢の記述が法上○なら 'o'。組合せ問題は、その肢が試験の正解なら 'o'。解答未設定は null。 */
export function expectedChoiceMark(
  stem: string,
  answer: number[],
  choiceIndex: number,
  combinationPrompt: boolean,
  choiceText?: string,
): 'o' | 'x' | null {
  if (choiceText && agencyHeadOrderIsOverbroad(choiceText)) return 'x';
  if (choiceText && ministryDepartmentIsMandatory(choiceText)) return 'x';
  if (choiceText && cabinetOrgAllInNaikakufu(choiceText)) return 'x';
  if (!Array.isArray(answer) || answer.length === 0) return null;
  const inAnswer = answer.includes(choiceIndex);
  if (combinationPrompt) return inAnswer ? 'o' : 'x';
  const compact = (stem || '').replace(/\s+/g, '');
  const seekWrong =
    /誤っているもの/.test(compact) ||
    /誤っているはどれ/.test(compact) ||
    /誤りはどれ/.test(compact) ||
    /誤りであるもの/.test(compact) ||
    /妥当でないもの/.test(compact) ||
    /正しくないもの/.test(compact) ||
    /不適当なもの/.test(compact) ||
    /適当でないもの/.test(compact) ||
    /適合しないもの/.test(compact) ||
    /含まれていないもの/.test(compact);
  const legallyTrue = seekWrong ? !inAnswer : inAnswer;
  return legallyTrue ? 'o' : 'x';
}

export function formatChoiceOxRate(stats: ChoiceOxStats | undefined): string {
  const correct = stats?.correct ?? 0;
  const wrong = stats?.wrong ?? 0;
  const total = correct + wrong;
  if (total <= 0) return '正答率 —';
  return `正答率 ${correct}/${total}`;
}

export async function loadChoiceOxStats(
  subject: string,
  field: string,
  questionText: string,
  choiceTexts: string[],
): Promise<Record<string, ChoiceOxStats>> {
  const hashes = choiceTexts.map((text) => choiceNeverAgainHash(text)).filter(Boolean);
  const unique = [...new Set(hashes)];
  if (unique.length === 0) return {};
  const keys = unique.map((hash) => `${PREFIX}${subject}|${field}|${getQuestionTextHash(questionText)}|${hash}`);
  const pairs = await AsyncStorage.multiGet(keys);
  const out: Record<string, ChoiceOxStats> = {};
  pairs.forEach(([key, raw], index) => {
    const hash = unique[index];
    if (!hash) return;
    out[hash] = parseStats(raw);
    void key;
  });
  return out;
}

export async function recordChoiceOx(
  subject: string,
  field: string,
  questionText: string,
  choiceText: string,
  hit: boolean,
): Promise<ChoiceOxStats> {
  const key = storageKey(subject, field, questionText, choiceText);
  const current = parseStats(await AsyncStorage.getItem(key));
  const next: ChoiceOxStats = hit
    ? { correct: current.correct + 1, wrong: current.wrong }
    : { correct: current.correct, wrong: current.wrong + 1 };
  await AsyncStorage.setItem(key, JSON.stringify(next));
  return next;
}
