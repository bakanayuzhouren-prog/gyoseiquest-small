/**
 * 質問モード論点ガイドのトリガー照合チェック（基礎法学・行政法総論）。
 * 用法: node --experimental-strip-types scripts/checkChatTopicBriefs.mjs
 */
import { KISO_HOUGAKU_CHAT_TOPIC_BRIEFS } from '../utils/chatTopicBriefsKisoHougaku.ts';
import { KISO_HOUGAKU_COMPARISON_BRIEFS } from '../utils/chatTopicBriefsKisoComparisons.ts';
import { KISO_HOUGAKU_MOSHI_BRIEFS } from '../utils/chatTopicBriefsKisoMoshi.ts';
import { GYOSEI_SORON_CHAT_BRIEFS } from '../utils/chatTopicBriefsGyoseiSoron.ts';
import { GYOSEI_SORON_NET_CHAT_BRIEFS } from '../utils/chatTopicBriefsGyoseiSoronNet.ts';
import { GYOSEI_TETSUZUKI_CHAT_BRIEFS } from '../utils/chatTopicBriefsGyoseiTetsuzuki.ts';
import { GYOSEI_FUFUKU_CHAT_BRIEFS } from '../utils/chatTopicBriefsGyoseiFufuku.ts';
import { GYOSEI_PROC_COMPARISON_BRIEFS } from '../utils/chatTopicBriefsGyoseiComparisons.ts';
import { GYOSEI_GYOSHO_CHAT_BRIEFS } from '../utils/chatTopicBriefsGyoseiGyosho.ts';
import { KENPOU_CHAT_BRIEFS } from '../utils/chatTopicBriefsKenpou.ts';
import { KENPOU_HANREI_CHAT_BRIEFS } from '../utils/chatTopicBriefsKenpouHanrei.ts';
import { KENPOU_HANREI2_CHAT_BRIEFS } from '../utils/chatTopicBriefsKenpouHanrei2.ts';
import { KENPOU_DEEP_CHAT_BRIEFS } from '../utils/chatTopicBriefsKenpouDeep.ts';
import { KOKUBAI_CHAT_BRIEFS } from '../utils/chatTopicBriefsKokubai.ts';

function norm(s) {
  return (s || '').normalize('NFKC').toLowerCase().replace(/\s+/g, ' ').trim();
}

