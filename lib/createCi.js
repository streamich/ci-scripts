const createVars = require('cross-ci').createVars;
const loadConfig = require('./loadConfig');

const createCi = async (commands, params = {}) => {
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
    const vars = createVars();

    const ci = {
        vars,
        config,
        commands,
        params,
    };

    Object.assign(ci, vars);
    Object.assign(process.env, vars);

    return ci;
};

module.exports = createCi;
