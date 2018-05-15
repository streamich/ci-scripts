const {spawnSync} = require('child_process');
const util = require('util');
const chalk = require('chalk');
const isDryRun = require('../isDryRun');

const exec = (ci, config) => {
    const {command, args = []} = config;
    const options = {
        cwd: config.cwd || process.cwd(),
        env: {
            ...process.env,
            ...ci.vars,
        },
        stdio: [0, 1, 2],
        shell: Boolean(config.shell)
    };

    if (isDryRun(ci)) {
        /* eslint-disable no-console */
        console.log(chalk.cyan.bold('\n    Will execute command:\n'));
        console.log(util.inspect(config, {
            colors: true,
            depth: 10
        }));
        console.log(chalk.magenta(`\n    ${command} ${args.join(' ')}\n`));
        /* eslint-enable no-console */

        return;
    }

    spawnSync(command, args, options);
};

module.exports = exec;
