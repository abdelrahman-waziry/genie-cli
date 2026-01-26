const { createFile, convertToCamelCase } = require('../utils')
const { detectFramework } = require('../utils/framework-detector')
const fs = require('fs')
const inquirer = require('inquirer')

// Vue stubs
const vueTestStub = require('../stubs/vue/test')

// React stubs
const reactTestStub = require('../stubs/react/test')

module.exports = function (name) {
    let formattedName = convertToCamelCase(name)
    const framework = detectFramework()

    return new Promise((resolve, reject) => {
        try {
            if (!framework) {
                // No framework detected, ask user
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'framework',
                        message: 'Select framework:',
                        choices: ['Vue 3', 'React']
                    },
                    {
                        type: 'list',
                        name: 'testType',
                        message: 'What type of test?',
                        choices: [
                            { name: 'Component Test (co-located with component)', value: 'component' },
                            { name: 'Standalone Test (in tests folder)', value: 'standalone' }
                        ]
                    }
                ]).then((answers) => {
                    const selectedFramework = answers.framework === 'Vue 3' ? 'vue' : 'react'
                    const testTemplate = selectedFramework === 'vue' ? vueTestStub(formattedName) : reactTestStub(formattedName)

                    handleTestCreation(selectedFramework, answers.testType, formattedName, testTemplate, resolve, reject)
                })
            } else {
                // Framework detected
                const testTemplate = framework === 'vue' ? vueTestStub(formattedName) : reactTestStub(formattedName)

                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'testType',
                        message: 'What type of test?',
                        choices: [
                            { name: 'Component Test (co-located with component)', value: 'component' },
                            { name: 'Standalone Test (in tests folder)', value: 'standalone' }
                        ]
                    }
                ]).then((answers) => {
                    handleTestCreation(framework, answers.testType, formattedName, testTemplate, resolve, reject)
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

function handleTestCreation(framework, testType, formattedName, testTemplate, resolve, reject) {
    if (testType === 'component') {
        // Ask if it's a component or view/page
        inquirer.prompt([
            {
                type: 'list',
                name: 'location',
                message: `Is this a component or ${framework === 'react' ? 'page' : 'view'}?`,
                choices: framework === 'react'
                    ? ['component', 'page']
                    : ['component', 'view']
            }
        ]).then((locationAnswer) => {
            const basePath = locationAnswer.location === 'component'
                ? './src/components'
                : (framework === 'react' ? './src/pages' : './src/views')

            const extension = framework === 'react' ? '.test.jsx' : '.spec.js'
            const testPath = `${basePath}/${formattedName}/${formattedName}${extension}`

            // Check if component directory exists
            if (!fs.existsSync(`${basePath}/${formattedName}`)) {
                console.log(`❌ ${locationAnswer.location === 'component' ? 'Component' : (framework === 'react' ? 'Page' : 'View')} ${formattedName} not found in ${basePath}`)
                console.log(`💡 Create it first: genie create-component ${formattedName}${locationAnswer.location !== 'component' ? ' --view' : ''}`)
                reject(new Error('Component not found'))
                return
            }

            createFile(testPath, testTemplate)
            console.log(`✅ ${formattedName} test created successfully!`)
            console.log(`📁 Location: ${testPath}`)
            resolve()
        })
    } else {
        // Create standalone test in tests folder
        const testsPath = './tests'

        // Create tests directory if it doesn't exist
        if (!fs.existsSync(testsPath)) {
            fs.mkdirSync(testsPath, { recursive: true })
        }

        const extension = framework === 'react' ? '.test.js' : '.spec.js'
        const testPath = `${testsPath}/${formattedName}${extension}`
        createFile(testPath, testTemplate)
        console.log(`✅ ${formattedName} test created successfully!`)
        console.log(`📁 Location: ${testPath}`)
        resolve()
    }
}
