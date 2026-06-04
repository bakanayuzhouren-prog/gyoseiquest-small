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

const merged = mergeTacLearn(
  BASE_CONTENT,
  BASE_DEEPDIVE,
  BASE_F_EXPLAIN,
  BASE_STATUTE_REFS,
  BASE_SOURCE,
  BASE_LINKS,
  TAC_LEARN_BY_SUBJECT,
);

export const LEARN_CONTENT = merged.LEARN_CONTENT;
export const LEARN_DEEPDIVE = merged.LEARN_DEEPDIVE;
export const LEARN_F_EXPLAIN = merged.LEARN_F_EXPLAIN;
export const LEARN_STATUTE_REFS = merged.LEARN_STATUTE_REFS;
export const LEARN_SOURCE = merged.LEARN_SOURCE;
export const LEARN_LINKS = merged.LEARN_LINKS;
