/* eslint-disable no-console */
const getParams = require('./getParams');
const createCi = require('./createCi');

const getFn = (command, configModule = {}) => {
    const fn = configModule[command];

    if (typeof fn === 'function') {
        return fn;
    }

    try {
        // eslint-disable-next-line import/no-dynamic-require
        return require('./scripts/' + command);
    } catch (error) {
        console.log(`Command "${command}" could not be loaded.`);
        console.log(error);
    }

    return undefined;
};

const executeCommand = async (commands, params = {}) => {
    /* eslint-disable no-param-reassign */
    if (params.version || params.v) {
        commands = ['version'];
        params = {};
    }

    if (commands && !Array.isArray(commands)) {
        throw new TypeError('commands must be an array of command stirngs.');
    }

    if (params.help || params.h || !commands || !commands.length) {
        commands = ['help'];
        params = {};
    }
    /* eslint-enable no-param-reassign */

    const ci = await createCi(commands, params);
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
