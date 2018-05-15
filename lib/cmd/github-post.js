/* eslint-disable filenames/match-exported */
const request = require('../effects/request');
const log = require('../effects/log');

const headers = {
    'Content-type': 'application/json',
    'User-Agent': 'ci-scripts',
};

const messageSeparator = ':crossed_fingers:';
const defaultMessage = ({BUILD_VERSION, BUILD_URL, CI_NAME, BRANCH_URL, BUILD_BRANCH}) => {
    let msg = `Build version: __${'`' + BUILD_VERSION + '`'}__`;

    msg += ` ${messageSeparator} [\`${BUILD_BRANCH}\`](${BRANCH_URL})`;

    if (BUILD_URL) {
        msg += ` on [*${CI_NAME}*](${BUILD_URL})`;
    } else {
        msg += ` on ${CI_NAME}*`;
    }

    return msg + ' :tada:';
};

/// Posts a message to your GitHub PR thread.
const githubPost = async (ci) => {
    const {params, PROJECT_OWNER, PROJECT_NAME, BUILD_PR_NUM, GITHUB_TOKEN, IS_PR, BUILD_COMMIT} = ci;

    if (!IS_PR) {
        if (params.onlyPR) {
            log(ci, 'Will not post to GitHub, as build not triggered by a PR.');

            return undefined;
        }
    }

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

    /// Use `--text` param to specify a custom message. Default message:
    ///
    /// > Build version: __`x.y.z-pr-1.1`__
    let {text} = params;

    if (!text) {
        text = defaultMessage(ci);
    }

    const body = {
        body: text,
    };

    const uri = IS_PR
        ? `https://api.github.com/repos/${PROJECT_OWNER}/${PROJECT_NAME}/issues/${BUILD_PR_NUM}/comments?access_token=${token}`
        : `https://api.github.com/repos/${PROJECT_OWNER}/${PROJECT_NAME}/commits/${BUILD_COMMIT}/comments?access_token=${token}`;

    const config = {
        method: 'POST',
        uri,
        headers,
        body,
        json: true,
    };

    const result = await request(ci, config);

    log(ci, `Posted to GitHub: ${ci.BUILD_VERSION}`);

    return result;
};

module.exports = githubPost;
