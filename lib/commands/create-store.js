const { createDir, createFile, convertToCamelCase } = require('../utils')
const { detectFramework, getComposablesFolder, getStoresFolder } = require('../utils/framework-detector')
const fs = require('fs')
const inquirer = require('inquirer')

// Vue stubs
const vueStore = require('../stubs/vue/store')

// React stubs
const reactHook = require('../stubs/react/hook')
const reactStore = require('../stubs/react/store')

/**
 * Creates a Vue composable or store
 */
function createVueStoreOrComposable(name, standalone) {
  let formattedName = convertToCamelCase(name)
  const isComposable = name.toLowerCase().startsWith('use')

  if (isComposable) {
    // Create a composable
    const composablePath = `./src/composables/${formattedName}.js`
    const composableContent = `import { ref, computed } from 'vue'

/**
 * ${formattedName} Composable
 * Reusable composition function
 */
export function ${formattedName}() {
  // State
  const state = ref(null)
  const loading = ref(false)
  const error = ref(null)

  // Computed
  const hasState = computed(() => state.value !== null)

  // Methods
  function setState(newState) {
    state.value = newState
  }

  function reset() {
    state.value = null
    error.value = null
  }

  // Return reactive state and methods
  return {
    state,
    loading,
    error,
    hasState,
    setState,
    reset
  }
}
`
    if (!fs.existsSync('./src/composables')) {
      fs.mkdirSync('./src/composables', { recursive: true })
    }

    createFile(composablePath, composableContent)
    console.log(`✅ ${formattedName} composable created successfully!`)
    console.log(`📁 Location: ${composablePath}`)
    console.log(`📦 Import: import { ${formattedName} } from '@/composables/${formattedName}'`)
  } else {
    // Create a Pinia store
    return new Promise((resolve, reject) => {
      try {
        const path = './src/stores'
        createDir(path, () => {
          const storePath = `${path}/${formattedName}Store.js`
          createFile(storePath, vueStore(formattedName))

          console.log(`✅ ${formattedName}Store created successfully!`)
          console.log(`📁 Location: ${storePath}`)
          console.log(`📦 Import: import { use${formattedName}Store } from '@/stores/${formattedName}Store'`)
          resolve()
        })
      } catch (error) {
        reject(error)
      }
    })
  }
}

/**
 * Creates a React hook or Zustand store
 */
function createReactHookOrStore(name, standalone) {
  let formattedName = convertToCamelCase(name)
  const isHook = name.toLowerCase().startsWith('use')

  if (isHook) {
    // Create a custom React hook
    const hookPath = `./src/hooks/${formattedName}.js`

    if (!fs.existsSync('./src/hooks')) {
      fs.mkdirSync('./src/hooks', { recursive: true })
    }

    createFile(hookPath, reactHook(formattedName))
    console.log(`✅ ${formattedName} hook created successfully!`)
    console.log(`📁 Location: ${hookPath}`)
    console.log(`📦 Import: import { ${formattedName} } from '@/hooks/${formattedName}'`)
  } else {
    // Create a Zustand store
    return new Promise((resolve, reject) => {
      try {
        const path = './src/store'

        if (!fs.existsSync(path)) {
          fs.mkdirSync(path, { recursive: true })
        }

        const storePath = `${path}/${formattedName.toLowerCase()}Store.js`
        createFile(storePath, reactStore(formattedName))

        console.log(`✅ ${formattedName} store created successfully!`)
        console.log(`📁 Location: ${storePath}`)
        console.log(`📦 Import: import { use${formattedName}Store } from '@/store/${formattedName.toLowerCase()}Store'`)
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  }
}

module.exports = function (name, standalone) {
  // Detect framework
  const framework = detectFramework()

  if (!framework) {
    // No framework detected, ask user
    inquirer.prompt([
      {
        type: 'list',
        name: 'framework',
        message: 'Select framework:',
        choices: ['Vue 3', 'React']
      }
    ]).then((answers) => {
      const selectedFramework = answers.framework === 'Vue 3' ? 'vue' : 'react'

      if (selectedFramework === 'vue') {
        createVueStoreOrComposable(name, standalone)
      } else {
        createReactHookOrStore(name, standalone)
      }
    })
  } else if (framework === 'vue') {
    return createVueStoreOrComposable(name, standalone)
  } else if (framework === 'react') {
    return createReactHookOrStore(name, standalone)
  }
}