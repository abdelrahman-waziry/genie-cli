module.exports = function(){
    return `
        module.exports = {
            "extends": "eslint:recommended",
            "parserOptions": {
                "ecmaVersion": 6,
                "sourceType": "module",
                "ecmaFeatures": {
                    "jsx": false,
                    "experimentalObjectRestSpread": true
                }
            },
            "env": {
                "browser": true,
                "serviceworker": true
            },
            "rules": {
                "indent": [
                    "error",
                    4
                ]
            }
        }
    `
}