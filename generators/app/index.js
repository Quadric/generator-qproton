'use strict';
const Generator = require('yeoman-generator');
const _ = require('lodash');
const chalk = require('chalk');
const yosay = require('yosay');

/*
* Retrieves the module key from the given path.
* extracts everything after the last /modules
*
* ex: blah/modules/test/asdf => test/asdf
*     blah/modules/modules/asdfasdf/asdfasdf => asdfasdf/asdfasdf
*
* if the string does not match the regex, will return null
*
*/
const getModuleKey = path => {
  // Regex explanation:
  //            modules\/ : matching all with modules/
  //            (?!modules\/): does not allow matches already with modules/ : ex: /modules/modules/asdf only matches /modules/asdf
  //            .* : matches everything after that
  //            g : only matches once
  const regex = /modules\/((?!modules\/).*)/g;

  const moduleKey = regex.exec(path);

  return moduleKey && moduleKey[1];
};

module.exports = class extends Generator {
  prompting() {
    this.currentFolderName = this.destinationRoot()
      .split('/')
      .pop();

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the stylish ' + chalk.red('generator-qproton') + ' generator!'));

    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'The component name',
        default: this.currentFolderName // Default to current folder name
      }
    ];

    return this.prompt(prompts).then(
      function(props) {
        props.camelName = _.chain(props.name)
          .camelCase()
          .upperFirst()
          .value();
        props.startName = _.chain(props.name)
          .startCase()
          .upperFirst()
          .value();
        props.componentKey =
          this.currentFolderName === props.name
            ? props.name
            : `${getModuleKey(this.destinationRoot())}/${props.name}` || props.name;

        this.props = props;
      }.bind(this)
    );
  }

  paths() {
    if (this.props.name !== this.currentFolderName) {
      this.destinationRoot(_.trim(this.props.name));
    }
  }

  writing() {
    this.fs.copy(this.templatePath('gitignore'), this.destinationPath('.gitignore'));
    this.fs.copy(this.templatePath('INSTRUCTIONS.md'), this.destinationPath('INSTRUCTIONS.md'));

    this.fs.copy(this.templatePath('index.js'), this.destinationPath('actions/index.js'));
    this.fs.copy(this.templatePath('action.js'), this.destinationPath('actions/whatever.js'));
    this.fs.copy(this.templatePath('test.js'), this.destinationPath('actions/whatever.test.js'));

    this.fs.copy(this.templatePath('index.js'), this.destinationPath('logic/index.js'));
    this.fs.copy(this.templatePath('logic.js'), this.destinationPath('logic/whatever.js'));
    this.fs.copy(this.templatePath('test.js'), this.destinationPath('logic/whatever.test.js'));

    this.fs.copy(this.templatePath('index.js'), this.destinationPath('methods/index.js'));
    this.fs.copy(this.templatePath('method.js'), this.destinationPath('methods/whatever.js'));
    this.fs.copy(this.templatePath('test.js'), this.destinationPath('methods/whatever.test.js'));
  }
};
