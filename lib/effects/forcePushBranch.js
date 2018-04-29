const {execSync} = require('child_process');
const path = require('path');
const fs = require('fs');
const shellescape = require('shell-escape');
const rimraf = require('rimraf');

const forcePushBranch = (ci, params, {
    branch,
    folder,
    message,
    remote
}) => {
    let absFolder;

    if (path.isAbsolute(folder)) {
        absFolder = path.normalize(folder);
    } else {
        absFolder = path.join(process.cwd(), folder);
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
        execSync(`git push -f ${remote} master:${branch}`);
    } finally {
        rimraf.sync(path.join(absFolder, '.git'));
    }

    process.chdir(cwd);
};

module.exports = forcePushBranch;
