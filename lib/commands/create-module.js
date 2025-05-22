const routes = require('../stubs/routes')
const store = require('../stubs/store')
const stylesMain = require('../stubs/stylesMain')
const loader = require('../stubs/loader')
const component = require('../stubs/component')
const {createDir, createFile, convertToCamelCase} = require('../utils')
const path = './src/modules'

module.exports = function(name, standalone){
    let formattedName = convertToCamelCase(name)
    return new Promise((resolve, reject) => {
        try {
            let module_base_path = `${path}/${formattedName}`
            createDir(module_base_path, () => {
                createDir(`${module_base_path}/components`, () => {})
                createDir(`${module_base_path}/views`, () => {})
                createDir(`${module_base_path}/styles`, () => {
                    createDir(`${module_base_path}/styles/components`, () => {})
                    createDir(`${module_base_path}/styles/views`, () => {})
                    createFile(`${module_base_path}/styles/main.scss`, stylesMain())
                })
                createFile(`${module_base_path}/routes.js`, routes())
                createFile(`${module_base_path}/services.js`, '')
                createFile(`${module_base_path}/store.js`, store(formattedName))
                if(standalone){
                    createFile(`${module_base_path}/${formattedName}.vue`, component(formattedName))
                    createFile(`${module_base_path}/${formattedName}Loader.js`, loader(formattedName))
                }
                resolve(console.log(`${formattedName} module created successfully.`))
            })
        } catch (error) {
            reject(error)
        }
    })
}