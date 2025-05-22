const fs = require('fs')

module.exports = {
    /**
     * Creates a file at the specified path with the given template content.
     * @param {string} filePath - The path where the file will be created.
     * @param {string} template - The content to write into the file.
     */
    createFile: function(filePath, template){
        fs.writeFile(filePath, template, function(err) {
          if(err) {
            console.log('genie-cli does not support this project structure')
          }
        });
    },
    /**
     * Creates a directory at the specified path, including parent directories if needed.
     * @param {string} dirPath - The path of the directory to create.
     * @param {Function} callback - The callback function to execute after directory creation.
     * @returns {void|boolean} Returns false if directory creation fails.
     */
    createDir: function(dirPath, callback) { 
        fs.mkdir(dirPath, { recursive: true }, function(err){
          if(err){
            console.log('genie-cli does not support this project structure')
            return false
          }
          callback()
        })
    },
    /**
     * Returns a list of directory entries (files and folders) in the specified path.
     * @param {string} path - The directory path to read.
     * @returns {string[]} An array of directory entry names.
     */
    getDirectories: function(path) {
        return fs.readdirSync(path, {withFileTypes: false}).filter(function (file) {
          return file
        });
    },
    /**
     * Converts a string to CamelCase format.
     * @param {string} name - The string to convert.
     * @returns {string} The CamelCase formatted string.
     */
    convertToCamelCase: function(name){
      let pattern = /^[A-Z][a-z]+(?:[A-Z][a-z]+)*$/;
      if (pattern.test(name)) {
        return name;
      } else {
        return `${name}`
        .toLowerCase()
        .replace(new RegExp(/[-_]+/, 'g'), ' ')
        .replace(new RegExp(/[^\w\s]/, 'g'), '')
        .replace(
          new RegExp(/\s+(.)(\w*)/, 'g'),
          ($1, $2, $3) => `${$2.toUpperCase() + $3}`
        )
        .replace(new RegExp(/\w/), s => s.toUpperCase())
      }
    }
}