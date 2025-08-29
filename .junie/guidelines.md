# Project Guidelines

## Project Overview

This project is a web application that allows decoding timestamp-based monotonic UIs. It serves as a utility site similar to:
- https://www.urldecoder.org/
- https://www.jwt.io/
- https://www.epochconverter.com/

The site will be monetized with advertisements and provides users with tools to decode and analyze monotonic identifiers.

## Technology Stack

- **Package Manager**: pnpm
- **Architecture**: Monorepo structure
- **Current Packages**: Single web package (expandable in the future)
- **Deployment**: Web application

## Project Structure

```
/
├── .junie/                 # Junie configuration and guidelines
├── tasks/                  # Task management directory
│   └── README.md          # Points to individual task files
├── packages/              # Monorepo packages (future)
│   └── web/              # Main web application
└── [other root files]
```

## Task Management

- **Branching**: Create a separate branch for each individual task to maintain clean development workflow
  - Branch naming convention: `issue-{issue-number}/{kebab-case-description}` (e.g., `issue-3/update-guidelines`) - use lowercase with hyphens for kebab-case format
  - Always create and checkout the task branch BEFORE making any changes
  - Never work directly on the main branch for task implementation (assumes `main` is the default branch)
  - Always create a pull request when the task is completed to merge changes back to main branch
  - Push changes to the pull request after every commit/update to keep the PR current

## Development Guidelines

### For Junie:
- **Testing**: Run tests to verify correctness of proposed solutions
- **Building**: Build the project before submitting results to ensure everything compiles
- **Code Style**: Follow modern web development best practices
- **Package Management**: Use pnpm for all package operations
- **Monorepo**: Respect the monorepo structure even with single package initially
- **Branch Management**: Always checkout the task branch when making changes so the user can see the work
- **Test Configuration**: Configure tests to run once and exit (not in watch mode) for CI/CD compatibility
- **Generated Files**: Ensure comprehensive .gitignore coverage for all generated files and build artifacts
- **Dependency Versions**: Use specific versions (no `^` or `~` prefixes) to ensure reproducible builds and avoid unexpected updates
- **Feedback Handling**: Fixing issues after feedback, updating guidelines, or addressing user clarifications is not considered a new task - it's part of the original task completion. All edits must stay on the same branch/PR to avoid scope creep. Never create separate task files for feedback responses.

### Project Standards:
- Maintain clean, readable code
- Document significant changes
- Follow semantic versioning
- Keep dependencies up to date
- Ensure responsive design for web interface
