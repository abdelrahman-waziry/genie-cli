const fs = require('fs');
const path = require('path');

/**
 * Creates the React project directory structure
 */
function createReactProjectStructure(projectPath) {
    const directories = [
        'src',
        'src/components',
        'src/pages',
        'src/hooks',
        'src/store',
        'src/utils',
        'src/styles',
        'src/styles/abstract',
        'src/styles/base',
        'src/styles/components',
        'src/styles/layout',
        'src/test',
        'public'
    ];

    directories.forEach(dir => {
        const dirPath = path.join(projectPath, dir);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
    });
}

/**
 * Creates React project files
 */
function createReactProjectFiles(projectPath, projectName) {
    // Create package.json
    const packageJson = {
        name: projectName,
        version: '1.0.0',
        description: `${projectName} - A composable React project`,
        type: 'module',
        scripts: {
            dev: 'vite',
            build: 'vite build',
            preview: 'vite preview',
            test: 'vitest',
            lint: 'eslint . --ext .js,.jsx --fix'
        },
        dependencies: {
            react: '^18.2.0',
            'react-dom': '^18.2.0',
            'react-router-dom': '^6.16.0',
            zustand: '^4.4.1'
        },
        devDependencies: {
            '@vitejs/plugin-react': '^4.1.0',
            '@testing-library/react': '^14.0.0',
            '@testing-library/jest-dom': '^6.1.3',
            '@testing-library/user-event': '^14.5.1',
            vite: '^4.4.9',
            vitest: '^0.34.6',
            jsdom: '^22.1.0',
            sass: '^1.66.1',
            eslint: '^8.49.0',
            'eslint-plugin-react': '^7.33.2',
            'eslint-plugin-react-hooks': '^4.6.0'
        }
    };

    fs.writeFileSync(
        path.join(projectPath, 'package.json'),
        JSON.stringify(packageJson, null, 2)
    );

    // Create main.jsx
    const mainJsx = `import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles/main.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
`;
    fs.writeFileSync(path.join(projectPath, 'src/main.jsx'), mainJsx);

    // Create App.jsx
    const appJsx = `import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import './App.scss'

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
`;
    fs.writeFileSync(path.join(projectPath, 'src/App.jsx'), appJsx);

    // Create App.scss
    const appScss = `.app {
  min-height: 100vh;
}
`;
    fs.writeFileSync(path.join(projectPath, 'src/App.scss'), appScss);

    // Create Home page
    const homeJsx = `import { useState } from 'react'
import styles from './Home.module.scss'

export default function Home() {
  const [projectName] = useState('${projectName}')

  return (
    <div className={styles.home}>
      <h1>Welcome to {projectName}</h1>
      <p>Your composable React project is ready!</p>
      
      <div className={styles.info}>
        <h2>Getting Started</h2>
        <p>Create your first component:</p>
        <code>genie create-component Button</code>
        
        <h3>Features</h3>
        <ul>
          <li>✅ Composable architecture</li>
          <li>✅ Plug-and-play components</li>
          <li>✅ React 18 with hooks</li>
          <li>✅ Zustand state management</li>
          <li>✅ React Router 6</li>
          <li>✅ Vitest for testing</li>
          <li>✅ CSS Modules</li>
        </ul>
      </div>
    </div>
  )
}
`;
    fs.writeFileSync(path.join(projectPath, 'src/pages/Home.jsx'), homeJsx);

    // Create Home.module.scss
    const homeScss = `.home {
  max-width: 800px;
  margin: 60px auto;
  padding: 20px;
  text-align: center;

  h1 {
    color: #61dafb;
    margin-bottom: 20px;
  }

  .info {
    margin-top: 40px;
    padding: 20px;
    background: #f4f4f4;
    border-radius: 8px;
    text-align: left;

    code {
      display: block;
      margin: 10px 0;
      padding: 10px;
      background: #282c34;
      color: #61dafb;
      border-radius: 4px;
      font-family: 'Courier New', monospace;
    }

    ul {
      list-style: none;
      padding: 0;

      li {
        padding: 5px 0;
      }
    }
  }
}
`;
    fs.writeFileSync(path.join(projectPath, 'src/pages/Home.module.scss'), homeScss);

    // Create example hook
    const useCounterJs = `import { useState, useCallback } from 'react'

/**
 * useCounter Hook
 * Example of a reusable custom hook
 */
export function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue)

  const increment = useCallback(() => {
    setCount(c => c + 1)
  }, [])

  const decrement = useCallback(() => {
    setCount(c => c - 1)
  }, [])

  const reset = useCallback(() => {
    setCount(initialValue)
  }, [initialValue])

  return {
    count,
    increment,
    decrement,
    reset
  }
}
`;
    fs.writeFileSync(path.join(projectPath, 'src/hooks/useCounter.js'), useCounterJs);

    // Create example store
    const exampleStoreJs = `import { create } from 'zustand'

/**
 * Example Store
 * Using Zustand for state management
 */
export const useExampleStore = create((set, get) => ({
  // State
  items: [],
  loading: false,
  error: null,

  // Actions
  addItem: (item) => set((state) => ({
    items: [...state.items, item]
  })),

  removeItem: (id) => set((state) => ({
    items: state.items.filter(item => item.id !== id)
  })),

  clearItems: () => set({ items: [] }),

  setLoading: (loading) => set({ loading }),

  setError: (error) => set({ error }),

  // Async action example
  fetchItems: async () => {
    set({ loading: true, error: null })
    try {
      // const response = await fetch('/api/items')
      // const data = await response.json()
      // set({ items: data, loading: false })
    } catch (error) {
      set({ error: error.message, loading: false })
    }
  }
}))
`;
    fs.writeFileSync(path.join(projectPath, 'src/store/exampleStore.js'), exampleStoreJs);

    // Create HTTP utility
    const httpJs = `/**
 * HTTP utility for making API requests
 */
export const http = {
  async get(url, options = {}) {
    try {
      const response = await fetch(url, {
        method: 'GET',
        ...options
      });
      return await response.json();
    } catch (error) {
      console.error('HTTP GET Error:', error);
      throw error;
    }
  },

  async post(url, data, options = {}) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        body: JSON.stringify(data),
        ...options
      });
      return await response.json();
    } catch (error) {
      console.error('HTTP POST Error:', error);
      throw error;
    }
  },

  async put(url, data, options = {}) {
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        body: JSON.stringify(data),
        ...options
      });
      return await response.json();
    } catch (error) {
      console.error('HTTP PUT Error:', error);
      throw error;
    }
  },

  async delete(url, options = {}) {
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        ...options
      });
      return await response.json();
    } catch (error) {
      console.error('HTTP DELETE Error:', error);
      throw error;
    }
  }
};
`;
    fs.writeFileSync(path.join(projectPath, 'src/utils/http.js'), httpJs);

    // Create main.scss
    const mainScss = `// Abstract
@import './abstract/variables';
@import './abstract/mixins';

// Base
@import './base/reset';
@import './base/typography';

// Layout
@import './layout/header';
@import './layout/footer';

// Components
@import './components/buttons';
`;
    fs.writeFileSync(path.join(projectPath, 'src/styles/main.scss'), mainScss);

    // Create SCSS partials
    const scssFiles = {
        'abstract/_variables.scss': `// Colors
$primary-color: #61dafb;
$secondary-color: #282c34;
$text-color: #333;

// Spacing
$spacing-unit: 8px;

// Breakpoints
$breakpoint-mobile: 768px;
$breakpoint-tablet: 1024px;
$breakpoint-desktop: 1440px;
`,
        'abstract/_mixins.scss': `@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

@mixin responsive($breakpoint) {
  @media (max-width: $breakpoint) {
    @content;
  }
}
`,
        'base/_reset.scss': `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
  width: 100%;
}

#root {
  min-height: 100vh;
}
`,
        'base/_typography.scss': `body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: $text-color;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

h1, h2, h3, h4, h5, h6 {
  margin-bottom: $spacing-unit * 2;
}
`,
        'layout/_header.scss': `.header {
  padding: $spacing-unit * 2;
  background-color: $secondary-color;
  color: white;
}
`,
        'layout/_footer.scss': `.footer {
  padding: $spacing-unit * 2;
  background-color: $secondary-color;
  color: white;
  text-align: center;
}
`,
        'components/_buttons.scss': `.btn {
  padding: $spacing-unit $spacing-unit * 2;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 16px;

  &--primary {
    background-color: $primary-color;
    color: $secondary-color;

    &:hover {
      opacity: 0.9;
    }
  }
}
`
    };

    Object.entries(scssFiles).forEach(([file, content]) => {
        fs.writeFileSync(path.join(projectPath, 'src/styles', file), content);
    });

    // Create test setup
    const testSetup = `import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

expect.extend(matchers)

afterEach(() => {
  cleanup()
})
`;
    fs.writeFileSync(path.join(projectPath, 'src/test/setup.js'), testSetup);

    // Create vite.config.js
    const viteConfig = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  css: {
    modules: {
      localsConvention: 'camelCase'
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js'
  }
})
`;
    fs.writeFileSync(path.join(projectPath, 'vite.config.js'), viteConfig);

    // Create index.html
    const indexHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <link rel="icon" type="image/svg+xml" href="/vite.svg">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${projectName}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
`;
    fs.writeFileSync(path.join(projectPath, 'index.html'), indexHtml);

    // Create .gitignore
    const gitignore = `# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
`;
    fs.writeFileSync(path.join(projectPath, '.gitignore'), gitignore);

    // Create README.md
    const readme = `# ${projectName}

A composable React project created with Genie CLI.

## Project Structure

\`\`\`
${projectName}/
├── src/
│   ├── components/       # Reusable, plug-and-play components
│   ├── pages/            # Page components
│   ├── hooks/            # Custom React hooks
│   ├── store/            # Zustand stores
│   ├── utils/            # Utility functions
│   ├── styles/           # Global styles (SCSS)
│   ├── test/             # Test setup
│   ├── App.jsx
│   └── main.jsx
├── public/
├── index.html
├── vite.config.js
└── package.json
\`\`\`

## Component Structure

Each component is self-contained and plug-and-play:

\`\`\`
src/components/Button/
├── Button.jsx           # Component implementation
├── Button.module.scss   # Scoped styles (CSS Modules)
├── Button.test.jsx      # Component tests
└── index.js             # Export for clean imports
\`\`\`

## Development

\`\`\`bash
npm install
npm run dev
\`\`\`

## Testing

\`\`\`bash
npm run test
\`\`\`

## Creating Components

\`\`\`bash
# Create a component
genie create-component Button

# Create a page
genie create-component HomePage --view

# Create a custom hook
genie create-store useAuth

# Create a Zustand store
genie create-store User
\`\`\`

## Build for Production

\`\`\`bash
npm run build
\`\`\`

## Features

- ✅ **Composable Architecture** - Reusable hooks and components
- ✅ **Plug-and-Play Components** - Self-contained, easy to reuse
- ✅ **React 18** - Latest React with concurrent features
- ✅ **Zustand** - Simple state management
- ✅ **React Router 6** - Client-side routing
- ✅ **Vitest** - Fast unit testing
- ✅ **CSS Modules** - Scoped styling

Created with ❤️ using [Genie CLI](https://www.npmjs.com/package/genie-utils-cli)
`;
    fs.writeFileSync(path.join(projectPath, 'README.md'), readme);
}

module.exports = {
    createReactProjectStructure,
    createReactProjectFiles
};
