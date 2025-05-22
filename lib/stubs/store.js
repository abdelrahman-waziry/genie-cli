module.exports = function(name){
    return `
    const ${name}Store = {
        namespaced: true,
        // Initial state 
        state() {
            return {
                //
            }
        },
        getters: {
            //
        },
        mutations: {
            //
        },
        actions: {
            //
        }
    }
    
    export default ${name}Store
`
}