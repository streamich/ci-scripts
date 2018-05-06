/* eslint-disable no-console */
const util = require('util');
const chalk = require('chalk');
const {exec} = require('./util');

const gitForcePush = (ci, params, config) => {
    // eslint-disable-next-line prefer-const
    let {remote, branch, branchRemote = branch} = config;

    if (!remote) {
        // eslint-disable-next-line no-console
        console.warn(`Remote not specified for gitPushForce effect, will assume "origin"`);

        remote = 'origin';
    }

    if (typeof remote !== 'string') {
        throw new TypeError(`gitPushForce expected origin to be a string, but "${typeof remote}" received.`);
    }

    if (!branch) {
        throw new Error('Branch not specified, gitPushForce expects a "branch" argument.');
    }

    if (typeof branch !== 'string') {
        throw new TypeError(`gitPushForce expected branch to be a string, but "${typeof remote}" received.`);
    }

    const command = `git push -f ${remote} ${branch}:${branchRemote}`;

    if (params.plan) {
        console.log(chalk.cyan.bold('\n    Will force push Git branch:\n'));
        console.log(util.inspect(config, {
            colors: true,
            depth: 10
        }));
        console.log(chalk.magenta(`\n    ${command}\n`));

        return undefined;
    }

    return exec(command);
};

module.exports = gitForcePush;
