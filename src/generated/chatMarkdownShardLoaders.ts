/**
 * Auto-generated — do not edit by hand.
 * Regenerate: node scripts/buildChatMarkdownChunks.js
 */
import type { ChatMarkdownChunk } from './chatMarkdownChunks';

export const CHAT_MARKDOWN_SHARD_LOADERS: Record<string, () => Promise<ChatMarkdownChunk[]>> = {
  "bonus": () => import('./chatMarkdownShards/bonus').then((m) => m.CHAT_MARKDOWN_SHARD),
  "content": () => import('./chatMarkdownShards/content').then((m) => m.CHAT_MARKDOWN_SHARD),
  "content-textbook": () => import('./chatMarkdownShards/content-textbook').then((m) => m.CHAT_MARKDOWN_SHARD),
  "knowledge-creator": () => import('./chatMarkdownShards/knowledge-creator').then((m) => m.CHAT_MARKDOWN_SHARD),
  "knowledge-learn": () => import('./chatMarkdownShards/knowledge-learn').then((m) => m.CHAT_MARKDOWN_SHARD),
  "knowledge-other": () => import('./chatMarkdownShards/knowledge-other').then((m) => m.CHAT_MARKDOWN_SHARD),
  "knowledge-quiz": () => import('./chatMarkdownShards/knowledge-quiz').then((m) => m.CHAT_MARKDOWN_SHARD),
  "learn": () => import('./chatMarkdownShards/learn').then((m) => m.CHAT_MARKDOWN_SHARD),
  "pin": () => import('./chatMarkdownShards/pin').then((m) => m.CHAT_MARKDOWN_SHARD),
};
