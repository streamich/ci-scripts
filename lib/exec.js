/* eslint-disable no-console */
const getParams = require('./getParams');
const evalParam = require('./evalParam');
const createCi = require('./createCi');

const getFn = (command, configModule = {}) => {
    const fn = configModule[command];

    if (typeof fn === 'function') {
        return fn;
    }

    try {
        // eslint-disable-next-line import/no-dynamic-require
        return require('./cmd/' + command);
    } catch (error) {
        console.log(`Command "${command}" could not be loaded.`);
        console.log(error);
    }

    return undefined;
};

const exec = async (commands, params = {}) => {
    /* eslint-disable no-param-reassign */
    if (typeof commands === 'string') {
        commands = [commands];
    }

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

    const ci = createCi(commands, params);
    const fn = getFn(commands[0]);

    ci.params = Object.assign(getParams(ci), ci.params);

    // eslint-disable-next-line guard-for-in
    for (const key in ci.params) {
        ci.params[key] = evalParam(ci, ci.params[key]);
    }

    const result = await fn(ci);

    return result;
};

module.exports = exec;
