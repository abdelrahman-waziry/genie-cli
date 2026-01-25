# Genie CLI

[![npm version](https://img.shields.io/npm/v/genie-utils-cli.svg)](https://www.npmjs.com/package/genie-utils-cli)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/node/v/genie-utils-cli.svg)](https://nodejs.org)

A powerful command-line interface for automating common development tasks, such as generating new projects, creating modules, and scaffolding components with ease.

**Genie CLI** streamlines your workflow by automating repetitive tasks like generating components, modules, and entire projects. Whether you're starting a new project or adding reusable components, Genie makes it fast and easy.

## 🚀 Installation

To install **Genie CLI** globally, run the following command:

```bash
npm install -g genie-utils-cli
```

Verify the installation:

```bash
genie --version
```

## 📖 Available Commands

### 🚀 `init` | `i`
Initialize a new project with a basic setup.

```bash
genie init my-awesome-project
```

This command creates a new project directory with the necessary files and structure to get you started quickly.

**Example:**
```bash
$ genie init my-app
✨ Initializing project: my-app
✅ Project created successfully!
```

---

### 📦 `create-module` | `cm`
Generate a new module for your application.

```bash
genie create-module <name> [options]
```

**Options:**
- `-s, --standalone` - Creates a loader to allow extracting module
- `-h, --help` - Show usage information

**Examples:**
```bash
# Create a standard module
genie create-module UserManagement

# Create a standalone module
genie cm PaymentModule --standalone
```

---

### 🛠️ `create-component` | `cr`
Scaffold a new component for your project.

```bash
genie create-component <name> [options]
```

**Options:**
- `-v, --view` - Creates a new view component
- `-g, --global` - Create a global component
- `-s, --standalone` - Generates a standalone component (with loader for extraction)
- `-h, --help` - Show usage information

**Examples:**
```bash
# Create a standard component
genie create-component Button

# Create a view component
genie cr HomePage --view

# Create a global standalone component
genie cr Navigation --global --standalone
```

---

### 🧪 `create-test` | `ct`
Generate a new test case for your components or modules.

```bash
genie create-test <name>
```

**Example:**
```bash
genie create-test UserService
```

---

### ⚙️ `add-config` | `ac`
Add Rollup configuration files to your project's root directory.

```bash
genie add-config
```

This command sets up build configurations for bundling your modules.

---

### 📤 `extract-module` | `ext`
Extract a module from your project for reuse in other projects.

```bash
genie extract-module
```

This interactive command guides you through extracting a standalone module.

---

### 🔍 `add-linting` | `lint`
Add a set of ESLint rules to an existing project.

```bash
genie add-linting
```

Quickly set up code quality tools with predefined ESLint configurations.

---

### 🔢 `version` | `v`
Display the current version of **Genie CLI**.

```bash
genie version
```

## ✨ Features

- **⚡ Fast Scaffolding**: Quickly generate projects, modules, and components
- **🎯 Modular Design**: Add only the components or modules you need
- **📦 Standalone Support**: Create standalone components or modules for easier extraction and reusability
- **🔧 Flexible Configuration**: Customize your workflow with various command options
- **🎨 Interactive CLI**: Beautiful, user-friendly command-line interface with progress indicators

## 🎯 Why Genie CLI?

Traditional project setup and component generation can be time-consuming and repetitive. **Genie CLI** eliminates this friction by:

- **Saving Time**: Automate boilerplate code generation
- **Ensuring Consistency**: Maintain consistent project structure across your codebase
- **Boosting Productivity**: Focus on building features, not setting up files
- **Reducing Errors**: Use tested templates instead of manual file creation

## 🔮 Roadmap

### 🚧 Coming Soon!

We're actively working on expanding **Genie CLI** with support for multiple frameworks:

- ⚛️ React templates and components
- 🅰️ Angular modules and services
- 💚 Vue.js components and composables
- 🎭 Svelte components
- 📱 React Native components

Stay tuned for updates!

## 🤝 Contributing

We welcome contributions from the community! Please read our [Contributing Guidelines](./CONTRIBUTING.md) to get started.

## 📝 Changelog

See [CHANGELOG.md](./CHANGELOG.md) for a detailed history of changes.

## 🐛 Issues & Support

Found a bug or have a feature request? Please [open an issue](https://github.com/abdelrahman-waziry/genie-cli/issues) on GitHub.

## 📄 License

MIT License. See [LICENSE](./LICENSE) for details.

## 👨‍💻 Author

**Abdelrahman Waziry**

- GitHub: [@abdelrahman-waziry](https://github.com/abdelrahman-waziry)

---

Made with ❤️ by developers, for developers.

