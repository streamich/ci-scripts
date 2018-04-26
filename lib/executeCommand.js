const path = require('path');
const loadConfig = require('./loadConfig');

const getFn = (command, configModule = {}) => {
    const fn = configModule[command];

    if (typeof fn === 'function') {
        return fn;
    }

    try {
        return require('./scripts/' + command);
    } catch (error) {
        throw new Error(`Command "${command}" not found.`);
    }
};

const executeCommand = async (command, subcommands, params) => {
    const ci = {
        ...params,
        command,
        subcommands,
    };
    const configModule = loadConfig(params.config);
    const fn = getFn(command, configModule);

    try {
        const result = await fn({});
    } catch (error) {
        console.log(error);
        process.exit(1);
    }

    console.log(command, subcommands, params);
    console.log(configModule);
    console.log(fn);
};

module.exports = executeCommand;
