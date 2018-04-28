const docifyFolder = require('./docifyFolder');

const docsScripts = () => docifyFolder({
    folder: 'lib/scripts',
    concatBlock: (name, src) => `
#### \`${name}\` Script

Usage:

    ci ${name}

${src}


`,
    concatListItem: (name) => '- [`' + name + '`](#' + name.toLowerCase() + '-script)\n',
});

module.exports = docsScripts;
