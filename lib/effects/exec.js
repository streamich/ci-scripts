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

        return;
    }

    spawnSync(command, args, options);
};

module.exports = exec;
