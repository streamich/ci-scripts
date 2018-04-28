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
        icon_emoji: params.icon_emoji === void 0
            ? ':javascript:'
            : (evalParam(ci, params.icon_emoji) | ':javascript:'),
    };

    if (params.icon_url) {
        body.icon_url = evalParam(params.icon_url);
    }

    if (params.channel) {
        body.channel = evalParam(params.channel);
    }

    if (params.verbose) {
        console.log('Posting to Slack:');
        console.log(body);
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
