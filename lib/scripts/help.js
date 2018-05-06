const fs = require('fs');
const path = require('path');
const marked = require('marked');
const TerminalRenderer = require('marked-terminal');

marked.setOptions({
    renderer: new TerminalRenderer()
});

const help = () => {
    const msg = fs.readFileSync(path.join(__dirname, '..', '..', 'README.md'), 'utf8');

    // eslint-disable-next-line no-console
    console.log(marked(msg));
};

module.exports = help;
