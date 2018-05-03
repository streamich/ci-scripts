/* eslint-disable no-console */
const util = require('util');
const chalk = require('chalk');
const {exec} = require('./util');

const npmBumpVersion = async (ci, params, opts) => {
    if (params.plan) {
        console.log(chalk.cyan.bold('\n    Will bump NPM version:\n'));
        console.log(util.inspect(opts, {
            colors: true,
            depth: 10
        }));

        return undefined;
    }

    return exec(`npm version ${opts.type}`);
};

module.exports = npmBumpVersion;
