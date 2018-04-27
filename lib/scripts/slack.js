/// Posts a message to your Slack channel.
const rp = require('request-promise');
const evalParam = require('../evalParam');

const defaultText = ({PROJECT_NAME, BUILD_NUM}) =>
    `Built ${'`' + PROJECT_NAME + '`'}: ${BUILD_NUM}`;

const headers = {
    'Content-type': 'application/json',
};

const slack = async (ci, params) => {
    const body = {
        text: evalParam(ci, params.text || defaultText),
        username: evalParam(ci, params.username || 'ci-scripts'),
        icon_emoji: evalParam(ci, params.icon_emoji || ':bot_face:'),
    };

    if (params.icon_url) {
        body.icon_url = evalParam(params.icon_url);
    }

    const response = await rp({
        method: 'POST',
        uri: params.webhook || ci.SLACK_WEBHOOK || process.env.SLACK_WEBHOOK,
        headers,
        body,
        json: true,
    });

    return response;
};

module.exports = slack;
