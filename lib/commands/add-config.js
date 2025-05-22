const rollupStub = require("../stubs/rollup.stub")
const { createFile } = require("../utils")
const shell = require('shelljs');
const chalk = require('chalk');
const ora = require('ora');

module.exports = function(){
    let npmInstallCommand = `npm i -D rollup rollup-plugin-vue rollup-plugin-peer-deps-external`
    console.log(chalk.bgBlue(`Installing required packages for rollup`))
    const installLoader = ora(`Installing dependencies`).start()
    shell.exec(npmInstallCommand, {}, (code, stdout, stderr) => {
        installLoader.stop();
        createFile(__dirname, rollupStub())
        console.log(chalk.green('Configs added successfully'))
    })
}