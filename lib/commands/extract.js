const inquirer = require('inquirer');
var ncp = require('ncp').ncp;
const {getDirectories} = require('../utils')

module.exports = function(){
    inquirer.prompt([
        {type: 'rawlist', name: 'module', message: 'select a module to extract', choices: getDirectories('./src/modules')}
    ]).then((answers) => {
        let source = `./src/modules/${answers.module}`
        ncp(source, '', function (err) {
            if (err) {
              return console.error(err);
            }
            console.log('done!');
        });
    })
}