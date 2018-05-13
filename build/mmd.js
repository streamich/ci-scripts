const docifyFolder = require('./docifyFolder');

exports.scriptList = () => docifyFolder({
    folder: 'lib/cmd',
    concatBlock: () => '',
    concatListItem: (name) => '- [`' + name + '`](#ci-' + name.toLowerCase() + '-script)\n',
});

exports.scripts = () => docifyFolder({
    folder: 'lib/cmd',
    concatBlock: (name, src) => `
### \`ci ${name}\` Script

${src}


`,
    concatListItem: () => '',
});
