module.exports = function (name) {
    return `<template>
  <div class="${name.toLowerCase()}">
    <h2>{{ title }}</h2>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Component name: ${name}
const title = ref('${name}')

onMounted(() => {
  // Component mounted
})
</script>

<style lang="scss" scoped>
.${name.toLowerCase()} {
  // Component styles
}
</style>
`
}