const store = require('../stubs/store')
const { createDir, createFile, convertToCamelCase } = require('../utils')
const fs = require('fs')

module.exports = function (name, standalone) {
    let formattedName = convertToCamelCase(name)

    // Check if it's a composable (starts with 'use')
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
        // Create composables directory if it doesn't exist
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
                // Create the stores directory if it doesn't exist
                createDir(path, () => {
                    // Create the store file
                    const storePath = `${path}/${formattedName}Store.js`
                    createFile(storePath, store(formattedName))

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