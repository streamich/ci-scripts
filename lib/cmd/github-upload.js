/* eslint-disable filenames/match-exported */
const gitCommitAndForcePush = require('../effects/gitCommitAndForcePush');

/// Uploads a specified folder to GitHub `gh-pages` branch, which
/// can be used for static site or documentation hosting. By default
/// it uploads the contents of `./docs` folder, but you can overwrite
/// the folder using `--folder` param.
const githubUpload = async (ci) => {
    const {params} = ci;
    const {folder = 'docs', message = 'update docs'} = params;

    return gitCommitAndForcePush(ci, {
        branch: 'gh-pages',
        folder,
        message,
        remote: `git@github.com:${ci.PROJECT_OWNER}/${ci.PROJECT_NAME}.git`,
    });
};

module.exports = githubUpload;
