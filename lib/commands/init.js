const chalk = require('chalk');
const inquirer = require('inquirer');
const shell = require('shelljs');
const ora = require('ora');
const fs = require('fs');
const path = require('path');
const { getDirectories } = require('../utils');

/**
 * Creates the project directory structure
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
        'src/stores',
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
 * Creates initial project files
 */
function createProjectFiles(projectPath, projectName, projectType) {
    // Create package.json
    const packageJson = {
        name: projectName,
        version: '1.0.0',
        description: `${projectName} - A Vue.js project`,
        main: 'src/main.js',
        scripts: {
            dev: 'vite',
            build: 'vite build',
            preview: 'vite preview',
            lint: 'eslint . --ext .vue,.js,.jsx,.cjs,.mjs --fix --ignore-path .gitignore'
        },
        dependencies: {
            vue: '^3.3.4',
            'vue-router': '^4.2.4',
            pinia: '^2.1.6'
        },
        devDependencies: {
            '@vitejs/plugin-vue': '^4.3.4',
            vite: '^4.4.9',
            sass: '^1.66.1',
            eslint: '^8.49.0',
            'eslint-plugin-vue': '^9.17.0'
        }
    };

    fs.writeFileSync(
        path.join(projectPath, 'package.json'),
        JSON.stringify(packageJson, null, 2)
    );

    // Create main.js
    const mainJs = `import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './assets/sass/main.scss'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.mount('#app')
`;
    fs.writeFileSync(path.join(projectPath, 'src/main.js'), mainJs);

    // Create App.vue
    const appVue = `<template>
  <div id="app">
    <h1>Welcome to {{ projectName }}</h1>
    <p>Your Vue.js project is ready!</p>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      projectName: '${projectName}'
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
`;
    fs.writeFileSync(path.join(projectPath, 'src/App.vue'), appVue);

    // Create http.js utility
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

A Vue.js project created with Genie CLI.

## Project Setup

\`\`\`bash
npm install
\`\`\`

### Development

\`\`\`bash
npm run dev
\`\`\`

### Build for Production

\`\`\`bash
npm run build
\`\`\`

### Preview Production Build

\`\`\`bash
npm run preview
\`\`\`

## Project Structure

\`\`\`
${projectName}/
├── src/
│   ├── assets/
│   │   ├── fonts/
│   │   ├── images/
│   │   └── sass/
│   │       ├── abstract/
│   │       ├── base/
│   │       ├── components/
│   │       ├── layout/
│   │       ├── pages/
│   │       ├── vendor/
│   │       └── main.scss
│   ├── components/
│   ├── views/
│   ├── stores/
│   ├── utils/
│   │   └── http.js
│   ├── App.vue
│   └── main.js
├── public/
├── index.html
├── vite.config.js
└── package.json
\`\`\`

## Features

- Vue 3 with Composition API
- Vite for fast development and building
- Pinia for state management
- SCSS with organized architecture
- HTTP utility for API requests

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
            console.log(chalk.bgBlue(`⌛ Your project is being initialized...`));

            const projectPath = path.join(process.cwd(), name);
            const structureLoading = ora(`📁 Creating project structure for ${name}`).start();

            try {
                // Create project directory
                if (!fs.existsSync(projectPath)) {
                    fs.mkdirSync(projectPath);
                }

                // Create directory structure
                createProjectStructure(projectPath);
                structureLoading.succeed(`Created project structure for ${name}`);

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
                        console.log(chalk.green('🎉 Your project has been successfully initialized!'));
                        console.log('');
                        console.log('👉 Get started with the following commands:');
                        console.log(chalk.blue(`  cd ${name}`));
                        console.log(chalk.blue('  npm run dev'));
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