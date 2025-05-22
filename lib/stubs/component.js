module.exports = function(name) {
    return `
<template>
<div>
</div>
</template>

<script>
    export default {
        name: '${name}',
        mounted(){
            
        }
    }
</script>
`
}  