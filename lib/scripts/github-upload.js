/* eslint-disable filenames/match-exported*/
const {execSync} = require('child_process');
const path = require('path');
const shellescape = require('shell-escape');
const evalParam = require('../evalParam');

/// Uploads a specified folder to GitHub `gh-pages` branch, which
/// can be used for static site or documentation hosting. By default
/// it uploads the contents of `./docs` folder, but you can overwrite
/// the folder using `--folder` param.
const githubUpload = async (ci, params) => {
    let folder = evalParam(ci, params.folder || 'docs');

    if (path.isAbsolute(folder)) {
        folder = path.normalize(folder);
    } else {
        folder = path.join(process.cwd(), folder);
    }

    const message = evalParam(ci, params.message || 'update docs');

    process.chdir(folder);

    execSync('git init');
    execSync('git add -A');
    execSync(shellescape(['git', 'commit', '-m', message]));
    execSync(`git push -f git@github.com:${ci.PROJECT_OWNER}/${ci.PROJECT_NAME}.git master:gh-pages`);
};

module.exports = githubUpload;
