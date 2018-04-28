/* eslint-disable filenames/match-exported*/
const request = require('../request');
const evalParam = require('../evalParam');

const headers = {
    'Content-type': 'application/json',
    'User-Agent': 'ci-scripts',
};

/// Posts a message to your GitHub PR thread.
const githubPost = async (ci, params) => {
    const {PROJECT_OWNER, PROJECT_NAME, BUILD_PR_NUM, GITHUB_TOKEN} = ci;

    /// To be able to post to GitHub you need to have a GitHub access token,
    /// you can get one [here](https://github.com/settings/tokens).
    ///
    /// Once you have obtained your token, you can specify it as a
    /// `GITHUB_TOKEN` environment varialbe.
    ///
    /// ```
    /// GITHUB_TOKEN=<your_github_token> ci github-post --plan
    /// ```
    ///
    /// As `--token` param:
    /// ```
    /// ci github-post --token=<your_github_token> --plan
    /// ```
    ///
    /// Or in `ci.config.js`:
    ///
    /// ```js
    /// {
    ///     'github-post': {
    ///         params: {
    ///             token: '16fa3164dcd06eef0cb952a422cb260be8957fe'
    ///         }
    ///     }
    /// };
    /// ```
    const token = GITHUB_TOKEN || params.token;

    if (!token) {
        throw new Error('Github token not provided, but is required to post to GitHub.');
    }

    const body = {
        body: evalParam(ci,

            /// Use `--text` param to specify a custom message. Default message:
            ///
            /// > Build version: __`x.y.z-pr-1.1`__
            params.text
            || (() => `Build version: __${'`' + ci.BUILD_VERSION + '`'}__`)
        )
    };
    const config = {
        method: 'POST',
        uri: `https://api.github.com/repos/${PROJECT_OWNER}/${PROJECT_NAME}/issues/${BUILD_PR_NUM}/comments?access_token=${token}`,
        headers,
        body,
        json: true,
    };

    return request(ci, params, config);
};

module.exports = githubPost;
