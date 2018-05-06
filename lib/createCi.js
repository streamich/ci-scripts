const createVars = require('./createVars');
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

    let ci = {
        config,
        commands,
        params,
    };

    ci = await createVars(ci);

    return ci;
};

module.exports = createCi;
