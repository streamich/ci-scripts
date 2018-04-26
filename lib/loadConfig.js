const path = require('path');

const loadConfig = (customConfigPath) => {
    const cwd = process.cwd();
    let configFile;
    let configModule;

    if (customConfigPath) {
        if (path.isAbsolute(customConfigPath)) {
            configFile = path.normalize(customConfigPath);
        } else {
            configFile = path.join(cwd, customConfigPath);
        }

        try {
            configModule = require(configFile);
        } catch (error) {
            console.log(`Could not find config file: ${configFile}`);
            throw error;
        }
    }

    const defaultPaths = [
        './ci.config.js',
        './.circleci/ci.config.js',
    ];

    for (const configPath of defaultPaths) {
        if (path.isAbsolute(configPath)) {
            configFile = path.normalize(configPath);
        } else {
            configFile = path.join(cwd, configPath);
        }

        try {
            configModule = require(configFile);
            break;
        } catch (error) {}
    }

    if (!configModule) {
        throw new Error(`Could not find config file. Add "ci.config.js" file to your project.`);
    }

    if (typeof configModule !== 'object') {
        throw new TypeError(`Expected config "${configFile}" to export object, but "${typeof configModule}" received.`);
    }

    // TODO: Validate config schema.

    return configModule;
};

module.exports = loadConfig;
