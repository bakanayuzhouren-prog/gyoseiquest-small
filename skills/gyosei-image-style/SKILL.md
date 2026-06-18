---
name: gyosei-image-style
description: Create consistent GPT Image prompts and placement plans for Gyosei Quest learning visuals, deep-dive diagrams, textbook images, and recurring avatars. Use when the user asks to generate, redesign, compress/recreate, or standardize app images, legal-study diagrams, character avatars, or visual explanations for quiz/deep-dive content.
---

# Gyosei Image Style

Use this skill whenever image generation or visual design consistency matters in Gyosei Quest.

## Core Workflow

1. Identify the learning purpose: doctrine map, comparison table, process flow, case timeline, calculation diagram, avatar, or UI-support image.
2. Read the relevant reference:
   - For legal learning diagrams and deep-dive images, read `references/visual-guidelines.md`.
   - For recurring characters and avatars, read `references/avatar-guidelines.md`.
3. Preserve legal accuracy before decoration. If a concept is uncertain, mark it for confirmation instead of inventing.
4. Generate GPT Image prompts that specify layout, typography, style, colors, whitespace, and prohibited elements.
5. After generating an image, decide its app placement: `もっと深掘る`, `君の教科書`, `見て聞いて覚える`, bonus question explanation, or cross-topic reference.
6. Verify the finished image visually before calling the work complete.

## Required Output For Image Tasks

When creating or planning an image, include:

- Purpose: what the learner should understand faster after seeing it.
- Placement: exact screen/data target where it should appear.
- Prompt: GPT Image prompt using the shared style.
- Alt summary: short text fallback for the app.
- Verification notes: text overlap, readability, legal accuracy risk, and file size.

## Default GPT Image Prompt Skeleton

```text
Create a clean Japanese legal-study diagram for Gyosei Quest.
Style: warm but focused exam-prep learning app, flat editorial illustration, crisp vector-like shapes, readable Japanese labels, restrained color palette, no photorealism.
Canvas: [size/aspect].
Topic: [legal topic].
Learning goal: [one sentence].
Layout: [table/flow/timeline/comparison/calculation].
Include: [required terms, arrows, labels].
Avoid: tiny text, decorative clutter, gradients as the main background, dark stock-photo atmosphere, copyrighted source text, exact reproduction of mock-exam pages.
Ensure all Japanese text is large, horizontally readable, and not overlapping.
```

## Project Rules

- Do not reproduce third-party mock exam pages, answer explanations, or screenshots verbatim.
- Use source material only to extract short, original learning points.
- Keep generated images lightweight enough for the app; prefer compressed PNG/WebP after visual verification.
- If replacing an existing image, preserve all active references or update the image map in the same change.
