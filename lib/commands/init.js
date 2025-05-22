const chalk = require('chalk');
const inquirer = require('inquirer')
const shell = require('shelljs')
const ora = require('ora');
const cmd = require('node-cmd');
const { getDirectories } = require('../utils');

module.exports = function(name){
    let dirs = getDirectories('./')
    for (let index = 0; index < dirs.length; index++) {
        const dir = dirs[index];
        if(dir === name){
            console.log(chalk.red('Project with the same name is already created'));
            return false;
        }
    }
    const regex = /^(?:@[a-z0-9-*~][a-z0-9-*._~]*)?[a-z0-9-~][a-z0-9-._~]*$/
    if(regex.test(name)){
        inquirer.prompt([
            {type: 'rawlist', name: 'type', message: 'Please select project type', choices: ['Single Page App [SPA]', 'Integrated with CMS']}
        ]).then(answers => {
            console.log(chalk.bgBlue(`⌛ Your project is being initialized, that might take a couple of minutes.`))
            const cloneLoading = ora(`🚚 Cloning project into ${name}`).start()
            shell.exec(`git clone https://turndigital.visualstudio.com/FE%20Starter%20Kit/_git/FE%20Starter%20Kit ${name}`, {silent: true}, (code, stdout, stderr) => {
                cloneLoading.succeed(`Cloned project into ${name}`)
                shell.cd(name)
                if(answers.type === 'Single Page App [SPA]'){
                    shell.exec('git fetch && git checkout spa', {silent: true})
                } else if(answers.type === 'Integrated with CMS'){
                    shell.exec('git fetch && git checkout cms', {silent: true})
                } 
                // else {
                //     shell.exec('git fetch && git checkout vue_packages/template', {silent: true})
                // }
                shell.exec(`node -e "let pkg=require('./package.json'); pkg.name='${name}'; require('fs').writeFileSync('package.json', JSON.stringify(pkg, null, 2));"`)
                const installLoading = ora('📦 Installing required dependencies').start()
                shell.exec('npm cache clean --force')
                shell.exec('npm install &>/dev/null', {}, () => {
                    installLoading.succeed('Installed required dependencies')
                    console.log(chalk.green('🎉 Your project has been successfully initialized!'))
                    
                    try {
                        cmd.run('del /F /S /Q /A .git')
                        cmd.run('rmdir .git')
                    } catch (error) {
                        console.log('failed to delete .git, please run your command line as administrator')
                    }
                    console.log('👉 Get started with the following command:')
                    console.log(chalk.blue(`$ cd ${name}`))
                })
            })
        })
    }
    else {
        console.log(chalk.yellow('Project name must match the following pattern "project-name"'));
        return false;
    }
}