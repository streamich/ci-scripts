const executeCommand = require('./executeCommand');
const {_: commands, ...params} = require('minimist')(process.argv.slice(2));

if (!(commands instanceof Array) || !commands.length) {
    throw new TypeError(`Expected at least one command.`);
}

const [command, ...subcommands] = commands;

executeCommand(command, subcommands, params);
