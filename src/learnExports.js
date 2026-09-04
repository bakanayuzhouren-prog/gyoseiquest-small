import {
  LEARN_CONTENT as BASE_CONTENT,
  LEARN_DEEPDIVE as BASE_DEEPDIVE,
  LEARN_F_EXPLAIN as BASE_F_EXPLAIN,
  LEARN_LINKS as BASE_LINKS,
  LEARN_SOURCE as BASE_SOURCE,
  LEARN_STATUTE_REFS as BASE_STATUTE_REFS,
} from './learn.js';
import { mergeTacLearn } from './mergeTacLearn.js';
import { TAC_LEARN_BY_SUBJECT } from './tac_learn_content.js';
import { GOUKAKU_MOSHI_LEARN_BY_SUBJECT } from './goukaku_moshi_learn_content.js';
import { GOUKAKU_MOSHI_ROUND3_LEARN_BY_SUBJECT } from './goukaku_moshi_round3_learn_content.js';
import { GOUKAKU_MOSHI_ROUND2_LEARN_BY_SUBJECT } from './goukaku_moshi_round2_learn_content.js';
import { TAC1_MOSHI_LEARN_BY_SUBJECT } from './tac1_moshi_learn_content.js';
import { TAC2_MOSHI_LEARN_BY_SUBJECT } from './tac2_moshi_learn_content.js';
import { TAC3_MOSHI_LEARN_BY_SUBJECT } from './tac3_moshi_learn_content.js';
import { KOKUBAI_LEARN_BY_SUBJECT } from './kokubai_learn_content.js';
import { MINPOU_JOSHIKI_LEARN_BY_SUBJECT } from './minpou_joshiki_learn_content.js';
import { GYOSEIHOU_JOSHIKI_LEARN_BY_SUBJECT } from './gyoseihou_joshiki_learn_content.js';
import { LEC_KOUKAI_MOSHI_LEARN_BY_SUBJECT } from './lec_koukai_moshi_learn_content.js';
import { LEC_BONUS_KENPOU_LEARN_BY_SUBJECT } from './lec_bonus_kenpou_learn_content.js';
import { LEC_ATARU_ROUND1_LEARN_BY_SUBJECT } from './lec_ataru_round1_learn_content.js';
import { LEC_ATARU_ROUND2_LEARN_BY_SUBJECT } from './lec_ataru_round2_learn_content.js';
import { LEC_ATARU_ROUND3_LEARN_BY_SUBJECT } from './lec_ataru_round3_learn_content.js';
import { GOKAKU_KAKUMEI_HOSEI_R2_LEARN_BY_SUBJECT } from './goukaku_kakumei_hosei_r2_learn_content.js';
import { ITO_JUKU_KOUKAI1_LEARN_BY_SUBJECT } from './ito_juku_koukai1_learn_content.js';
import { ITO_JUKU_FINALCHECK_LEARN_BY_SUBJECT } from './ito_juku_finalcheck_learn_content.js';
import { KISOCHI_LEARN_BY_SUBJECT } from './kisochi_learn_content.js';
import { splitKisochiDumpToRooms } from './splitKisochiLearn.js';
import { appendStolenLostCompareToLearnDeepdive } from './appendStolenLostCompareLearn.js';
import { appendGyoshoHyoToLearnDeepdive } from './appendGyoshoHyoLearn.js';
import { appendIninKitakuCompareToLearnDeepdive } from './appendIninKitakuCompareLearn.js';
import { appendSeigenSaikokuCompareToLearnDeepdive } from './appendSeigenSaikokuLearn.js';
import { appendMinpo177ThirdPartyToLearnDeepdive } from './appendMinpo177ThirdPartyLearn.js';
import { appendShouhouCastToLearnDeepdive } from './appendShouhouCastLearn.js';
import { appendKoubunToLearnDeepdive } from './appendKoubunLearn.js';
import { appendChuiGimuToLearnDeepdive } from './appendChuiGimuLearn.js';
import { appendSaikenHyoToLearnDeepdive } from './appendSaikenHyoLearn.js';
import { appendKounenBessouToLearnDeepdive } from './appendKounenBessouLearn.js';
import { appendShihaininKengenToLearnDeepdive } from './appendShihaininKengenLearn.js';
import { appendMochibun3shaToLearnDeepdive } from './appendMochibun3shaLearn.js';

