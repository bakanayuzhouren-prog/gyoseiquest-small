/**
 * 模試・過去問超え論点の質問モード用ガイド。
 * chatKnowledgeSearch からの参照用スタブ（本文未投入）。
 */
export type ChatTopicBrief = {
  triggers: string[];
  title: string;
  text: string;
};

export const MOSHI_BEYOND_PAST_CHAT_BRIEFS: ChatTopicBrief[] = [];

export const MOSHI_BEYOND_PAST_KEY_PHRASES: string[] = [];

export const MOSHI_BEYOND_PAST_PHRASE_ALIASES: [string, string[]][] = [];
