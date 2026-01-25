const componentStub = require('../stubs/component')
const inquirer = require('inquirer')
const createModule = require('../commands/create-module')
const { createFile, getDirectories, createDir, convertToCamelCase } = require('../utils')
const loader = require('../stubs/loader')
var path = './src/modules'

module.exports = {
  createComponent: function (name, isView, isStandalone, isGlobal) {
    let formmatedName = convertToCamelCase(name)
    var template = componentStub(formmatedName)
    var loaderTemplate = loader(formmatedName)
    if (!isGlobal) {
      inquirer.prompt([
        { type: 'rawlist', name: 'module', message: 'select a module', choices: getDirectories('./src/modules').concat('Create new module...') }
      ]).then((answers) => {
        if (answers.module === 'Create new module...') {
          inquirer.prompt([
            { type: 'input', name: 'new_module', message: 'Enter new module name' }
          ]).then((answers) => {
            createModule(answers.new_module, false).then(() => {
              createDir(`${path}/${answers.new_module}/${isView ? 'views' : 'components'}/${formmatedName}`, () => {
                let componentPath = `${path}/${answers.new_module}/${isView ? 'views' : 'components'}/${formmatedName}/${formmatedName}.vue`
                if (isStandalone) {
                  let loaderPath = `${path}/${answers.new_module}/${isView ? 'views' : 'components'}/${formmatedName}/${formmatedName}Loader.js`
                  createFile(loaderPath, loaderTemplate)
                }
                createFile(componentPath, template)
                console.log(`${formmatedName} component created successfully.`)
              })
            })
          })
        }
        else {
          createDir(`${path}/${answers.module}/${isView ? 'views' : 'components'}/${formmatedName}`, () => {
            let componentPath = `${path}/${answers.module}/${isView ? 'views' : 'components'}/${formmatedName}/${formmatedName}.vue`
            if (isStandalone) {
              let loaderPath = `${path}/${answers.module}/${isView ? 'views' : 'components'}/${formmatedName}/${formmatedName}Loader.js`
              createFile(loaderPath, loaderTemplate)
            }
            createFile(componentPath, template)
            console.log(`${formmatedName} component created successfully.`)
          })
        }
      })
    } else {
      path = isView ? './src/views' : './src/components'
      createDir(`${path}/${formmatedName}`, () => {
        let componentPath = `${path}/${formmatedName}/${formmatedName}.vue`
        if (isStandalone) {
          let loaderPath = `${path}/${formmatedName}/${formmatedName}Loader.js`
          createFile(loaderPath, loaderTemplate)
        }
        createFile(componentPath, template)
        console.log(`${formmatedName} component created successfully.`)
      })
    }
  }
}