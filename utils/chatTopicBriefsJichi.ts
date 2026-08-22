/**
 * 地方自治法・質問モード用ガイド。
 * chatKnowledgeSearch からの参照用スタブ（本文未投入）。
 */
export type ChatTopicBrief = {
  triggers: string[];
  title: string;
  text: string;
};

export const JICHI_CHAT_BRIEFS: ChatTopicBrief[] = [];

export const JICHI_KEY_PHRASES: string[] = [];

export const JICHI_PHRASE_ALIASES: [string, string[]][] = [];
