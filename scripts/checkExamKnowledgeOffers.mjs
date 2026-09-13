import { EXAM_KNOWLEDGE_CARDS } from '../utils/examKnowledgeCatalog.ts';
import { applyExamKnowledgeSession, resolveExamKnowledgeTurn } from '../utils/examKnowledgeOffers.ts';

function empty() {
  return { pendingOfferId: null, explainedIds: [], declinedIds: [] };
}

const cases = [
  { q: '一般競争入札が原則？', expectOffer: /自治体の契約方法/ },
  { q: '無権代理と相続', expectOffer: /５つのパターン/ },
  { q: '不動産賃貸の先取特権の対象は建物？', expectOffer: /保護する債権/ },
  { q: '死因贈与と遺贈の違いは', expectOffer: /死因贈与と遺贈の違い/ },
  { q: '処分性ってなに', expectOffer: null },
];

let failed = 0;
for (const c of cases) {
  const turn = resolveExamKnowledgeTurn(c.q, empty());
  const text = turn.offer?.text || null;
  const ok = c.expectOffer ? c.expectOffer.test(text || '') : text === null;
  if (!ok) {
    failed += 1;
    console.error('FAIL', c.q, text);
  }
}

let session = empty();
session = applyExamKnowledgeSession(session, resolveExamKnowledgeTurn('一般競争入札が原則？', session));
const yes = resolveExamKnowledgeTurn('はい', session);
if (!yes.pinCardId || yes.offer) {
  failed += 1;
  console.error('FAIL yes path', yes);
}

const unrel = resolveExamKnowledgeTurn('二重の基準', empty());
if (unrel.offer) {
  failed += 1;
  console.error('FAIL unrelated', unrel.offer.text);
}

if (EXAM_KNOWLEDGE_CARDS.length !== 4) {
  failed += 1;
  console.error('FAIL card count', EXAM_KNOWLEDGE_CARDS.length);
}

if (failed) {
  console.error(`exam knowledge offers: ${failed} failed`);
  process.exit(1);
}
console.log('exam knowledge offers: ok');
