/* eslint-disable filenames/match-exported*/
const request = require('../request');
const evalParam = require('../evalParam');

const headers = {
    'Content-type': 'application/json',
    'User-Agent': 'ci-scripts',
};

/// Posts a message to your GitHub PR thread.
const githubPost = async (ci, params) => {
    const {GITHUB_ORG, PROJECT_NAME, BUILD_PR_NUM, GITHUB_TOKEN} = ci;
    const body = {
        body: evalParam(ci,

            /// Use `--text` param to specify a custom message.
            params.text

            /// Default message:
            ///
            /// > Build version: __`x.y.z-pr-1.1`__
            || (() => `Build version: __${'`' + ci.BUILD_VERSION + '`'}__`)
        )
    };
    const config = {
        method: 'POST',
        uri: `https://api.github.com/repos/${GITHUB_ORG}/${PROJECT_NAME}/issues/${BUILD_PR_NUM}/comments?access_token=${GITHUB_TOKEN}`,
        headers,
        body,
        json: true,
    };

    return request(ci, params, config);
};

module.exports = githubPost;
