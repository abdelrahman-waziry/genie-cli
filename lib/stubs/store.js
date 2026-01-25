module.exports = function (name) {
    const storeName = name.charAt(0).toLowerCase() + name.slice(1);
    return `import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

/**
 * ${name} Store
 * 
 * Using Pinia with Composition API syntax
 */
export const use${name}Store = defineStore('${storeName}', () => {
  // State (use ref for reactive state)
  const count = ref(0)
  const items = ref([])

  // Getters (use computed for derived state)
  const doubleCount = computed(() => count.value * 2)
  const itemCount = computed(() => items.value.length)

  // Actions (regular functions)
  function increment() {
    count.value++
  }

  function addItem(item) {
    items.value.push(item)
  }

  function reset() {
    count.value = 0
    items.value = []
  }

  // Return state, getters, and actions
  return {
    // State
    count,
    items,
    // Getters
    doubleCount,
    itemCount,
    // Actions
    increment,
    addItem,
    reset
  }
})
`
}