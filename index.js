#!/usr/bin/env node

const program = require('commander')
const {createComponent} = require('./lib/commands/create-component')
const createModule = require('./lib/commands/create-module')
const createTest = require('./lib/commands/create-test')
const init = require('./lib/commands/init')
const extract = require('./lib/commands/extract')
const addConfig = require('./lib/commands/add-config')
const addLint = require('./lib/commands/add-lint')

function version() {
  const packagejson = require('./package.json');
  console.log(packagejson.version);
}

program.command('version')
        .alias('v')
        .description('Displays genie-cli version')
        .action(() => {
          version()
        })
        
program.command('create-component <name>')
        .alias('cr')
        .option('-v, --view', 'Creates a new view')
        .option('-g, --global', 'Creates a global component')
        .option('-s, --standalone', 'Creates a loader to allow extracting component')
        .description('Creates a new component')
        .action((name, args) => {
          createComponent(name, args.view, args.standalone, args.global)
        })

program.command('create-module <name>')
        .alias('cm')
        .option('-s, --standalone', 'Creates a loader to allow extracting module')
        .description('Creates a new module')
        .action((name, args) => {
          createModule(name, args.standalone)
        })

program.command('create-test <name>')
        .alias('ct')
        .description('Creates a new test case')
        .action((name) => {
          createTest(name)
        })

program.command('init <name>')
        .alias('i')
        .description('Initializes a new project')
        .action((name) => {
          init(name)
        })

program.command('add-config')
        .alias('ac')
        .description('Adds rollup configs to root directory')
        .action(() => {
          addConfig()
        })

program.command('extract-module')
        .alias('ext')
        .description('Extracts a module')
        .action(() => {
          extract()
        })

program.command('add-linting')
       .alias('lint')
       .description('Adds a set of eslint rules to an exisitng project')
       .action(() => {
          addLint()
       })
program.parse(process.argv);