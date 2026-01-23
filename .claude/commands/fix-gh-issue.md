Please analyze and fix the GitHub issue: $ARGUMENTS

## Phase 1: Understand

1. Run `gh issue view $ARGUMENTS` to get the full issue details
2. Read all comments on the issue for additional context
3. Identify the acceptance criteria and success conditions
4. If the issue lacks clarity, list what's unclear before proceeding

## Phase 2: Research

5. Search the codebase for relevant files mentioned in the issue
6. Look for similar implementations or patterns we can follow
7. Check for existing tests that cover related functionality
8. Review any linked PRs or issues for additional context

## Phase 3: Plan

9. Create a brief implementation plan (3-7 steps max)
10. Identify potential risks or edge cases
11. List the files you'll need to modify or create

## Phase 4: Implement

12. Implement the changes following existing code patterns
13. Write or update tests to cover the new functionality
14. Ensure all acceptance criteria from the issue are met

## Phase 5: Verify

15. Run the test suite: `bun test` (or project equivalent)
16. Run linting: `bun run lint` (or project equivalent)
17. Run type checking if applicable
18. Manually verify the fix addresses the issue

## Phase 6: Commit & PR

19. Stage and commit with a descriptive message referencing the issue:
    `git commit -m "fix: description of change

    Closes #$ARGUMENTS"`

20. Push the branch and create a PR:
    `gh pr create --title "Fix #$ARGUMENTS: [brief description]" --body "Closes #$ARGUMENTS

    ## Changes
    - [list main changes]

    ## Testing
    - [how this was tested]"`

## Important Guidelines

- Do NOT start coding until Phase 2 (Research) is complete
- If the issue is unclear or missing information, stop and ask me
- Follow existing code style and patterns in this project
- Keep changes minimal and focused on the issue scope
