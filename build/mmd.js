const docifyFolder = require('./docifyFolder');

exports.scriptList = () => docifyFolder({
    folder: 'lib/scripts',
    concatBlock: () => '',
    concatListItem: (name) => '- [`' + name + '`](#' + name.toLowerCase() + '-script)\n',
});

exports.scripts = () => docifyFolder({
    folder: 'lib/scripts',
    concatBlock: (name, src) => `
### \`ci ${name}\` Script

${src}


`,
    concatListItem: () => '',
});

exports.variableList = () => docifyFolder({
    folder: 'lib/vars',
    concatBlock: () => '',
    concatListItem: (name) => '- [`' + name + '`](#' + name.toLowerCase() + '-variable)\n',
});

exports.variables = () => docifyFolder({
    folder: 'lib/vars',
    concatBlock: (name, src) => `#### \`${name}\` Variable\n\n` + src + '\n\n\n',
    concatListItem: () => '',
});
