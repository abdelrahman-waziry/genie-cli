const componentStub = require('../stubs/component')
const { createFile, createDir, convertToCamelCase } = require('../utils')
const loader = require('../stubs/loader')
const testStub = require('../stubs/test')

module.exports = {
  createComponent: function (name, isView, isStandalone, isGlobal) {
    let formattedName = convertToCamelCase(name)
    var template = componentStub(formattedName)
    var loaderTemplate = loader(formattedName)
    var testTemplate = testStub(formattedName)

    // Determine the path based on whether it's a view or component
    const basePath = isView ? './src/views' : './src/components'

    // Create the component directory
    createDir(`${basePath}/${formattedName}`, () => {
      let componentPath = `${basePath}/${formattedName}/${formattedName}.vue`
      let testPath = `${basePath}/${formattedName}/${formattedName}.spec.js`
      let indexPath = `${basePath}/${formattedName}/index.js`

      // Create the component file
      createFile(componentPath, template)

      // Create the test file
      createFile(testPath, testTemplate)

      // Create index.js for clean imports
      const indexContent = `export { default } from './${formattedName}.vue'\n`
      createFile(indexPath, indexContent)

      // Create loader if standalone
      if (isStandalone) {
        let loaderPath = `${basePath}/${formattedName}/${formattedName}Loader.js`
        createFile(loaderPath, loaderTemplate)
      }

      console.log(`✅ ${formattedName} ${isView ? 'view' : 'component'} created successfully!`)
      console.log(`📁 Location: ${componentPath}`)
      console.log(`🧪 Test: ${testPath}`)
      console.log(`📦 Import: import ${formattedName} from '@/${isView ? 'views' : 'components'}/${formattedName}'`)
    })
  }
}