function mergeLearnLayers(base, ...layers) {
  return layers.reduce(
    (acc, layer) =>
      mergeTacLearn(
        acc.LEARN_CONTENT,
        acc.LEARN_DEEPDIVE,
        acc.LEARN_F_EXPLAIN,
        acc.LEARN_STATUTE_REFS,
        acc.LEARN_SOURCE,
        acc.LEARN_LINKS,
        layer,
      ),
    base,
  );
}

const merged = mergeLearnLayers(
  {
    LEARN_CONTENT: BASE_CONTENT,
    LEARN_DEEPDIVE: BASE_DEEPDIVE,
    LEARN_F_EXPLAIN: BASE_F_EXPLAIN,
    LEARN_STATUTE_REFS: BASE_STATUTE_REFS,
    LEARN_SOURCE: BASE_SOURCE,
    LEARN_LINKS: BASE_LINKS,
  },
  TAC_LEARN_BY_SUBJECT,
  GOUKAKU_MOSHI_LEARN_BY_SUBJECT,
  GOUKAKU_MOSHI_ROUND2_LEARN_BY_SUBJECT,
  GOUKAKU_MOSHI_ROUND3_LEARN_BY_SUBJECT,
  TAC1_MOSHI_LEARN_BY_SUBJECT,
  TAC2_MOSHI_LEARN_BY_SUBJECT,
  TAC3_MOSHI_LEARN_BY_SUBJECT,
  KOKUBAI_LEARN_BY_SUBJECT,
  MINPOU_JOSHIKI_LEARN_BY_SUBJECT,
  GYOSEIHOU_JOSHIKI_LEARN_BY_SUBJECT,
  LEC_KOUKAI_MOSHI_LEARN_BY_SUBJECT,
  LEC_BONUS_KENPOU_LEARN_BY_SUBJECT,
  LEC_ATARU_ROUND1_LEARN_BY_SUBJECT,
  LEC_ATARU_ROUND2_LEARN_BY_SUBJECT,
  LEC_ATARU_ROUND3_LEARN_BY_SUBJECT,
  GOKAKU_KAKUMEI_HOSEI_R2_LEARN_BY_SUBJECT,
  ITO_JUKU_KOUKAI1_LEARN_BY_SUBJECT,
  ITO_JUKU_FINALCHECK_LEARN_BY_SUBJECT,
);

const kisochiSplit = splitKisochiDumpToRooms(merged);
const withKisochi = mergeTacLearn(
  kisochiSplit.LEARN_CONTENT,
  kisochiSplit.LEARN_DEEPDIVE,
  kisochiSplit.LEARN_F_EXPLAIN,
  kisochiSplit.LEARN_STATUTE_REFS,
  kisochiSplit.LEARN_SOURCE,
  kisochiSplit.LEARN_LINKS,
  KISOCHI_LEARN_BY_SUBJECT,
);

export const LEARN_CONTENT = withKisochi.LEARN_CONTENT;
export const LEARN_DEEPDIVE = appendMochibun3shaToLearnDeepdive(
  appendShihaininKengenToLearnDeepdive(
  appendKounenBessouToLearnDeepdive(
  appendSaikenHyoToLearnDeepdive(
  appendChuiGimuToLearnDeepdive(
    appendKoubunToLearnDeepdive(
      appendShouhouCastToLearnDeepdive(
        appendMinpo177ThirdPartyToLearnDeepdive(
          appendSeigenSaikokuCompareToLearnDeepdive(
            appendIninKitakuCompareToLearnDeepdive(
              appendGyoshoHyoToLearnDeepdive(
                appendStolenLostCompareToLearnDeepdive(withKisochi.LEARN_DEEPDIVE, withKisochi.LEARN_CONTENT),
                withKisochi.LEARN_CONTENT,
              ),
              withKisochi.LEARN_CONTENT,
            ),
            withKisochi.LEARN_CONTENT,
          ),
          withKisochi.LEARN_CONTENT,
        ),
        withKisochi.LEARN_CONTENT,
      ),
      withKisochi.LEARN_CONTENT,
    ),
    withKisochi.LEARN_CONTENT,
  ),
    withKisochi.LEARN_CONTENT,
  ),
  withKisochi.LEARN_CONTENT,
  ),
  withKisochi.LEARN_CONTENT,
  ),
  withKisochi.LEARN_CONTENT,
);
export const LEARN_F_EXPLAIN = withKisochi.LEARN_F_EXPLAIN;
export const LEARN_STATUTE_REFS = withKisochi.LEARN_STATUTE_REFS;
export const LEARN_SOURCE = withKisochi.LEARN_SOURCE;
export const LEARN_LINKS = withKisochi.LEARN_LINKS;
