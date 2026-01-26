const chalk = require('chalk');
const inquirer = require('inquirer');
const shell = require('shelljs');
const ora = require('ora');
const fs = require('fs');
const path = require('path');
const { getDirectories } = require('../utils');
const { createReactProjectStructure, createReactProjectFiles } = require('./init-react');

// Import Vue init functions
const initVue = require('./init-vue');

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
                type: 'list',
                name: 'framework',
                message: 'Select framework',
                choices: ['Vue 3', 'React']
            },
            {
                type: 'rawlist',
                name: 'type',
                message: 'Please select project type',
                choices: ['Single Page App [SPA]', 'Integrated with CMS']
            }
        ]).then(answers => {
            const framework = answers.framework === 'Vue 3' ? 'vue' : 'react';
            const frameworkName = answers.framework;

            if (framework === 'vue') {
                // Use the original Vue init logic
                console.log(chalk.bgBlue(`⌛ Your ${frameworkName} project is being initialized...`));

                const projectPath = path.join(process.cwd(), name);
                const structureLoading = ora(`📁 Creating ${frameworkName} project structure for ${name}`).start();

                try {
                    if (!fs.existsSync(projectPath)) {
                        fs.mkdirSync(projectPath);
                    }

                    // Call Vue init (it's exported as a module with functions)
                    const vueInit = require('./init-vue');
                    const { createProjectStructure, createProjectFiles } = vueInit;

                    createProjectStructure(projectPath);
                    structureLoading.succeed(`Created Vue project structure for ${name}`);

                    const filesLoading = ora('📝 Creating Vue project files').start();
                    createProjectFiles(projectPath, name, answers.type);
                    filesLoading.succeed('Created Vue project files');

                    const installLoading = ora('📦 Installing required dependencies').start();
                    shell.cd(name);
                    shell.exec('npm install', { silent: true }, (code, stdout, stderr) => {
                        if (code === 0) {
                            installLoading.succeed('Installed required dependencies');
                            console.log(chalk.green(`🎉 Your ${frameworkName} project has been successfully initialized!`));
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
            } else {
                // React initialization
                console.log(chalk.bgBlue(`⌛ Your ${frameworkName} project is being initialized...`));

                const projectPath = path.join(process.cwd(), name);
                const structureLoading = ora(`📁 Creating ${frameworkName} project structure for ${name}`).start();

                try {
                    if (!fs.existsSync(projectPath)) {
                        fs.mkdirSync(projectPath);
                    }

                    createReactProjectStructure(projectPath);
                    structureLoading.succeed(`Created React project structure for ${name}`);

                    const filesLoading = ora('📝 Creating React project files').start();
                    createReactProjectFiles(projectPath, name);
                    filesLoading.succeed('Created React project files');

                    const installLoading = ora('📦 Installing required dependencies').start();
                    shell.cd(name);
                    shell.exec('npm install', { silent: true }, (code, stdout, stderr) => {
                        if (code === 0) {
                            installLoading.succeed('Installed required dependencies');
                            console.log(chalk.green(`🎉 Your ${frameworkName} project has been successfully initialized!`));
                            console.log('');
                            console.log('👉 Get started with the following commands:');
                            console.log(chalk.blue(`  cd ${name}`));
                            console.log(chalk.blue('  npm run dev'));
                            console.log('');
                            console.log('📦 Create your first component:');
                            console.log(chalk.blue('  genie create-component Button'));
                            console.log('');
                            console.log('🪝 Create a custom hook:');
                            console.log(chalk.blue('  genie create-store useAuth'));
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
            }
        });
    } else {
        console.log(chalk.yellow('Project name must match the following pattern "project-name"'));
        return false;
    }
};
