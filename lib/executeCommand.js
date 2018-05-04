/* eslint-disable no-console */
const loadConfig = require('./loadConfig');
const vars = require('./vars');
const getParams = require('./getParams');

const getFn = (command, configModule = {}) => {
    const fn = configModule[command];

    if (typeof fn === 'function') {
        return fn;
    }

    try {
        console.log('./scripts/' + command);

        // eslint-disable-next-line import/no-dynamic-require
        return require('./scripts/' + command);
    } catch (error) {
        console.log(`Command "${command}" could not be loaded.`);
        console.log(error);
    }

    return undefined;
};

const executeCommand = async (commands, params = {}) => {
    if (!Array.isArray(commands)) {
        throw new TypeError('commands must be an array.');
    }

    if (!commands.length) {
        throw new TypeError('Expected at least one command.');
    }

    if (typeof params !== 'object') {
        throw new TypeError('params must be an object.');
    }

    const config = loadConfig(params.config);

    const ci = {
        config,
        commands,
        params,
        ...vars,
    };

    const fn = getFn(commands[0]);
    const commandParams = getParams(ci);

    try {
        const result = await fn(ci, commandParams);

        return result;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        // eslint-disable-next-line no-process-exit
        process.exit(1);
    }

    return undefined;
};

module.exports = executeCommand;
