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
import { TAC1_MOSHI_LEARN_BY_SUBJECT } from './tac1_moshi_learn_content.js';
import { TAC2_MOSHI_LEARN_BY_SUBJECT } from './tac2_moshi_learn_content.js';
import { TAC3_MOSHI_LEARN_BY_SUBJECT } from './tac3_moshi_learn_content.js';
import { KOKUBAI_LEARN_BY_SUBJECT } from './kokubai_learn_content.js';

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
  TAC1_MOSHI_LEARN_BY_SUBJECT,
  TAC2_MOSHI_LEARN_BY_SUBJECT,
  TAC3_MOSHI_LEARN_BY_SUBJECT,
  KOKUBAI_LEARN_BY_SUBJECT,
);

export const LEARN_CONTENT = merged.LEARN_CONTENT;
export const LEARN_DEEPDIVE = merged.LEARN_DEEPDIVE;
export const LEARN_F_EXPLAIN = merged.LEARN_F_EXPLAIN;
export const LEARN_STATUTE_REFS = merged.LEARN_STATUTE_REFS;
export const LEARN_SOURCE = merged.LEARN_SOURCE;
export const LEARN_LINKS = merged.LEARN_LINKS;
