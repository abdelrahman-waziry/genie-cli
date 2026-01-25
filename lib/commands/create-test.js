const inquirer = require('inquirer')
const testCaseTemplate = require('../stubs/test')
const { createDir, createFile, convertToCamelCase, getDirectories } = require('../utils')
const path = './tests'

module.exports = function (name) {
    let formattedName = convertToCamelCase(name)
    return new Promise((_resolve, reject) => {
        try {
            inquirer.prompt([
                { type: 'rawlist', name: 'module', message: 'select a module for the test case', choices: getDirectories('./src/modules') }
            ]).then((answers) => {
                let module_base_path = `${path}/${answers.module}`
                createDir(module_base_path, () => {
                    createFile(`${module_base_path}/${formattedName}.spec.js`, testCaseTemplate(formattedName))
                    console.log(`${formattedName} test case created successfully.`)
                })
            })
        } catch (error) {
            reject(error)
        }
    })
}
