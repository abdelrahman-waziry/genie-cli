const lintRulesStub = require("../stubs/lint-rules.stub")
const { createFile } = require("../utils")
const shell = require('shelljs');
const chalk = require('chalk');
const ora = require('ora');
const { dirname } = require('path');
const appDir = dirname(require.main.filename);

module.exports = function(){
    let npmInstallCommand = `npm install --save-dev eslint`
    console.log(chalk.bgBlue(`Installing required packages for eslint`))
    const installLoader = ora(`Installing dependencies`).start()
    shell.exec(npmInstallCommand, {}, (code, stdout, stderr) => {
        installLoader.stop();
        createFile(`${appDir}/.eslintrc.js`, lintRulesStub())
        console.log(chalk.green('ESLint Rules added successfully'))
    })
}