const vars = require('./vars');
const loadConfig = require('./loadConfig');

const createCi = (commands, params = {}) => {
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

    return ci;
};

module.exports = createCi;
