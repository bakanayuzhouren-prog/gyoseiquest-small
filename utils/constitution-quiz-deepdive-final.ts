import { buildRelevantConstitutionDeepDive } from '@/utils/constitution-quiz-deepdive-relevant';

type Input = {
  stem: string;
  choice: string;
  legallyCorrect: boolean | null;
};

const LEGACY_GUIDE_STEMS =
  /外国人の人権|百里基地|自衛隊基地|予防接種|住基ネット|捜査とプライバシー|夫婦同氏制|法の下の平等|信教の自由|神社の敷地|教科書検定|ため池の堤とう|適正手続|第三者没収|生存権|司法権の限界/;

/** 旧ガイドを使う場合も、選択肢中の偶然の単語を分類には使わせない最終入口。 */
export function buildFinalConstitutionDeepDive(input: Input): string {
  if (!LEGACY_GUIDE_STEMS.test(input.stem)) {
    return buildRelevantConstitutionDeepDive(input);
  }

  const base = buildRelevantConstitutionDeepDive({ ...input, choice: input.stem });
  const choice = input.choice.replace(/\s+/g, ' ').slice(0, 100);
  return `${base}\n\n6. この肢の確認ポイント\n「${choice}${input.choice.length > 100 ? '…' : ''}」を、直前の判断の軸と照合します。主体の入替え、例外の削除、断定の強さを確認してください。`;
}
