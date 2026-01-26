const fs = require('fs');
const path = require('path');

/**
 * Detects which framework the current project uses
 * @returns {string|null} 'vue', 'react', or null
 */
function detectFramework() {
    try {
        const packageJsonPath = path.join(process.cwd(), 'package.json');

        if (!fs.existsSync(packageJsonPath)) {
            return null;
        }

        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        const dependencies = {
            ...packageJson.dependencies,
            ...packageJson.devDependencies
        };

        const hasVue = dependencies.hasOwnProperty('vue');
        const hasReact = dependencies.hasOwnProperty('react');

        if (hasVue && hasReact) {
            // Both frameworks present - this shouldn't happen but handle it
            console.warn('Both Vue and React detected. Please specify framework manually.');
            return null;
        }

        if (hasVue) return 'vue';
        if (hasReact) return 'react';

        return null;
    } catch (error) {
        console.error('Error detecting framework:', error.message);
        return null;
    }
}

/**
 * Gets the appropriate file extension for the framework
 * @param {string} framework - 'vue' or 'react'
 * @param {boolean} isComponent - whether this is a component file
 * @returns {string} file extension
 */
function getFileExtension(framework, isComponent = false) {
    if (framework === 'vue') {
        return isComponent ? '.vue' : '.js';
    }
    if (framework === 'react') {
        return isComponent ? '.jsx' : '.js';
    }
    return '.js';
}

/**
 * Gets the appropriate folder name for views/pages
 * @param {string} framework - 'vue' or 'react'
 * @returns {string} folder name
 */
function getViewsFolder(framework) {
    return framework === 'react' ? 'pages' : 'views';
}

/**
 * Gets the appropriate folder name for composables/hooks
 * @param {string} framework - 'vue' or 'react'
 * @returns {string} folder name
 */
function getComposablesFolder(framework) {
    return framework === 'react' ? 'hooks' : 'composables';
}

/**
 * Gets the appropriate folder name for stores
 * @param {string} framework - 'vue' or 'react'
 * @returns {string} folder name
 */
function getStoresFolder(framework) {
    return framework === 'react' ? 'store' : 'stores';
}

module.exports = {
    detectFramework,
    getFileExtension,
    getViewsFolder,
    getComposablesFolder,
    getStoresFolder
};
