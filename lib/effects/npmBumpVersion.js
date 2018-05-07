/* eslint-disable no-console */
const util = require('util');
const shellescape = require('shell-escape');
const chalk = require('chalk');
const {exec} = require('./util');

const npmBumpVersion = async (ci, params, opts) => {
    let parts = ['npm', 'version', opts.type];

    if (opts.message) {
        parts = [...parts, '--message', opts.message];
    }

    if (opts.force) {
        parts.push('--force');
    }

    if (opts.noTag) {
        parts.push('--no-git-tag-version');
    }

    const command = shellescape(parts);

    if (params.plan) {
        console.log(chalk.cyan.bold('\n    Will bump NPM version:\n'));
        console.log(util.inspect(opts, {
            colors: true,
            depth: 10
        }));
        console.log(chalk.magenta(`\n    ${command}\n`));

        return undefined;
    }

    const version = await exec(command);

    return version
        .trim()
        .substr(1);
};

module.exports = npmBumpVersion;
