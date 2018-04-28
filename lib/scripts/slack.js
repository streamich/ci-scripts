/// Posts a message to your Slack channel.
const rp = require('request-promise');
const evalParam = require('../evalParam');

const headers = {
    'Content-type': 'application/json',
};

const slack = async (ci, params) => {
    const body = {

        /// You can specify a custom message using `text` param, either through `ci.config.js`
        /// config file or as a command line parameter. It can be a static string or a
        /// JavaScript expression.
        ///
        /// ```
        /// ci slack --text="Hello Slack"
        /// ci slack --text="Year: \${YEAR}"
        /// ```
        text: evalParam(ci,
            params.text
            || (
                ({PROJECT_NAME, BUILD_VERSION, BUILD_URL}) =>
                    `Built ${'`' + PROJECT_NAME + '`'}: <${BUILD_URL}|${BUILD_VERSION}>`
            )
        ),
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

        /// To post to Slack you need a Webhook, you can create one
        /// following [this link](https://mailonline.slack.com/apps/A0F7XDUAZ-incoming-webhooks).
        /// Once you have a Webhook you can specify it to `ci-scipts` in a number of ways.
        ///
        /// The simplest way is to an environment variable.
        ///
        /// ```
        /// SLACK_WEBHOOK=<webhook> ci slack
        /// ```
        ///
        /// You can also set it as a command parameter.
        ///
        /// ```
        /// ci slack --webhook="<webhook>"
        /// ```
        ///
        /// Or provide it in `ci.config.js` configuration file.
        ///
        /// ```js
        /// {
        ///     slack: {
        ///         params: {
        ///             webhook: "<webhook>"
        ///         }
        ///     }
        /// }
        /// ```
        uri: params.webhook || ci.SLACK_WEBHOOK || process.env.SLACK_WEBHOOK,
        headers,
        body,
        json: true,
    });

    return response;
};

module.exports = slack;
