# Contributing to Genie CLI

Thank you for your interest in contributing to Genie CLI! We welcome contributions from the community.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/genie-cli.git
   cd genie-cli
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Link the package** for local testing:
   ```bash
   npm link
   ```

## Development Workflow

1. **Create a new branch** for your feature or bugfix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** and test them thoroughly

3. **Test your changes** by running the CLI commands:
   ```bash
   genie --help
   genie init test-project
   ```

4. **Commit your changes** with a descriptive message:
   ```bash
   git commit -m "Add feature: description of your changes"
   ```

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request** on GitHub

## Code Style

- Use **2 spaces** for indentation
- Follow existing code patterns and conventions
- Keep functions small and focused
- Add comments for complex logic

## Commit Message Guidelines

- Use present tense ("Add feature" not "Added feature")
- Use imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters
- Reference issues and pull requests when relevant

## Adding New Commands

When adding a new command:

1. Create a new file in `lib/commands/`
2. Add the command to `index.js`
3. Update the README.md with usage examples
4. Create any necessary stub files in `lib/stubs/`

## Reporting Bugs

Please report bugs by creating an issue on GitHub. Include:

- Your operating system and Node.js version
- Steps to reproduce the issue
- Expected behavior
- Actual behavior
- Any error messages or logs

## Feature Requests

We welcome feature requests! Please create an issue on GitHub describing:

- The problem you're trying to solve
- Your proposed solution
- Any alternative solutions you've considered

## Questions?

Feel free to open an issue for any questions about contributing.

Thank you for contributing to Genie CLI! 🎉
