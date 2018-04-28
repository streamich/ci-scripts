/* eslint-disable filenames/match-exported*/
const rp = require('request-promise');
const evalParam = require('../evalParam');

const headers = {
    'Content-type': 'application/json',
    'User-Agent': 'ci-scripts',
};

/// Posts a message to your GitHub PR thread.
const githubPost = async (ci) => {
    const {GITHUB_ORG, PROJECT_NAME, BUILD_PR_NUM, GITHUB_TOKEN} = ci;
    const body = {
        body: 'Test'
    };

    const response = await rp({
        method: 'POST',
        uri: `https://api.github.com/repos/${GITHUB_ORG}/${PROJECT_NAME}/issues/${BUILD_PR_NUM}/comments?access_token=${GITHUB_TOKEN}`,
        headers,
        body,
        json: true,
    });

    return response;
};

module.exports = githubPost;