function stripNoise(s) {
  let t = norm(s)
    .replace(/[?？!！。．、,，･・…]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const tail =
    /(ってなに|って何|ってなん|って誰|ってだれ|とは何|とはなに|とはなん|ってどういう意味|どういう意味|について教えて|を教えて|を説明して|について|とは|って|教えてくれ|教えて|説明して|の違い|違い)$/;
  for (let i = 0; i < 4; i++) {
    const next = t.replace(tail, '').trim();
    if (next === t) break;
    t = next;
  }
  return t;
}

function matchBriefs(query, briefs) {
  const raw = norm(query);
  const core = stripNoise(query);
  const blob = `${raw}\n${core}`;
  return briefs.filter((b) => b.triggers.some((t) => blob.includes(norm(t))));
}

const cases = [
  { q: '実定法と実体法の違いは？', expectTitle: /実定法と実体法/ },
  { q: '法の支配と法治主義の違い', expectTitle: /法の支配と法治主義/ },
  { q: '公布と施行ってなん？', expectTitle: /公布と施行/ },
  { q: '後法優先と特別法優先', expectTitle: /後法優先と特別法優先/ },
  { q: '失効と廃止の違い', expectTitle: /失効と廃止/ },
  { q: '続審と事後審', expectTitle: /続審と事後審/ },
  { q: '控訴と抗告の違いは', expectTitle: /控訴と抗告/ },
  { q: '調停と仲裁', expectTitle: /調停と仲裁/ },
  { q: '少額訴訟と認定司法書士', expectTitle: /少額訴訟.*認定司法書士|認定司法書士/ },
  { q: '法律と法令の違い', expectTitle: /法・法律・法令|法律と法令/ },
  { q: '要件事実と立法事実', expectTitle: /要件事実と立法事実/ },
  { q: '強行法規と任意法規', expectTitle: /強行法規と任意法規/ },
  { q: '行為規範と裁判規範', expectTitle: /行為規範/ },
  { q: '成文法と不文法', expectTitle: /成文法と不文法/ },
  { q: '判決と決定の違い', expectTitle: /判決と決定/ },
  { q: '一般法と特別法', expectTitle: /一般法と特別法/ },
  { q: '公法と私法', expectTitle: /公法.*私法/ },
  { q: '実体法と手続法', expectTitle: /実体法と手続法/ },
  { q: '大陸法と英米法', expectTitle: /大陸法と英米法/ },
  // 模試由来・基礎法学
  { q: '拘禁刑ってなん？', expectTitle: /拘禁刑/ },
  { q: '応報刑論と目的刑論の違い', expectTitle: /応報刑論と目的刑論/ },
  { q: '検察審査会は何人', expectTitle: /検察審査会/ },
  { q: '裁判員裁判の人数', expectTitle: /裁判員/ },
  { q: '検察審査会と裁判員', expectTitle: /検察審査会11人|11人と9人/ },
  { q: '拡張解釈と類推解釈の違い', expectTitle: /拡張解釈と類推解釈/ },
  { q: '反対解釈とは', expectTitle: /法解釈の4類型|反対解釈/ },
  { q: 'オランダ法学', expectTitle: /明治期の法制史|オランダ/ },
  { q: '処分権主義と弁論主義', expectTitle: /処分権|民訴/ },
  { q: '国外犯に刑法は及ぶ？', expectTitle: /刑法の場所的適用|国外/ },
  { q: '仲裁とあっせんの違い', expectTitle: /仲裁|あっせん|ADR/ },
  { q: 'くじで選任されるのってだれ？', expectTitle: /くじ/ },
  { q: 'くじ引きってなに', expectTitle: /くじ|選任方法/ },
  { q: '検察審査員は誰', expectTitle: /検察審査員/ },
  { q: '裁判員は誰がなる', expectTitle: /裁判員は誰/ },
  { q: 'くじで選ばれないのは', expectTitle: /くじ/ },
  { q: '無作為に選ばれる市民', expectTitle: /くじ/ },
  // 行政法総論・判例クラスタ
  { q: '薬局の距離適正規定って何だったかな', expectTitle: /薬局距離/ },
  { q: '薬局距離制限', expectTitle: /薬局距離|距離規制/ },
  { q: '小売市場の距離制限', expectTitle: /小売市場/ },
  { q: '病院の距離規制', expectTitle: /距離規制|病院開設/ },
  { q: '病院開設中止勧告', expectTitle: /病院開設/ },
  { q: '公衆浴場の距離と原告適格', expectTitle: /公衆浴場|原告適格/ },
  { q: '取消しと撤回の違い', expectTitle: /取消し・撤回|撤回/ },
  { q: '代執行ってなん？', expectTitle: /代執行/ },
  { q: '猿払と堀越の違い', expectTitle: /猿払|堀越/ },
  { q: '公定力と不可争力', expectTitle: /公定力/ },
  { q: '代執行と即時強制', expectTitle: /強制執行|即時強制|代執行/ },
  { q: '行政罰と秩序罰', expectTitle: /行政罰|秩序罰/ },
  { q: '神戸高専剣道', expectTitle: /神戸高専/ },
  { q: '宜野座村事件', expectTitle: /宜野座/ },
  // 行政法総論・X/ネット口語FAQ
  { q: '行政法ってどの法律？', expectTitle: /行政法ってどの法律/ },
  { q: '法律の留保ってなに', expectTitle: /法律による行政の原理|法律の留保/ },
  { q: '侵害留保説と全部留保説', expectTitle: /侵害留保/ },
  { q: '許可と認可と特許の違い', expectTitle: /許可・認可・特許/ },
  { q: '処分性ってなに', expectTitle: /処分性ってなに|処分性の見方/ },
  { q: '原告適格わからん', expectTitle: /原告適格/ },
  { q: '反射的利益ってなに', expectTitle: /反射的利益|原告適格/ },
  { q: '建築確認は処分？', expectTitle: /建築確認/ },
  { q: '条例に処分性あるの', expectTitle: /条例でも処分性|保育所/ },
  { q: '用途地域と区画整理', expectTitle: /用途地域/ },
  { q: '国家賠償と損失補償の違い', expectTitle: /国家賠償と損失補償/ },
  { q: '不可変更力ってなに', expectTitle: /不可変更力/ },
  { q: '取消訴訟何から考える', expectTitle: /訴訟要件|順番/ },
  // 行政手続法
  { q: '申請と届出の違いは？', expectTitle: /申請と届出/ },
  { q: '審査基準と処分基準', expectTitle: /審査基準と処分基準/ },
  { q: '聴聞と弁明の違い', expectTitle: /聴聞と弁明/ },
  { q: '標準処理期間ってなに', expectTitle: /標準処理期間/ },
  { q: '意見公募の対象は', expectTitle: /意見公募/ },
  { q: '行政指導の中止等の求め', expectTitle: /行政指導/ },
  { q: '理由の提示はいつ', expectTitle: /理由の提示/ },
  { q: '申請拒否と不利益処分', expectTitle: /申請拒否.*不利益|不利益処分/ },
  // 行政不服審査法
  { q: '再調査と審査請求の違い', expectTitle: /再調査/ },
  { q: '執行停止の要件', expectTitle: /執行停止/ },
  { q: '審理員ってなに', expectTitle: /審理員/ },
  { q: '不作為の審査請求', expectTitle: /不作為/ },
  { q: '教示ってなに', expectTitle: /教示/ },
  { q: '行手法と行服法の違い', expectTitle: /行政手続法と行政不服審査法/ },
  { q: '審査請求の期間は', expectTitle: /審査請求の期間/ },
  { q: '不利益変更はできる？', expectTitle: /裁決|不利益変更/ },
  // 比較学習（違いをまとめて）
  { q: '審理員と主宰者の違いをまとめて', expectTitle: /審理員.*主宰者|主宰者.*審理員/ },
  { q: '努力義務を行手法と行服法で並べて', expectTitle: /努力義務の並列/ },
  { q: '執行停止の違いをまとめて', expectTitle: /執行停止.*行政不服審査法|執行停止（/ },
  { q: '違いをまとめて', expectTitle: /違いをまとめて|メニュー/ },
  // 行政事件訴訟法
  { q: '取消訴訟何から考える', expectTitle: /取消訴訟の訴訟要件|訴訟要件（順番）/ },
  { q: '出訴期間はいつまで', expectTitle: /出訴期間/ },
  { q: '義務付けと差止めの違い', expectTitle: /義務付け.*差止め|差止めの訴え/ },
  { q: '無効確認の補充性', expectTitle: /無効/ },
  { q: '事情判決ってなに', expectTitle: /事情判決/ },
  { q: '行服法と行訴法の違いをまとめて', expectTitle: /行政不服審査法と行政事件訴訟法/ },
  { q: '訴えの利益が消滅', expectTitle: /訴えの利益/ },
  { q: '仮の差止め', expectTitle: /差止め/ },
  // 憲法
  { q: '二重の基準ってなに', expectTitle: /二重の基準/ },
  { q: '私人間効力ってなに', expectTitle: /私人間効力/ },
  { q: '政教分離の判断枠組み', expectTitle: /政教分離/ },
  { q: '検閲とは', expectTitle: /検閲/ },
  { q: 'マクリーン判決', expectTitle: /マクリーン|外国人/ },
  { q: 'GPS捜査は令状', expectTitle: /GPS/ },
  { q: '職業選択の自由と薬局距離', expectTitle: /職業選択|薬局/ },
  { q: '朝日訴訟と堀木訴訟', expectTitle: /生存権|朝日|堀木/ },
  { q: '司法権の限界', expectTitle: /司法権の限界/ },
  // 憲法・薄い判例パック
  { q: '昭和女子大事件', expectTitle: /昭和女子大/ },
  { q: '日産自動車事件', expectTitle: /日産自動車/ },
  { q: '泉佐野市民会館', expectTitle: /泉佐野/ },
  { q: '自衛官合祀', expectTitle: /合祀/ },
  { q: '全農林警職法', expectTitle: /全農林/ },
  { q: '都教組と二重のしぼり', expectTitle: /都教組|二重のしぼり/ },
  { q: '東京中郵と名古屋中郵', expectTitle: /名古屋中郵|東京中郵|争議権判例の流れ/ },
  { q: '一票の較差と事情判決', expectTitle: /投票価値|定数不均衡/ },
  { q: '酒類販売免許制', expectTitle: /酒類販売/ },
  { q: '早稲田大学名簿', expectTitle: /早稲田/ },
  { q: '在外邦人選挙権', expectTitle: /在外邦人選挙/ },
  // 憲法・判例第2波
  { q: '北方ジャーナル事件', expectTitle: /北方ジャーナル/ },
  { q: 'よど号記事抹消', expectTitle: /よど号/ },
  { q: '税関検査は検閲', expectTitle: /税関検査|検閲/ },
  { q: '博多駅事件', expectTitle: /博多駅/ },
  { q: 'レペタ事件', expectTitle: /レペタ/ },
  { q: '尊属殺重罰規定', expectTitle: /尊属殺/ },
  { q: '京都府学連', expectTitle: /京都府学連|肖像/ },
  { q: '前科照会事件', expectTitle: /前科照会/ },
  { q: '謝罪広告は憲法違反', expectTitle: /謝罪広告/ },
  { q: '津地鎮祭と愛媛玉串料', expectTitle: /津地鎮祭|愛媛/ },
  { q: '森林法共有林', expectTitle: /森林法/ },
  { q: '旭川学テ事件', expectTitle: /旭川学テ/ },
  { q: '苫米地事件', expectTitle: /苫米地/ },
  { q: '警察予備隊訴訟', expectTitle: /警察予備隊/ },
  { q: '百里基地訴訟', expectTitle: /百里/ },
  { q: '東大ポポロ', expectTitle: /ポポロ/ },
  { q: '川崎民商事件', expectTitle: /川崎民商/ },
  { q: '八幡製鉄の政治献金', expectTitle: /八幡/ },
  { q: '南九州税理士会', expectTitle: /南九州|税理士/ },
  { q: '検閲と事前抑制の違い', expectTitle: /検閲.*事前|北方と税関/ },
  // 憲法・深い枠組み
  { q: '目的効果基準ってなに', expectTitle: /目的効果基準/ },
  { q: '総合考慮基準', expectTitle: /総合考慮|総合衡量/ },
  { q: '目的効果と総合考慮の違い', expectTitle: /目的効果.*総合考慮|総合考慮基準/ },
  { q: '津と愛媛と空知太', expectTitle: /政教分離判例|津・愛媛/ },
  { q: '政教分離の判断枠組み', expectTitle: /政教分離の答案型|判断枠組み|目的効果/ },
  { q: '規制目的二分論', expectTitle: /規制目的二分/ },
  { q: '明白性の原則ってなに', expectTitle: /明白性の原則/ },
  { q: 'LRAの基準', expectTitle: /LRA|厳格な合理性/ },
  { q: '薬局と小売市場の審査基準', expectTitle: /職業の自由・似た判例|規制目的|薬局/ },
  { q: '事前抑制の例外要件', expectTitle: /事前抑制/ },
  { q: '泉佐野の危険の基準', expectTitle: /泉佐野|差し迫った危険/ },
  { q: '平等の違憲判決を並べて', expectTitle: /平等・家族判例/ },
  { q: '司法権の限界をまとめて', expectTitle: /司法権の限界/ },
  // 国家賠償法
  { q: '国賠1条と2条の違い', expectTitle: /国賠.*1条と2条|全体像/ },
  { q: '職務行為基準説ってなに', expectTitle: /職務行為基準/ },
  { q: '公務員個人を訴えられる？', expectTitle: /公務員個人責任/ },
  { q: 'パトカー追跡事件', expectTitle: /パトカー追跡/ },
  { q: '規制権限不行使ってなに', expectTitle: /規制権限不行使/ },
  { q: '筑豊じん肺', expectTitle: /筑豊じん肺/ },
  { q: 'クロロキン訴訟', expectTitle: /クロロキン/ },
  { q: '建築確認と国賠', expectTitle: /建築確認と国賠/ },
  { q: '高知落石事件', expectTitle: /高知落石/ },
  { q: '大東水害訴訟', expectTitle: /大東水害/ },
  { q: '多摩川水害', expectTitle: /多摩川水害/ },
  { q: '赤色灯事件', expectTitle: /赤色灯/ },
  { q: '大阪国際空港の騒音', expectTitle: /大阪国際空港/ },
  { q: '道路と河川の瑕疵の違い', expectTitle: /道路・河川の瑕疵/ },
  { q: '国賠の前に取消が必要？', expectTitle: /国賠と取消/ },
  { q: '立法不作為で国賠', expectTitle: /立法・立法不作為/ },
  { q: 'テニス審判台', expectTitle: /審判台/ },
  { q: '故障車放置', expectTitle: /故障車/ },
  { q: '赤色灯と故障車の違い', expectTitle: /赤色灯と故障車/ },
  { q: '改修後の河川管理', expectTitle: /河川管理の瑕疵|多摩川/ },
  { q: '国賠のひっかけ', expectTitle: /混同防止|道路・河川/ },
  { q: '異常な用法で瑕疵', expectTitle: /審判台|防護柵|異常/ },
];

const all = [
  ...KISO_HOUGAKU_CHAT_TOPIC_BRIEFS,
  ...KISO_HOUGAKU_COMPARISON_BRIEFS,
  ...KISO_HOUGAKU_MOSHI_BRIEFS,
  ...GYOSEI_SORON_CHAT_BRIEFS,
  ...GYOSEI_SORON_NET_CHAT_BRIEFS,
  ...GYOSEI_TETSUZUKI_CHAT_BRIEFS,
  ...GYOSEI_FUFUKU_CHAT_BRIEFS,
  ...GYOSEI_PROC_COMPARISON_BRIEFS,
  ...GYOSEI_GYOSHO_CHAT_BRIEFS,
  ...KENPOU_CHAT_BRIEFS,
  ...KENPOU_HANREI_CHAT_BRIEFS,
  ...KENPOU_HANREI2_CHAT_BRIEFS,
  ...KENPOU_DEEP_CHAT_BRIEFS,
  ...KOKUBAI_CHAT_BRIEFS,
];
let fail = 0;

console.log(
  `briefs: base=${KISO_HOUGAKU_CHAT_TOPIC_BRIEFS.length} comparison=${KISO_HOUGAKU_COMPARISON_BRIEFS.length} moshi=${KISO_HOUGAKU_MOSHI_BRIEFS.length} gyosei=${GYOSEI_SORON_CHAT_BRIEFS.length} gyoseiNet=${GYOSEI_SORON_NET_CHAT_BRIEFS.length} tetsuzuki=${GYOSEI_TETSUZUKI_CHAT_BRIEFS.length} fufuku=${GYOSEI_FUFUKU_CHAT_BRIEFS.length} procCompare=${GYOSEI_PROC_COMPARISON_BRIEFS.length} gyosho=${GYOSEI_GYOSHO_CHAT_BRIEFS.length} kenpou=${KENPOU_CHAT_BRIEFS.length} kenpouHanrei=${KENPOU_HANREI_CHAT_BRIEFS.length} kenpouHanrei2=${KENPOU_HANREI2_CHAT_BRIEFS.length} kenpouDeep=${KENPOU_DEEP_CHAT_BRIEFS.length} kokubai=${KOKUBAI_CHAT_BRIEFS.length} total=${all.length}`
);

for (const c of cases) {
  const hits = matchBriefs(c.q, all);
  const passed = hits.some((h) => c.expectTitle.test(h.title));
  if (!passed) {
    fail += 1;
    console.log('FAIL', c.q, '→', hits.map((h) => h.title));
  } else {
    const shown = hits
      .filter((h) => c.expectTitle.test(h.title))
      .map((h) => h.title)
      .slice(0, 2)
      .join(' | ');
    console.log('OK  ', c.q, '→', shown);
  }
}

if (fail > 0) {
  console.error(`\n${fail} case(s) failed`);
  process.exit(1);
}
console.log('\nAll comparison trigger checks passed.');
