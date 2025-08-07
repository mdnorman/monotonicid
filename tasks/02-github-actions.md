# Task 02: GitHub Actions for Pull Requests

## Overview
Add a GitHub Actions workflow that runs on pull requests to ensure code quality and build integrity.

## Requirements
- Trigger on pull request events (opened, synchronize, reopened)
- Use pnpm as the package manager
- Install dependencies
- Run linting checks
- Run tests
- Build the project
- Support Node.js >=18.0.0 as specified in package.json

## Implementation Details
- Create `.github/workflows/pr.yml` workflow file
- Use specific dependency versions (no ^ or ~ prefixes) as per guidelines
- Pin GitHub Actions versions and Node.js versions for reproducible builds
- Configure tests to run once and exit (not in watch mode) for CI/CD compatibility
- Follow modern web development best practices

## Acceptance Criteria
- [x] GitHub Actions workflow file created
- [x] Workflow triggers on pull request events
- [x] All steps (install, lint, test, build) execute successfully
- [x] Workflow uses pnpm package manager
- [x] Tests run in CI mode (non-watch)

## Status
- **Created**: 2025-08-07 13:28
- **Completed**: 2025-08-07 13:29
- **Status**: Completed
