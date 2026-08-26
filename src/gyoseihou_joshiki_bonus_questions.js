/**
 * 行政法・常識で切るボーナス。自作。過去問原文なし。
 */

function markBonus(question) {
  const choices = Array.isArray(question.choices) ? question.choices : [];
  const answer = Array.isArray(question.answer) ? question.answer : [];
  const images = Array.isArray(question.deepdiveImages) ? question.deepdiveImages : [];
  const imageBlock = images.map((k) => `[[image:${k}]]`).join('\n\n');
  return {
    ...question,
    isBonus: true,
    wordBank: question.wordBank || '',
    slots: question.slots || [],
    choiceDeepDive:
      question.choiceDeepDive ||
      choices.map((text, index) =>
        [
          imageBlock,
          '# 常識で切る・行訴 のもっと深掘る',
          '',
          `この肢は **${answer.includes(index) ? '正解側' : '誤答側'}**。`,
          '',
          question.explain || '',
          '',
          `- 肢: ${text}`,
        ]
          .filter(Boolean)
          .join('\n')
      ),
    choiceExplanations:
      question.choiceExplanations ||
      choices.map((_, index) =>
        answer.includes(index) ? `正解肢。${question.explain || ''}` : '誤答肢。職権・申立ての区別を取り違えている。'
      ),
  };
}

const BASE = {
  行政法: {
    行政事件訴訟法: [
      {
        deepdiveImages: ['行政法/sanka-kaihatsu'],
        text: '【常識で切る】開発許可の取消訴訟に関する次の記述のうち、妥当なものはどれか。',
        choices: [
          '訴訟の結果により権利を害される関連業者があるときは、当事者若しくはその第三者の申立てにより又は職権で、その第三者を訴訟に参加させることができる。',
          '第三者の訴訟参加は、当事者の申立てがある場合に限り認められ、職権ではできない。',
          '第三者自身が参加を申し立てることはできない。',
          '取消判決の効力は当事者に限られ、第三者には及ばない。',
          '関連業者が訴訟を知らなくても、裁判所は参加させてはならない。',
        ],
        answer: [0],
        explain:
          '正解は1。行訴法22条1項。申立て（当事者・その第三者）又は職権。理由の芯は取消判決の第三者効（32条）。',
        choiceExplanations: [
          '正解肢。22条どおり。',
          '誤答肢。職権でもできる。',
          '誤答肢。その第三者の申立ても可。',
          '誤答肢。32条の第三者効がある。',
          '誤答肢。知らないときこそ職権。',
        ],
      },
      {
        deepdiveImages: ['行政法/shokken-junyo'],
        text: '【常識で切る】職権証拠調べに関する次の記述のうち、妥当なものはどれか。',
        choices: [
          '裁判所は必要があると認めるとき職権で証拠調べができ、その結果について当事者の意見をきかなければならない。',
          '職権証拠調べの結果について、当事者の意見をきく必要はない。',
          '職権証拠調べは申立てがある場合に限り認められる。',
          '職権証拠調べにより、当事者が主張していない主要事実を判決の基礎にしてよい。',
          '職権証拠調べは取消訴訟に限られ、他の抗告訴訟では認められない。',
        ],
        answer: [0],
        explain:
          '正解は1。24条ただし書の意見聴取。職権探知ではない。抗告への準用は別問。',
        choiceExplanations: [
          '正解肢。24どおり。',
          '誤答肢。意見をきく。',
          '誤答肢。職権でもできる。',
          '誤答肢。職権探知ではない。',
          '誤答肢。38条1項で他の抗告にも準用。',
        ],
      },
      {
        deepdiveImages: ['行政法/junyo-22-24'],
        text: '【常識で切る】行訴法22条・24条の準用に関する次の記述のうち、妥当なものはどれか。',
        choices: [
          '第三者の訴訟参加は当事者訴訟に準用されないが、取消以外の抗告訴訟には準用される。職権証拠調べは抗告にも当事者にも準用される。',
          '当事者訴訟にも、第三者の訴訟参加（22条）が準用される。',
          '義務付け訴訟・差止め訴訟には、22条・24条は準用されない。',
          '職権証拠調べは当事者訴訟には準用されない。',
          '22条・24条は取消訴訟にしかなく、他の抗告訴訟には準用されない。',
        ],
        answer: [0],
        explain:
          '正解は1。38条1項でその他抗告に22・24準用。41条1項で当事者は24○・22×。',
        choiceExplanations: [
          '正解肢。てらしぃ芯どおり。',
          '誤答肢。22は当事者訴訟に準用なし。',
          '誤答肢。抗告なら38で準用される。',
          '誤答肢。24は41で準用される。',
          '誤答肢。その他抗告にも準用される。',
        ],
      },
      {
        deepdiveImages: ['行政法/shikkou-teishi-taihikou'],
        text: '【常識で切る】行訴法における職権と申立てに関する次の記述のうち、妥当なものはどれか。',
        choices: [
          '第三者の訴訟参加と職権証拠調べは職権でも申立てでも動かせるが、執行停止は申立てが必要で職権ではできない。',
          '執行停止は、必要があると認めるとき裁判所が職権ですることができる。',
          '第三者の訴訟参加は職権でのみ認められ、申立てではできない。',
          '職権証拠調べは申立てがある場合に限り認められる。',
          '執行停止・訴訟参加・職権証拠調べは、いずれも職権のみで行い申立ては認められない。',
        ],
        answer: [0],
        explain:
          '正解は1。22・24は職権・申立て可。25条の執行停止は申立て必須・職権不可。',
        choiceExplanations: [
          '正解肢。対比の芯。',
          '誤答肢。25は職権不可。',
          '誤答肢。22は申立ても可。',
          '誤答肢。24は職権できる。',
          '誤答肢。全部誤り。',
        ],
      },
    ],
  },
};

export const GYOSEIHOU_JOSHIKI_BONUS_QUESTIONS = {
  行政法: {
    行政事件訴訟法: BASE.行政法.行政事件訴訟法.map(markBonus),
  },
};
