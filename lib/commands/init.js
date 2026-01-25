const chalk = require('chalk');
const inquirer = require('inquirer');
const shell = require('shelljs');
const ora = require('ora');
const fs = require('fs');
const path = require('path');
const { getDirectories } = require('../utils');

/**
 * Creates the project directory structure with composable architecture
 */
function createProjectStructure(projectPath) {
  const directories = [
    'src',
    'src/assets',
    'src/assets/fonts',
    'src/assets/images',
    'src/assets/sass',
    'src/assets/sass/abstract',
    'src/assets/sass/base',
    'src/assets/sass/components',
    'src/assets/sass/layout',
    'src/assets/sass/pages',
    'src/assets/sass/vendor',
    'src/components',
    'src/views',
    'src/composables',
    'src/stores',
    'src/router',
    'src/utils',
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
 * Creates initial project files with composable architecture
 */
function createProjectFiles(projectPath, projectName, projectType) {
  // Create package.json with testing dependencies
  const packageJson = {
    name: projectName,
    version: '1.0.0',
    description: `${projectName} - A composable Vue.js project`,
    main: 'src/main.js',
    scripts: {
      dev: 'vite',
      build: 'vite build',
      preview: 'vite preview',
      test: 'vitest',
      lint: 'eslint . --ext .vue,.js,.jsx,.cjs,.mjs --fix --ignore-path .gitignore'
    },
    dependencies: {
      vue: '^3.3.4',
      'vue-router': '^4.2.4',
      pinia: '^2.1.6'
    },
    devDependencies: {
      '@vitejs/plugin-vue': '^4.3.4',
      '@vue/test-utils': '^2.4.1',
      vite: '^4.4.9',
      vitest: '^0.34.6',
      sass: '^1.66.1',
      eslint: '^8.49.0',
      'eslint-plugin-vue': '^9.17.0'
    }
  };

  fs.writeFileSync(
    path.join(projectPath, 'package.json'),
    JSON.stringify(packageJson, null, 2)
  );

  // Create main.js with router
  const mainJs = `import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import './assets/sass/main.scss'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.mount('#app')
`;
  fs.writeFileSync(path.join(projectPath, 'src/main.js'), mainJs);

  // Create App.vue with router-view
  const appVue = `<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup>
// Main app component
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
`;
  fs.writeFileSync(path.join(projectPath, 'src/App.vue'), appVue);

  // Create router/index.js
  const routerIndex = `import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
`;
  fs.writeFileSync(path.join(projectPath, 'src/router/index.js'), routerIndex);

  // Create Home view
  const homeVue = `<template>
  <div class="home">
    <h1>Welcome to {{ projectName }}</h1>
    <p>Your composable Vue.js project is ready!</p>
    
    <div class="info">
      <h2>Getting Started</h2>
      <p>Create your first component:</p>
      <code>genie create-component Button</code>
      
      <h3>Features</h3>
      <ul>
        <li>✅ Composable architecture</li>
        <li>✅ Plug-and-play components</li>
        <li>✅ Vue 3 Composition API</li>
        <li>✅ Pinia state management</li>
        <li>✅ Vue Router 4</li>
        <li>✅ Vitest for testing</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const projectName = ref('${projectName}')
</script>

<style lang="scss" scoped>
.home {
  max-width: 800px;
  margin: 60px auto;
  padding: 20px;
  text-align: center;

  h1 {
    color: #42b983;
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
      background: #2c3e50;
      color: #42b983;
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
</style>
`;
  fs.writeFileSync(path.join(projectPath, 'src/views/Home.vue'), homeVue);

  // Create example composable
  const useCounterJs = `import { ref, computed } from 'vue'

/**
 * Composable for counter functionality
 * Example of reusable composition function
 */
export function useCounter(initialValue = 0) {
  const count = ref(initialValue)
  
  const doubleCount = computed(() => count.value * 2)
  
  function increment() {
    count.value++
  }
  
  function decrement() {
    count.value--
  }
  
  function reset() {
    count.value = initialValue
  }
  
  return {
    count,
    doubleCount,
    increment,
    decrement,
    reset
  }
}
`;
  fs.writeFileSync(path.join(projectPath, 'src/composables/useCounter.js'), useCounterJs);

  // Create example store
  const exampleStoreJs = `import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

/**
 * Example Store
 * Using Pinia with Composition API
 */
export const useExampleStore = defineStore('example', () => {
  // State
  const items = ref([])
  const loading = ref(false)

  // Getters
  const itemCount = computed(() => items.value.length)
  const hasItems = computed(() => items.value.length > 0)

  // Actions
  function addItem(item) {
    items.value.push(item)
  }

  function removeItem(id) {
    items.value = items.value.filter(item => item.id !== id)
  }

  function clearItems() {
    items.value = []
  }

  async function fetchItems() {
    loading.value = true
    try {
      // Fetch items from API
      // const response = await fetch('/api/items')
      // items.value = await response.json()
    } catch (error) {
      console.error('Failed to fetch items:', error)
    } finally {
      loading.value = false
    }
  }

  return {
    // State
    items,
    loading,
    // Getters
    itemCount,
    hasItems,
    // Actions
    addItem,
    removeItem,
    clearItems,
    fetchItems
  }
})
`;
  fs.writeFileSync(path.join(projectPath, 'src/stores/exampleStore.js'), exampleStoreJs);

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

// Pages
@import './pages/home';

// Vendor
// Import third-party styles here
`;
  fs.writeFileSync(path.join(projectPath, 'src/assets/sass/main.scss'), mainScss);

  // Create SCSS partials
  const scssFiles = {
    'abstract/_variables.scss': `// Colors
$primary-color: #42b983;
$secondary-color: #35495e;
$text-color: #2c3e50;

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
`,
    'base/_typography.scss': `body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: $text-color;
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

  &--primary {
    background-color: $primary-color;
    color: white;

    &:hover {
      opacity: 0.9;
    }
  }
}
`,
    'pages/_home.scss': `.home {
  padding: $spacing-unit * 4;
}
`
  };

  Object.entries(scssFiles).forEach(([file, content]) => {
    fs.writeFileSync(path.join(projectPath, 'src/assets/sass', file), content);
  });

  // Create vite.config.js
  const viteConfig = `import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: \`@import "@/assets/sass/abstract/variables"; @import "@/assets/sass/abstract/mixins";\`
      }
    }
  },
  test: {
    globals: true,
    environment: 'jsdom'
  }
})
`;
  fs.writeFileSync(path.join(projectPath, 'vite.config.js'), viteConfig);

  // Create index.html
  const indexHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <link rel="icon" href="/favicon.ico">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${projectName}</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
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
.DS_Store
dist
dist-ssr
coverage
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
`;
  fs.writeFileSync(path.join(projectPath, '.gitignore'), gitignore);

  // Create README.md
  const readme = `# ${projectName}

A composable Vue.js project created with Genie CLI.

## Project Structure

\`\`\`
${projectName}/
├── src/
│   ├── components/       # Reusable, plug-and-play components
│   ├── views/            # Page-level components
│   ├── composables/      # Reusable composition functions
│   ├── stores/           # Pinia stores
│   ├── router/           # Vue Router configuration
│   ├── utils/            # Utility functions
│   ├── assets/
│   │   └── sass/         # Global styles
│   ├── App.vue
│   └── main.js
├── public/
├── index.html
├── vite.config.js
└── package.json
\`\`\`

## Component Structure

Each component is self-contained and plug-and-play:

\`\`\`
src/components/Button/
├── Button.vue           # Component implementation
├── Button.spec.js       # Component tests
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

# Create a view
genie create-component HomePage --view

# Create a composable
genie create-module useAuth
\`\`\`

## Build for Production

\`\`\`bash
npm run build
\`\`\`

## Features

- ✅ **Composable Architecture** - Reusable composition functions
- ✅ **Plug-and-Play Components** - Self-contained, easy to reuse
- ✅ **Vue 3 Composition API** - Modern Vue development
- ✅ **Pinia** - Intuitive state management
- ✅ **Vue Router 4** - Client-side routing
- ✅ **Vitest** - Fast unit testing
- ✅ **SCSS** - Organized styling architecture

Created with ❤️ using [Genie CLI](https://www.npmjs.com/package/genie-utils-cli)
`;
  fs.writeFileSync(path.join(projectPath, 'README.md'), readme);
}

module.exports = function (name) {
  let dirs = getDirectories('./');
  for (let index = 0; index < dirs.length; index++) {
    const dir = dirs[index];
    if (dir === name) {
      console.log(chalk.red('Project with the same name is already created'));
      return false;
    }
  }

  const regex = /^(?:@[a-z0-9-*~][a-z0-9-*._~]*)?[a-z0-9-~][a-z0-9-._~]*$/;
  if (regex.test(name)) {
    inquirer.prompt([
      {
        type: 'rawlist',
        name: 'type',
        message: 'Please select project type',
        choices: ['Single Page App [SPA]', 'Integrated with CMS']
      }
    ]).then(answers => {
      console.log(chalk.bgBlue(`⌛ Your composable project is being initialized...`));

      const projectPath = path.join(process.cwd(), name);
      const structureLoading = ora(`📁 Creating composable project structure for ${name}`).start();

      try {
        // Create project directory
        if (!fs.existsSync(projectPath)) {
          fs.mkdirSync(projectPath);
        }

        // Create directory structure
        createProjectStructure(projectPath);
        structureLoading.succeed(`Created composable project structure for ${name}`);

        // Create project files
        const filesLoading = ora('📝 Creating project files').start();
        createProjectFiles(projectPath, name, answers.type);
        filesLoading.succeed('Created project files');

        // Install dependencies
        const installLoading = ora('📦 Installing required dependencies').start();
        shell.cd(name);
        shell.exec('npm install', { silent: true }, (code, stdout, stderr) => {
          if (code === 0) {
            installLoading.succeed('Installed required dependencies');
            console.log(chalk.green('🎉 Your composable project has been successfully initialized!'));
            console.log('');
            console.log('👉 Get started with the following commands:');
            console.log(chalk.blue(`  cd ${name}`));
            console.log(chalk.blue('  npm run dev'));
            console.log('');
            console.log('📦 Create your first component:');
            console.log(chalk.blue('  genie create-component Button'));
          } else {
            installLoading.fail('Failed to install dependencies');
            console.log(chalk.yellow('You can install dependencies manually by running:'));
            console.log(chalk.blue(`  cd ${name}`));
            console.log(chalk.blue('  npm install'));
          }
        });
      } catch (error) {
        structureLoading.fail('Failed to create project structure');
        console.error(chalk.red('Error:'), error.message);
      }
    });
  } else {
    console.log(chalk.yellow('Project name must match the following pattern "project-name"'));
    return false;
  }
};