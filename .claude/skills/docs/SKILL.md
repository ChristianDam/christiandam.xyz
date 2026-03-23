---
name: docs
description: Update project documentation when creating or updating a pull request. Use this skill every time you create a PR (`gh pr create`) or update a PR. Ensures plans, CLAUDE.md, and other docs stay current with code changes.
---

# Docs Skill

Keep project documentation in sync with code changes. Run this **every time** a PR is created or updated.

## Checklist

When creating or updating a PR, go through each step:

### 1. Update the plan

- Check `.claude/plans/` for any plan related to the current work
- If a plan exists, update task checkboxes and status (`in-progress` → `completed`)
- If no plan exists and the work is non-trivial, create one using the template in `.claude/plans/README.md`
- Name format: `YYYY-MM-DD-short-description.md`

### 2. Update CLAUDE.md if needed

Review `CLAUDE.md` and update it if the PR introduces:

- New pages or routes (add to App Router Structure)
- New content types or data files (add to Content System or relevant section)
- New components or patterns (add to Component Patterns)
- New API endpoints (add to App Router Structure)
- New type definitions (add to Type Definitions)
- New conventions or key decisions (add to Key Conventions)
- New skills (add to Skills section)
- New commands (add to Commands section)

Only update what's relevant — don't add noise.

### 3. Clean up stale plans

- If any plans in `.claude/plans/` are fully completed or abandoned, mark them as such
- Remove tasks that are no longer relevant

## When to skip

- Trivial changes (typo fixes, dependency bumps) that don't affect architecture or conventions
- If nothing in the checklist applies, skip gracefully — don't force unnecessary doc changes
