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

const loadVar = (ci, varDefinition) =>
    typeof varDefinition === 'function'
        ? varDefinition(ci)
        : varDefinition;

const executeCommand = async (command, subcommands, params) => {
    const ci = {
        ...params,
        command,
        subcommands,
    };

    const vars = [
        'MONTH',
        'YEAR',
        'BUILD_BRANCH',
        'BUILD_NUM',
        'BUILD_PR_NUM',
        'BUILD_PR_URL',
        'BUILD_VERSION',
        'GITHUB_TOKEN',
        'RELEASE_BRANCHES',
        'IS_PR',
        'IS_RELEASE',
        'PROJECT_NAME',
        'PROJECT_OWNER',
        'PROJECT_VERSION',
        'UPLOAD_PATH',
    ];

    for (const name of vars) {
        ci[name] = loadVar(ci, require('./vars/' + name));
    }

    const configModule = loadConfig(params.config);
    const fn = getFn(command, configModule);

    try {
        const result = await fn(ci, params);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

module.exports = executeCommand;
