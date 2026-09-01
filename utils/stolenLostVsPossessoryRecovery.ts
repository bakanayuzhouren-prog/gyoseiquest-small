/** 193条（盗品・遺失物）と200条（占有回収）の聞き分け。図・learn・質問モードで共用。 */

export const STOLEN_LOST_VS_POSSESSORY_MARKER = '**比較：193条と占有回収（200条）**';

export const STOLEN_LOST_COMPARE_IMAGE_TAG = '[[image:textbook/minpou-kijutsu/q15-2]]';

export const STOLEN_LOST_VS_POSSESSORY_COMPARE_MD = `${STOLEN_LOST_COMPARE_IMAGE_TAG}

${STOLEN_LOST_VS_POSSESSORY_MARKER}

離脱の態様で聞き分ける。詐欺は193条の対象外。遺失は占有回収の対象外。

| 離脱 | 193条（盗品・遺失物の回復） | 200条（占有回収） |
|---|---|---|
| 盗品（盗取） | ○ 盗難時から2年 | ○ 侵奪時から1年 |
| 遺失 | ○ 遺失時から2年 | × 侵奪ではない |
| 詐欺・恐喝 | × 盗品・遺失物でない | × 侵奪ではない |
| 横領（預けた） | × | × 自ら占有を移した |

**暗記** 193条は盗品・遺失物だけ。200条は侵奪だけ。期間は2年と1年。起算は占有開始ではない。
`;

export function shouldAttachStolenLostCompare(aText: string, bText: string): boolean {
  const t = `${aText}\n${bText}`;
  if (t.includes(STOLEN_LOST_VS_POSSESSORY_MARKER)) return false;
  if (/盗品等関与/.test(t)) return false;
  if (/占有回収/.test(t) && /侵奪|奪われた/.test(t)) return true;
  if (/193条|盗品|遺失物の回復/.test(t)) return true;
  if (/即時取得/.test(t) && /盗品|遺失物/.test(t)) return true;
  return false;
}
