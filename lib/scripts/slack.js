/// Posts a message to your Slack channel.
const rp = require('request-promise');
const evalParam = require('../evalParam');

const defaultText = ({PROJECT_NAME, BUILD_NUM}) =>
    `Built ${'`' + PROJECT_NAME + '`'}: ${BUILD_NUM}`;

const slack = async (ci, params) => {
    const body = {
        text: evalParam(params.text || defaultText),
    };
    const response = await rp({
        method: 'POST',
        uri: params.webhook || ci.SLACK_WEBHOOK || process.env.SLACK_WEBHOOK,
        headers: {
            'Content-type': 'application/json',
        },
        body,
        json: true,
    });

    return response;
};

module.exports = slack;
