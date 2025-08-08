# Task Management

This directory contains all task specifications for the MonotonicID project.

## Branching Workflow

**IMPORTANT**: Each task must be developed on its own branch following this pattern:
- Branch naming: `task/[task-number]-[brief-description]`
- Example: `task/01-initial-setup`, `task/02-decoder-logic`

### Workflow Steps:
1. Create a new branch from `main` for each task
2. Develop the feature/fix on the task branch
3. Commit changes with descriptive messages
4. Create a pull request to merge back to `main`
5. Update task status in this documentation

## Task Index

Each task has its own markdown file with detailed specifications:

- [Initial Setup](./01-initial-setup.md) - ✅ **COMPLETED** (Branch: `task/01-initial-setup`) - Create initial pnpm monorepo project with basic web app
- [ULID Decoder](./03-ulid-decoder.md) - ✅ **COMPLETED** (Branch: `task/03-ulid-decoder`) - Implement ULID decoding functionality
- [Renovate and CodeRabbit Config](./04-renovate-coderabbit-config.md) - 📋 **PLANNED** (Branch: `task/04-renovate-coderabbit-config`) - Configure Renovate PR limits and CodeRabbit integration

## Task Status Legend

- ✅ **COMPLETED** - Task has been finished and verified
- 🔄 **IN PROGRESS** - Task is currently being worked on
- 📋 **PLANNED** - Task is planned but not yet started
- ❌ **BLOCKED** - Task is blocked by dependencies or issues

## Guidelines

- Each task should have its own `.md` file with detailed specifications
- Use a single tracking system within the project to monitor task progress
- **ALWAYS create a separate branch for each individual task** to maintain clean development workflow
- Update this index when adding new tasks or changing task status
- Include branch name in task status for tracking
