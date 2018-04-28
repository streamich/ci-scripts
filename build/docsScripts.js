const docifyFolder = require('./docifyFolder');

const docsScripts = () => docifyFolder({
    folder: 'lib/scripts',
    concatBlock: (name, src) => `
### \`ci ${name}\` Script

${src}


`,
    concatListItem: (name) => '- [`' + name + '`](#' + name.toLowerCase() + '-script)\n',
});

module.exports = docsScripts;
