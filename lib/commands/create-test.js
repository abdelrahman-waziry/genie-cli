const testCaseTemplate = require('../stubs/test')
const { createFile, convertToCamelCase } = require('../utils')
const fs = require('fs')
const inquirer = require('inquirer')

module.exports = function (name) {
    let formattedName = convertToCamelCase(name)

    return new Promise((resolve, reject) => {
        try {
            // Ask if it's for a component or a standalone test
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
                if (answers.testType === 'component') {
                    // Ask if it's a component or view
                    inquirer.prompt([
                        {
                            type: 'list',
                            name: 'location',
                            message: 'Is this a component or view?',
                            choices: ['component', 'view']
                        }
                    ]).then((locationAnswer) => {
                        const basePath = locationAnswer.location === 'view' ? './src/views' : './src/components'
                        const testPath = `${basePath}/${formattedName}/${formattedName}.spec.js`

                        // Check if component directory exists
                        if (!fs.existsSync(`${basePath}/${formattedName}`)) {
                            console.log(`❌ Component ${formattedName} not found in ${basePath}`)
                            console.log(`💡 Create the component first: genie create-component ${formattedName}${locationAnswer.location === 'view' ? ' --view' : ''}`)
                            reject(new Error('Component not found'))
                            return
                        }

                        createFile(testPath, testCaseTemplate(formattedName))
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

                    const testPath = `${testsPath}/${formattedName}.spec.js`
                    createFile(testPath, testCaseTemplate(formattedName))
                    console.log(`✅ ${formattedName} test created successfully!`)
                    console.log(`📁 Location: ${testPath}`)
                    resolve()
                }
            })
        } catch (error) {
            reject(error)
        }
    })
}
