const {execSync} = require('child_process');
const path = require('path');
const shellescape = require('shell-escape');

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

    process.chdir(absFolder);

    execSync('git init');
    execSync('git add -A');
    execSync(shellescape(['git', 'commit', '-m', message]));
    execSync(`git push -f ${remote} master:${branch}`);

    process.chdir(cwd);
};

module.exports = forcePushBranch;
