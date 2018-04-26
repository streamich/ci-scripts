const path = require('path');
const fs = require('fs');
const glob = require('glob');

const REG_BLOCK = /(^|\n)(\s*\/\/\/([^\n]*))+/g;
const REG_LINE = /\s*\/\/\/\s?([^\n]*)/;

const buildVarsReadme = () => {
    let files;

    try {
        files = glob.sync('lib/vars/*.js');
    } catch (error) {
        console.log(error);
        process.exit(1);
        return;
    }

    const cwd = process.cwd();
    let list = '';
    let text = '';

    for (const file of files) {
        const filename = path.join(cwd, file)
        const content = fs.readFileSync(filename, 'utf8');
        const blocks = content.match(REG_BLOCK);
        const name = path.basename(file).slice(0, -3);
        let fileText = '';

        if (!blocks) continue;

        list += '- [`' + name + '`](#' + name.toLowerCase() + '-variable)\n';

        for (const block of blocks) {
            const lines = block.split('\n');

            for (let i = 0; i < lines.length; i++) {
                const line = lines[i];
                const lineMatches = line.match(REG_LINE);

                if (lineMatches) {
                    lines[i] = lineMatches[1];
                }
            }

            const blockText = lines.join('\n').replace(/\n{3,}/g, '\n');

            fileText += blockText + '\n';
        }

        text += `### \`${name}\` Variable\n\n` + fileText + '\n\n\n';
    }

    return list + '\n\n' + text;
};

module.exports = buildVarsReadme;
