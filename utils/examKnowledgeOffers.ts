import {
  EXAM_KNOWLEDGE_CARDS,
  examKnowledgeOfferById,
  type ExamKnowledgeOffer,
} from './examKnowledgeCatalog';

export type ExamKnowledgeSession = {
  pendingOfferId: string | null;
  explainedIds: string[];
  declinedIds: string[];
};

export type ExamKnowledgeTurn = {
  searchQuery: string;
  pinCardId: string | null;
  offer: ExamKnowledgeOffer | null;
  explainedId: string | null;
  declinedId: string | null;
};

function norm(s: string): string {
  return (s || '').normalize('NFKC').toLowerCase().replace(/\s+/g, '');
}

function isAffirmativeStudyReply(q: string): boolean {
  return /^(はい|学習したい|お願いします|お願い|知りたい|見たい|学ぶ)([。．!！、,\s]*)$/.test(q.trim());
}

function isDeclineStudyReply(q: string): boolean {
  return /^(いいえ|いや|大丈夫|いいです|不要|結構です|今はしない|また今度)([。．!！、,\s]*)$/.test(q.trim());
}

function isConcreteNewQuestion(q: string): boolean {
  const t = q.trim();
  if (isAffirmativeStudyReply(t) || isDeclineStudyReply(t)) return false;
  if (t.length >= 10) return true;
  return /条|入札|随意|せり|無権|相続|追認|先取|賃貸|死因|遺贈|保証/.test(t);
}

function hits(hay: string, terms: string[]): number {
  return terms.reduce((n, term) => (hay.includes(norm(term)) ? n + 1 : n), 0);
}

function pickOffer(query: string, session: ExamKnowledgeSession): ExamKnowledgeOffer | null {
  const q = norm(query);
  if (!q) return null;

  let best: { offer: ExamKnowledgeOffer; score: number } | null = null;
  for (const card of EXAM_KNOWLEDGE_CARDS) {
    if (hits(q, card.searchTerms) < 1) continue;
    for (const offer of card.offers) {
      if (session.explainedIds.includes(offer.id) || session.declinedIds.includes(offer.id)) continue;
      if (hits(q, offer.coveredTerms) > 0) continue;
      const score = hits(q, offer.matchTerms) + hits(q, card.searchTerms) * 0.3;
      if (score <= 0) continue;
      if (!best || score > best.score) best = { offer, score };
    }
  }
  return best?.offer ?? null;
}

export function resolveExamKnowledgeTurn(userQuery: string, session: ExamKnowledgeSession): ExamKnowledgeTurn {
  const trimmed = userQuery.trim();

  if (session.pendingOfferId && isDeclineStudyReply(trimmed)) {
    return {
      searchQuery: trimmed,
      pinCardId: null,
      offer: null,
      explainedId: null,
      declinedId: session.pendingOfferId,
    };
  }

  if (session.pendingOfferId && isAffirmativeStudyReply(trimmed) && !isConcreteNewQuestion(trimmed)) {
    const found = examKnowledgeOfferById(session.pendingOfferId);
    if (found) {
      return {
        searchQuery: found.offer.followUpQuestion,
        pinCardId: found.card.id,
        offer: null,
        explainedId: found.offer.id,
        declinedId: null,
      };
    }
  }

  const offer = pickOffer(trimmed, session);
  return {
    searchQuery: trimmed,
    pinCardId: null,
    offer,
    explainedId: null,
    declinedId: null,
  };
}

export function applyExamKnowledgeSession(session: ExamKnowledgeSession, turn: ExamKnowledgeTurn): ExamKnowledgeSession {
  const next: ExamKnowledgeSession = {
    pendingOfferId: turn.offer?.id ?? null,
    explainedIds: [...session.explainedIds],
    declinedIds: [...session.declinedIds],
  };
  if (turn.explainedId && !next.explainedIds.includes(turn.explainedId)) next.explainedIds.push(turn.explainedId);
  if (turn.declinedId && !next.declinedIds.includes(turn.declinedId)) next.declinedIds.push(turn.declinedId);
  return next;
}

export function appendExamKnowledgeOffer(answer: string, offer: ExamKnowledgeOffer | null): string {
  if (!offer) return answer;
  const marker = offer.text.slice(0, 12);
  if (answer.includes(marker)) return answer;
  return `${answer.trimEnd()}\n\n${offer.text}`;
}
