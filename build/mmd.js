const fs = require('fs');
const path = require('path');
const {execSync} = require('child_process');
const docifyFolder = require('./docifyFolder');

exports.commandList = () => docifyFolder({
    folder: 'lib/cmd',
    concatListItem: (name) => '- [`' + name + '`](./docs/' + name.toLowerCase() + '.md)\n',
    concatBlock: (name, src) => {
        const source = `### \`${name}\` Command\n\n${src}`;
        const filename = path.join(__dirname, '..', 'docs', name) + '.md';

        fs.writeFileSync(filename, source);

        return '';
    },
});

exports.help = () => '```\nci --help\n' + execSync('./bin/ci.js --help') + '```';
