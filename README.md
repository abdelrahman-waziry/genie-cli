# Genie CLI

A powerful command-line interface for automating common development tasks, such as generating new projects, creating modules, and scaffolding components with ease.

## Installation

To install **Genie CLI** globally, run the following command:

```bash
npm install -g genie-utils-cli --save
```

## Available Commands

### 🛠️ `create-component` | `cr`
Scaffold a new component for your project.

```bash
Usage: genie create-component|cr [options] <name>

Creates a new component in your project.

Options:
  -v, --view        Creates a new view component
  -h, --help        Show usage information
  -g, --global      Create a global component
  -s, --standalone  Generates a standalone component (with loader for extraction)
```

### 📦 `create-module` | `cm`
Generate a new module for your application.

```bash
Usage: genie create-module|cm [options] <name>

Creates a new module to structure your codebase.

Options:
  -h, --help        Show usage information
  -s, --standalone  Generates a standalone module (with loader for extraction)
```

### 🔢 `version` | `v`
Display the current version of **Genie CLI**.

```bash
Usage: genie version|v [options]

Show the current version of Genie CLI.

Options:
  -h, --help        Show usage information
```

### 🚀 `init` | `i`
Initialize a new project with a basic setup.

```bash
Usage: genie init|i [options] <name>

Sets up a new project with the necessary files and structure.

Options:
  -h, --help        Show usage information
```

## Why Genie CLI?

**Genie CLI** streamlines your workflow by automating repetitive tasks like generating components, modules, and entire projects. Whether you're starting a new project or adding reusable components, Genie makes it fast and easy.

### 🚧 **Support for Multiple Frameworks** (Coming Soon!)
Currently, **Genie CLI** is focused on a basic setup, but we're working on adding support for multiple frameworks like React, Angular, Vue, and others.

## Features

- **Scaffolding made easy**: Quickly generate projects, modules, and components.
- **Modular**: Add only the components or modules you need.
- **Standalone**: Create standalone components or modules for easier extraction and reusability.

## License

MIT License. See [LICENSE](./LICENSE) for details.
