const {execSync} = require('child_process');
const path = require('path');
const fs = require('fs');
const util = require('util');
const shellescape = require('shell-escape');
const rimraf = require('rimraf');
const chalk = require('chalk');
const evalParam = require('../evalParam');
const isDryRun = require('../isDryRun');
const gitForcePush = require('./gitForcePush');

const gitCommitAndForcePush = async (ci, opts) => {
    const {params} = ci;
    const {
        branch,
        folder,
        message,
        remote
    } = opts;

    let absFolder;

    if (path.isAbsolute(folder)) {
        absFolder = path.normalize(folder);
    } else {
        absFolder = path.join(process.cwd(), folder);
    }

    if (isDryRun(params)) {
        // eslint-disable-next-line no-console
        console.log(chalk.cyan.bold('\n    Will force push branch:\n'));
        // eslint-disable-next-line no-console
        console.log(util.inspect({
            ...opts,
            folder: absFolder
        }, {
            colors: true,
            depth: 10
        }));

        return undefined;
    }

    // Use `--verbose` paramerter to display HTTP requests.
    if (evalParam(ci, params.verbose)) {
        // eslint-disable-next-line no-console
        console.log('Force pushing branch:');
        // eslint-disable-next-line no-console
        console.log({
            ...opts,
            folder: absFolder
        });
    }

    const cwd = process.cwd();

    if (cwd === absFolder) {
        throw new Error('Cannot upload to GitHub whole project folder.');
    }

    try {
        fs.accessSync(path.join(absFolder, '.git'));
        throw new Error('This folder already has Git initialized.');
    // eslint-disable-next-line no-empty
    } catch (error) {}

    process.chdir(absFolder);
    execSync('git init');

    try {
        execSync('git add -A');
        execSync(shellescape(['git', 'commit', '-m', message]));
        await gitForcePush(ci, params, {
            remote,
            branch: 'master',
            remoteBranch: branch
        });
    } finally {
        rimraf.sync(path.join(absFolder, '.git'));
    }

    process.chdir(cwd);

    return undefined;
};

module.exports = gitCommitAndForcePush;
