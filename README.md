# Genie CLI

[![npm version](https://img.shields.io/npm/v/genie-utils-cli.svg)](https://www.npmjs.com/package/genie-utils-cli)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/node/v/genie-utils-cli.svg)](https://nodejs.org)

A powerful, framework-agnostic CLI for automating development tasks and scaffolding modern web applications.

**Genie CLI** streamlines your workflow by automating repetitive tasks like generating components, stores, and entire projects. Now supporting **both Vue 3 and React** with a composable, plug-and-play architecture!

## ✨ Features

- 🎯 **Multi-Framework Support** - Vue 3 and React
- 🔌 **Plug-and-Play Components** - Self-contained with tests and clean imports
- 🪝 **Composable Architecture** - Hooks/Composables for reusable logic
- 🧪 **Built-in Testing** - Vitest integration with co-located tests
- 🎨 **Modern Styling** - SCSS with organized architecture (Vue) / CSS Modules (React)
- 📦 **Smart State Management** - Pinia for Vue, Zustand for React
- 🚀 **Fast Setup** - Production-ready projects in seconds

## 🚀 Installation

Install **Genie CLI** globally:

```bash
npm install -g genie-utils-cli
```

Verify installation:

```bash
genie version
# or
genie -v
```

## 🎯 Quick Start

### Create a New Project

```bash
# Initialize new project
genie init my-awesome-app

# Choose your framework
? Select framework › 
❯ Vue 3
  React

# Project ready!
cd my-awesome-app
npm run dev
```

### Create Components

```bash
# Create a component (auto-detects framework)
genie create-component Button

# Create a view/page
genie create-component HomePage --view

# Creates proper structure with tests and exports!
```

### Create Stores or Hooks

```bash
# Vue: Create a composable
genie create-store useAuth

# Vue: Create Pinia store
genie create-store User

# React: Create custom hook
genie create-store useAuth

# React: Create Zustand store
genie create-store Cart
```

---

## 📖 Available Commands

### 🚀 `init` | `i`

Initialize a new Vue or React project with a composable architecture.

```bash
genie init <project-name>
```

**What you get:**
- Framework selection (Vue 3 or React)
- Project type selection (SPA or CMS-integrated)
- Complete project structure
- Pre-configured build tools (Vite)
- Router setup (Vue Router / React Router)
- State management (Pinia / Zustand)
- Testing setup (Vitest)
- Example components and structures

**Example:**

```bash
genie init my-app
```

**Vue Project Structure:**
```
my-app/
├── src/
│   ├── components/       # Reusable components
│   ├── views/            # Page components
│   ├── composables/      # Vue composables
│   ├── stores/           # Pinia stores
│   ├── router/           # Vue Router
│   ├── utils/            # Utilities
│   └── assets/sass/      # SCSS styles
```

**React Project Structure:**
```
my-app/
├── src/
│   ├── components/       # Reusable components
│   ├── pages/            # Page components
│   ├── hooks/            # Custom React hooks
│   ├── store/            # Zustand stores
│   ├── utils/            # Utilities
│   └── styles/           # SCSS/CSS Modules
```

---

### 📦 `create-store` | `cs`

Generate stores or composables/hooks based on your framework and naming convention.

```bash
genie create-store <name>
```

**Smart Behavior:**

**Vue Projects:**
- Name starts with `use` → Creates composable in `src/composables/`
- Other names → Creates Pinia store in `src/stores/`

**React Projects:**
- Name starts with `use` → Creates custom hook in `src/hooks/`
- Other names → Creates Zustand store in `src/store/`

**Examples:**

```bash
# Vue - Create composable
genie create-store useAuth
# → src/composables/useAuth.js

# Vue - Create Pinia store
genie cs User
# → src/stores/UserStore.js

# React - Create custom hook
genie create-store useFetch
# → src/hooks/useFetch.js

# React - Create Zustand store
genie cs Cart
# → src/store/cartStore.js
```

---

### 🛠️ `create-component` | `cr`

Scaffold components with automatic framework detection.

```bash
genie create-component <name> [options]
```

**Options:**
- `-v, --view` - Creates a view (Vue) or page (React) component
- `-g, --global` - Creates a global component
- `-s, --standalone` - Generates standalone component with loader

**Component Structure:**

**Vue:**
```
src/components/Button/
├── Button.vue           # Component
├── Button.spec.js       # Test
└── index.js             # Export
```

**React:**
```
src/components/Button/
├── Button.jsx           # Component
├── Button.module.scss   # Scoped styles
├── Button.test.jsx      # Test
└── index.js             # Export
```

**Examples:**

```bash
# Create component
genie create-component Button

# Create view/page
genie cr HomePage --view

# Create global component
genie cr Navigation --global
```

**Clean Imports:**
```javascript
// Instead of this:
import Button from './components/Button/Button.vue'

// You get this:
import Button from '@/components/Button'
```

---

### 🧪 `create-test` | `ct`

Generate test files for your components.

```bash
genie create-test <name>
```

**Features:**
- Framework-aware (Vitest + Testing Library)
- Co-located with components
- Or standalone in `tests/` folder

**Examples:**

```bash
# Interactive mode
genie create-test UserCard

# Choose:
# - Component test (co-located)
# - Standalone test (in tests/)
```

---

### 🔧 `add-config` | `ac`

Add Rollup configuration files to your project.

```bash
genie add-config
```

---

### 📝 `add-linting` | `lint`

Add ESLint configuration to an existing project.

```bash
genie add-linting
```

---

### 📤 `extract-module` | `ext`

Extract a module for distribution.

```bash
genie extract-module
```

---

## 🎨 Framework-Specific Features

### Vue 3 Features

- ✅ **Composition API** - Modern Vue development
- ✅ **Pinia** - Intuitive state management
- ✅ **Vue Router 4** - Client-side routing
- ✅ **SCSS** - Organized 7-1 architecture
- ✅ **Composables** - Reusable composition functions

**Example Composable:**
```javascript
// src/composables/useCounter.js
import { ref, computed } from 'vue'

export function useCounter(initialValue = 0) {
  const count = ref(initialValue)
  const doubleCount = computed(() => count.value * 2)
  
  function increment() {
    count.value++
  }
  
  return { count, doubleCount, increment }
}
```

### React Features

- ✅ **React 18** - Latest React with concurrent features
- ✅ **Zustand** - Simple, flexible state management
- ✅ **React Router 6** - Declarative routing
- ✅ **CSS Modules** - Scoped component styling
- ✅ **Custom Hooks** - Reusable stateful logic

**Example Hook:**
```javascript
// src/hooks/useCounter.js
import { useState, useCallback } from 'react'

export function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue)
  
  const increment = useCallback(() => {
    setCount(c => c + 1)
  }, [])
  
  return { count, increment }
}
```

---

## 🔍 Framework Auto-Detection

Genie CLI automatically detects your project's framework by checking `package.json` dependencies:

- Has `vue` → Vue project
- Has `react` → React project
- Neither → Prompts for framework choice

This means commands like `create-component` and `create-store` automatically generate the correct file types!

---

## 💡 Examples

### Complete Vue Project Setup

```bash
# 1. Create project
genie init my-vue-app

# 2. Select Vue 3
# 3. Select SPA

cd my-vue-app
npm run dev

# 4. Create components
genie create-component Button
genie create-component UserCard

# 5. Create composables
genie create-store useAuth
genie create-store useFetch

# 6. Create Pinia stores
genie create-store User
genie create-store Products

# 7. Run tests
npm test
```

### Complete React Project Setup

```bash
# 1. Create project
genie init my-react-app

# 2. Select React
# 3. Select SPA

cd my-react-app
npm run dev

# 4. Create components
genie create-component Button
genie create-component UserCard

# 5. Create custom hooks
genie create-store useAuth
genie create-store useFetch

# 6. Create Zustand stores
genie create-store User
genie create-store Cart

# 7. Run tests
npm test
```

---

## 🏗️ Project Architecture

### Composable, Plug-and-Play Philosophy

Every component is **self-contained** and **easy to reuse**:

```
Component/
├── Component.vue/.jsx    # Implementation
├── Component.spec.js     # Tests
├── Component.module.scss # Styles (React only)
└── index.js              # Clean export
```

**Benefits:**
- **Portable** - Copy/paste components between projects
- **Testable** - Tests live next to components
- **Maintainable** - Everything in one place
- **Clean imports** - No deep path hell

---

## 🛠️ Configuration

### Vite Configuration

All projects come pre-configured with:
- **Path aliases**: `@/` points to `src/`
- **CSS preprocessing**: SCSS support
- **Testing**: Vitest integration
- **Framework plugins**: Vue or React

### Supported Node Versions

- Node.js >= 10.0.0

---

## 📚 Documentation

### Command Reference

| Command | Alias | Description |
|---------|-------|-------------|
| `init` | `i` | Initialize new project |
| `create-component` | `cr` | Create component |
| `create-store` | `cs` | Create store/hook |
| `create-test` | `ct` | Create test file |
| `add-config` | `ac` | Add Rollup config |
| `add-linting` | `lint` | Add ESLint config |
| `extract-module` | `ext` | Extract module |
| `version` | `v` | Show version |

### Framework Support

| Framework | Version | Status |
|-----------|---------|--------|
| Vue 3 | ^3.3.4 | ✅ Fully Supported |
| React | ^18.2.0 | ✅ Fully Supported |
| Svelte | - | 🔜 Coming Soon |
| Angular | - | 🔜 Planned |

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

```bash
# Clone the repo
git clone https://github.com/abdelrahman-waziry/genie-cli.git
cd genie-cli

# Install dependencies
npm install

# Link locally for testing
npm link

# Test your changes
genie init test-project
```

---

## 📝 Changelog

See [CHANGELOG.md](CHANGELOG.md) for a list of changes.

---

## 📄 License

MIT © [Abdelrahman Mohsen](https://github.com/abdelrahman-waziry)

---

## 🙏 Acknowledgments

Built with:
- [Inquirer](https://github.com/SBoudrias/Inquirer.js) - Interactive CLI
- [Chalk](https://github.com/chalk/chalk) - Terminal styling
- [Ora](https://github.com/sindresorhus/ora) - Loading spinners
- [Commander](https://github.com/tj/commander.js) - CLI framework

---

## 🔗 Links

- [npm Package](https://www.npmjs.com/package/genie-utils-cli)
- [GitHub Repository](https://github.com/abdelrahman-waziry/genie-cli)
- [Issue Tracker](https://github.com/abdelrahman-waziry/genie-cli/issues)

---

## ⭐ Support

If you find Genie CLI helpful, please consider:
- ⭐ Starring the repo
- 🐛 Reporting bugs
- 💡 Suggesting features
- 🤝 Contributing code

---
