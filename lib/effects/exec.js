const {spawnSync} = require('child_process');
const util = require('util');
const chalk = require('chalk');
const isDryRun = require('../isDryRun');

const exec = (ci, config) => {
    const {command, args = [], env: envConfig = {}} = config;

    const env = {
        ...process.env,
        ...ci.vars,
        ...envConfig,
    };

    const options = {
        cwd: config.cwd || process.cwd(),
        env,
        stdio: [0, 1, 2],
        shell: Boolean(config.shell)
    };

    if (isDryRun(ci)) {
        /* eslint-disable no-console */
        console.log(chalk.cyan.bold('\n    Will execute command:\n'));
        console.log(util.inspect(options, {
            colors: true,
            depth: 10
        }));

        const envVars = Object.keys(envConfig).map((key) => `${key}="${envConfig[key]}" `).join('');

        console.log(chalk.magenta(`\n    ${envVars}${command} ${args.join(' ')}\n`));
        /* eslint-enable no-console */

        return undefined;
    }

    const result = spawnSync(command, args, options);

    if (result.error && ci.params.verbose) {
        throw result.error;
    }

    if (result.status) {
        // eslint-disable-next-line no-process-exit
        process.exit(result.status);
    } else if (result.error) {
        throw result.error;
    }

    return result;
};

module.exports = exec;
