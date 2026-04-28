from pathlib import Path

readme = """# Gemini UI Redesign Experiments

A collection of UI experiments exploring how Gemini could evolve from a scattered chatbot interface into a calmer, more useful AI workspace.

This repo is for rapid iteration, critique, and comparison. Each version should test a clear product hypothesis rather than only changing visual style.

---

## Core Thesis

Gemini’s UI problem is not just aesthetics. The bigger issue is workflow clarity.

A better Gemini interface should make four things obvious:

1. **Mode** — what the user is doing: chat, research, create, analyze, automate.
2. **Context** — what Gemini is using: chat history, Drive, Gmail, web, uploads, memory.
3. **Output** — what is being produced: answer, report, prototype, slide outline, summary, table.
4. **Next action** — what the user can do next: edit, export, cite, save, share, continue.

The goal is to reduce cognitive load while preserving Gemini’s main advantage: deep integration with Google’s ecosystem.

---

## What This Repo Contains

This repo will contain multiple iterations of redesigned Gemini UI concepts.

Each iteration may include:

- React prototypes
- Static mockups
- UX notes
- Product rationale
- Screenshots
- Prompt files for AI builders like Lovable, v0, Cursor, Claude, or ChatGPT
- Comparison notes between versions

---

## Current Direction

The latest direction is intentionally simpler than the first concept.

Instead of a dense AI cockpit, the UI focuses on a calmer structure:

```text
Sidebar          Main workspace
Home            Header with mode + context
Chat            Focused content area
Research        Minimal command bar
Create          Context drawer only when needed
