const { createFile, createDir, convertToCamelCase } = require('../utils')
const { detectFramework, getFileExtension, getViewsFolder } = require('../utils/framework-detector')
const inquirer = require('inquirer')

// Vue stubs
const vueComponentStub = require('../stubs/vue/component')
const vueTestStub = require('../stubs/vue/test')
const vueLoader = require('../stubs/vue/loader')

// React stubs
const reactComponentStub = require('../stubs/react/component')
const reactTestStub = require('../stubs/react/test')
const reactStylesStub = require('../stubs/react/styles')

/**
 * Creates a Vue component
 */
function createVueComponent(name, isView, isStandalone) {
  let formattedName = convertToCamelCase(name)
  const template = vueComponentStub(formattedName)
  const testTemplate = vueTestStub(formattedName)
  const loaderTemplate = vueLoader(formattedName)

  const basePath = isView ? './src/views' : './src/components'

  createDir(`${basePath}/${formattedName}`, () => {
    let componentPath = `${basePath}/${formattedName}/${formattedName}.vue`
    let testPath = `${basePath}/${formattedName}/${formattedName}.spec.js`
    let indexPath = `${basePath}/${formattedName}/index.js`

    createFile(componentPath, template)
    createFile(testPath, testTemplate)

    const indexContent = `export { default } from './${formattedName}.vue'\n`
    createFile(indexPath, indexContent)

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

/**
 * Creates a React component
 */
function createReactComponent(name, isView, isStandalone) {
  let formattedName = convertToCamelCase(name)
  const template = reactComponentStub(formattedName)
  const testTemplate = reactTestStub(formattedName)
  const stylesTemplate = reactStylesStub(formattedName)

  const basePath = isView ? './src/pages' : './src/components'

  createDir(`${basePath}/${formattedName}`, () => {
    let componentPath = `${basePath}/${formattedName}/${formattedName}.jsx`
    let testPath = `${basePath}/${formattedName}/${formattedName}.test.jsx`
    let stylesPath = `${basePath}/${formattedName}/${formattedName}.module.scss`
    let indexPath = `${basePath}/${formattedName}/index.js`

    createFile(componentPath, template)
    createFile(testPath, testTemplate)
    createFile(stylesPath, stylesTemplate)

    const indexContent = `export { default } from './${formattedName}'\n`
    createFile(indexPath, indexContent)

    console.log(`✅ ${formattedName} ${isView ? 'page' : 'component'} created successfully!`)
    console.log(`📁 Location: ${componentPath}`)
    console.log(`🎨 Styles: ${stylesPath}`)
    console.log(`🧪 Test: ${testPath}`)
    console.log(`📦 Import: import ${formattedName} from '@/${isView ? 'pages' : 'components'}/${formattedName}'`)
  })
}

module.exports = {
  createComponent: function (name, isView, isStandalone, isGlobal) {
    // Detect framework
    const framework = detectFramework()

    if (!framework) {
      // No framework detected, ask user
      inquirer.prompt([
        {
          type: 'list',
          name: 'framework',
          message: 'Select framework for this component:',
          choices: ['Vue 3', 'React']
        }
      ]).then((answers) => {
        const selectedFramework = answers.framework === 'Vue 3' ? 'vue' : 'react'

        if (selectedFramework === 'vue') {
          createVueComponent(name, isView, isStandalone)
        } else {
          createReactComponent(name, isView, isStandalone)
        }
      })
    } else if (framework === 'vue') {
      createVueComponent(name, isView, isStandalone)
    } else if (framework === 'react') {
      createReactComponent(name, isView, isStandalone)
    }
  }
}