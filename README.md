# MonotonicID Decoder

A web application for decoding and analyzing timestamp-based monotonic identifiers. This utility site provides tools similar to urldecoder.org, jwt.io, and epochconverter.com, specifically focused on monotonic ID formats.

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd monotonicid

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```

## 📁 Project Structure

This is a pnpm monorepo with the following structure:

```
/
├── .junie/                 # Junie configuration and guidelines
├── tasks/                  # Task management directory
│   └── README.md          # Points to individual task files
├── packages/              # Monorepo packages
│   └── web/              # Main web application
│       ├── src/          # Source code
│       ├── public/       # Static assets
│       └── dist/         # Build output
├── package.json          # Root workspace configuration
├── pnpm-workspace.yaml   # Workspace definition
└── README.md            # This file
```

## 🛠️ Technology Stack

- **Package Manager**: pnpm with workspace support
- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite 4
- **Styling**: CSS with dark/light theme support
- **Linting**: ESLint with TypeScript and React rules
- **Testing**: Vitest (configured)

## 📋 Available Scripts

From the root directory:

```bash
# Development
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm test         # Run tests
pnpm lint         # Run linter

# Package management
pnpm install      # Install all dependencies
pnpm clean        # Clean node_modules and build artifacts
```

## 🎯 Features

- **Monotonic ID Decoding**: Decode timestamp-based monotonic identifiers
- **Responsive Design**: Works on desktop and mobile devices
- **Dark/Light Theme**: Automatic theme switching based on system preference
- **Modern UI**: Clean, utility-focused interface
- **TypeScript**: Full type safety throughout the application

## 🏗️ Development

### Project Guidelines

- Follow modern web development best practices
- Maintain clean, readable code
- Use semantic versioning
- Keep dependencies up to date
- Ensure responsive design

### Task Management

All tasks are managed in the `tasks/` directory:
- Each task has its own `.md` file with detailed specifications
- The `tasks/README.md` serves as an index
- Create separate branches for individual tasks

### Monorepo Structure

The project uses pnpm workspaces for monorepo management:
- Currently contains a single `web` package
- Easily expandable for additional packages in the future
- Shared dependencies are hoisted to the root

## 🚀 Deployment

The application builds to static files and can be deployed to any static hosting service:

```bash
pnpm build
# Deploy the packages/web/dist/ directory
```

## 📝 License

MIT

## 🤝 Contributing

1. Create a new branch for your task
2. Follow the existing code style and conventions
3. Add tests for new functionality
4. Update documentation as needed
5. Submit a pull request

## 📞 Support

For issues and questions, please use the project's issue tracker.

---

**Note**: This project is designed to be monetized with advertisements and serves as a utility for developers working with monotonic identifiers.
