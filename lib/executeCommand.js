const loadConfig = require('./loadConfig');
const vars = require('./vars');

const getFn = (command, configModule = {}) => {
    const fn = configModule[command];

    if (typeof fn === 'function') {
        return fn;
    }

    try {
        // eslint-disable-next-line import/no-dynamic-require
        return require('./scripts/' + command);
    } catch (error) {
        throw new Error(`Command "${command}" not found.`);
    }
};

const idx = (obj, fn, def) => {
    try {
        return fn(obj);
    } catch (error) {
        return def;
    }
};

const getParams = (ci, command) => {
    const params = idx(ci, _ => _.config[command].params) || {};

    return Object.assign(params, ci.params);
};

const executeCommand = async (command, subcommands, params) => {
    const config = loadConfig(params.config);
    const ci = {
        config,
        command,
        params,
        subcommands,
    };

    Object.assign(ci, vars);

    const fn = getFn(command);
    const commandParams = getParams(ci, command);

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
