export type Question = {
  text: string;
  choices: string[];
  answer: number;
  explain: string;
};

export const SUBJECTS: Record<string, Question[]> = {
  行政法: [
    {
      text: '行政処分の取消訴訟の提起期間は原則としてどれですか。',
      choices: ['3か月', '6か月', '1年', '2年'],
      answer: 1,
      explain:
        '取消訴訟は処分があったことを知った日から6か月以内、処分の日から1年以内が原則です。',
    },
    {
      text: '行政指導に関する説明として正しいものはどれですか。',
      choices: [
        '相手方に法的義務を直接課す',
        '相手方の任意の協力を求める',
        '不服申立ての対象になる',
        '行政処分と同一の効果を持つ',
      ],
      answer: 1,
      explain: '行政指導は任意の協力を求める事実行為で、法的義務を直接課しません。',
    },
    {
      text: '行政不服審査法における原則的な不服申立ての方法はどれですか。',
      choices: ['再審査請求', '審査請求', '異議申立て', '執行停止請求'],
      answer: 1,
      explain: '原則は審査請求で、再審査請求は例外的な仕組みです。',
    },
  ],
};
