type Q = { text: any; choices: any; answer: any; explain?: any };

export function safeQuestions(raw: any, label = "questions") {
  if (!Array.isArray(raw)) return { questions: [], warnings: [`[${label}] not array`] };

  const warnings: string[] = [];
  const questions = raw.flatMap((q: Q, i: number) => {
    const text = typeof q?.text === "string" ? q.text.trim() : "";
    const choices = Array.isArray(q?.choices) ? q.choices.filter((c: any) => typeof c === "string") : [];
    const answer = Number.isInteger(q?.answer) ? q.answer : -1;

    if (!text) return warnings.push(`[${label}] #${i} empty text`), [];
    if (choices.length < 2) return warnings.push(`[${label}] #${i} bad choices`), [];
    if (answer < 0 || answer >= choices.length) return warnings.push(`[${label}] #${i} bad answer(${q?.answer})`), [];

    return [{ text, choices, answer, explain: typeof q?.explain === "string" ? q.explain : undefined }];
  });

  return { questions, warnings };
}
