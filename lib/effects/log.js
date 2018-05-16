const chalk = require('chalk');
const isDryRun = require('../isDryRun');

const log = (ci, msg) => {
    if (isDryRun(ci)) {
        /* eslint-disable no-console */
        console.log(chalk.cyan.bold('\n    Will log message:'));
        console.log(chalk.magenta(`\n    ${msg}\n`));
        /* eslint-enable no-console */

        return;
    }

    // eslint-disable-next-line no-console
    console.log(msg);
};

module.exports = log;
