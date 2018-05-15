const fs = require('fs');
const path = require('path');
const marked = require('marked');
const TerminalRenderer = require('marked-terminal');

marked.setOptions({
    renderer: new TerminalRenderer()
});

/// Prints README in terminal.
const readme = () => {
    const msg = fs.readFileSync(path.join(__dirname, '..', '..', 'README.md'), 'utf8');

    return marked(msg);
};

module.exports = readme;
