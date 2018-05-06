/* eslint-disable filenames/match-exported */
const request = require('../effects/request');
const log = require('../effects/log');
const evalParam = require('../evalParam');

const headers = {
    'Content-type': 'application/json',
    'User-Agent': 'ci-scripts',
};

const defaultMessage = ({BUILD_VERSION, BUILD_URL, CI_NAME}) => {
    let msg = `Build version: __${'`' + BUILD_VERSION + '`'}__`;

    if (BUILD_URL) {
        msg += ` :crossed_fingers: on [*${CI_NAME}*](${BUILD_URL})`;
    } else {
        msg += ` :crossed_fingers: on ${CI_NAME}*`;
    }

    return msg;
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
    ///             token: '<your_github_token>'
    ///         }
    ///     }
    /// };
    /// ```
    const token = params.token || GITHUB_TOKEN;

    if (!token) {
        throw new Error('Github token not provided, but is required to post to GitHub.');
    }

    const body = {
        body: evalParam(ci,

            /// Use `--text` param to specify a custom message. Default message:
            ///
            /// > Build version: __`x.y.z-pr-1.1`__
            params.text
            || defaultMessage
        )
    };
    const config = {
        method: 'POST',
        uri: `https://api.github.com/repos/${PROJECT_OWNER}/${PROJECT_NAME}/issues/${BUILD_PR_NUM}/comments?access_token=${token}`,
        headers,
        body,
        json: true,
    };

    const result = await request(ci, params, config);

    log(ci, params, `Posted to GitHub: ${ci.BUILD_VERSION}`);

    return result;
};

module.exports = githubPost;
