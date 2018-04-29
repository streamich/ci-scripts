const {_: commands, ...params} = require('minimist')(process.argv.slice(2));
const executeCommand = require('./executeCommand');

if (!(commands instanceof Array) || !commands.length) {
    throw new TypeError(`Expected at least one command.`);
}

executeCommand(commands, params);
