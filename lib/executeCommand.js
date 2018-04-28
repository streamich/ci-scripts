const loadConfig = require('./loadConfig');

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

const loadVar = (ci, varDefinition) =>
    typeof varDefinition === 'function'
        ? varDefinition(ci)
        : varDefinition;

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

    const vars = [
        'MONTH',
        'YEAR',
        'RELEASE_BRANCHES',
        'PROJECT_NAME',
        'PROJECT_VERSION',
        'PROJECT_OWNER',
        'BUILD_BRANCH',
        'BUILD_NUM',
        'BUILD_PR_NUM',
        'BUILD_PR_URL',
        'BUILD_URL',
        'BUILD_VERSION',
        'IS_PR',
        'IS_RELEASE',
        'UPLOAD_PATH',
        'GITHUB_TOKEN',
    ];

    for (const name of vars) {
        // eslint-disable-next-line import/no-dynamic-require
        ci[name] = loadVar(ci, require('./vars/' + name));
    }

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
