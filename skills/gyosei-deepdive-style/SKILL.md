---
name: gyosei-deepdive-style
description: Create, revise, and place Gyosei Quest quiz deep-dive explanations with legally relevant content, consistent card-based presentation, related-question chunks, and cross-subject comparisons. Use when adding or repairing もっと深掘る content, generated legal explanations, 判例 stories, comparison chunks, or deep-dive UI formatting.
---

# Gyosei Deep-dive Style

Use this skill whenever quiz or learning deep-dives are created or revised.

## Content workflow

1. Identify the exact subject, field, question number, choice number, governing rule, and case name.
2. Search all subjects for the same statute, case, test, legal effect, and confusingly similar wording.
3. Classify the topic from the question stem and explicit metadata. Do not classify from an incidental word appearing only in another choice.
4. Preserve existing correct deep-dive content. Fill only missing content unless replacement is requested.
5. For case questions, explain the facts, conflict, issue, holding, and exam trap in that order.
6. Add related-question or cross-subject chunks when they materially prevent confusion.

## Relevance rules

- Make every card answer the current question or choice directly.
- Do not attach a broad doctrine merely because one choice contains a matching keyword.
- Prefer an accurate neutral explanation over a detailed but weakly related explanation.
- State whether the choice agrees with the case or statute, then identify the exact phrase that changes the conclusion.
- Do not invent a case name, holding, statutory requirement, or exception.
- Treat quiz IDs, learning-card IDs, and image filenames as separate namespaces. Never infer relevance from the same numeric prefix alone.
- Auto-place an image only when subject, field, question, choice, and topic metadata establish a direct match.
- If image relevance is uncertain, omit the image and keep the text deep-dive; use an explicit reviewed mapping before enabling it.

## Presentation rules

- Match the existing warm, restrained exam-prep card UI. Do not introduce a separate visual language.
- Structure generated content as numbered cards: `1. 結論`, `2. 判例のストーリー`, `3. 判断の軸`, `4. 本番の見分け方`.
- Do not use ATX headings such as `#`, `##`, or `###` in app-facing text. The current renderer may expose those markers as text.
- Use short paragraphs. Keep one learning purpose per card.
- Use `[[red:重要語]]` sparingly for the decisive term. Avoid decorative emoji runs and excessive bold text.
- For comparisons, prefer tab-separated rows supported by the app renderer. If a pipe table is used, verify that separators are not displayed literally.
- Avoid raw Markdown fences, HTML, nested lists, and unsupported syntax.
- Keep titles concise and remove source-column labels or generation notes from learner-facing text.

## Related-question chunks

- Keep the current question in the related group; never replace or hide it.
- Name each related subject, field, question, and choice when stable identifiers are available.
- Compare the facts, protected person, required procedure, legal basis, exception, and conclusion.
- Provide one short exam-day distinction or mnemonic.
- Make the same chunk reachable from both sides when practical.

## Placement and implementation

- Implement generated-data fallbacks outside large synchronized files when possible so sync does not erase them.
- Reuse the existing `もっと深掘る` route, card renderer, theme colors, spacing, and typography.
- Do not show a button unless its body is non-empty and relevant to the current question.
- Normalize legacy Markdown before navigation rather than changing unrelated global rendering behavior.

## Verification

1. Check representative ordinary, bonus, reorder, and slot-style questions.
2. Confirm the current choice gets the correct topic and no neighboring choice causes a false match.
3. Confirm no raw `#`, `##`, `###`, separator row, or code fence is visible.
4. Verify related chunks retain the current question and identify differences correctly.
5. Run lint and inspect PC and narrow mobile widths. Report any unavailable visual check.
6. Verify existing deep-dives and unrelated subjects remain unchanged.
