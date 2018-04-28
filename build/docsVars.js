const docifyFolder = require('./docifyFolder');

const docsVars = () => docifyFolder({
    folde: 'lib/vars',
    concatBlock: (name, src) => `#### \`${name}\` Variable\n\n` + src + '\n\n\n',
    concatListItem: (name) => '- [`' + name + '`](#' + name.toLowerCase() + '-variable)\n',
});

module.exports = docsVars;
