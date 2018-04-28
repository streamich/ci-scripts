/// Posts a message to your Slack channel.
const request = require('../request');
const evalParam = require('../evalParam');

const headers = {
    'Content-type': 'application/json',
};

const slack = async (ci, params) => {
    const param = (name) => evalParam(ci, params[name]);

    const body = {

        /// You can specify a custom message using `--text` param, either through `ci.config.js`
        /// config file or as a command line parameter. It can be a static string or a
        /// JavaScript expression.
        ///
        /// ```
        /// ci slack --text="Hello Slack"
        /// ci slack --text="Year: \${YEAR}"
        /// ```
        ///
        /// Or use `ci.config.js` config file:
        ///
        /// ```js
        /// {
        ///     slack: {
        ///         params: {
        ///             text: ({PROJECT_NAME, BUILD_VERSION, BUILD_URL}) =>
        ///                 `Success, built ${'`' + PROJECT_NAME + '`'}!`
        ///         }
        ///     }
        /// }
        /// ```
        text: evalParam(ci,
            params.text
            || (
                ({PROJECT_NAME, BUILD_VERSION, BUILD_URL}) =>
                    `Built ${'`' + PROJECT_NAME + '`'}: ${BUILD_URL ? `<${BUILD_URL}|${BUILD_VERSION}>` : BUILD_VERSION} :fingerscrossed:`
            )
        ),

        /// Use `--username` param to overwrite sender's display name, defaults to `ci-scripts`.
        username: param('username') || 'ci-scripts',

        /// Set emoji icon of the sender using `--icon_emoji` param, defaults to `javascript`.
        ///
        /// ```
        /// ci slack --icon_emoji=ghost
        /// ```
        icon_emoji: params.icon_emoji === void 0
            ? ':javascript:'
            : ':' + (evalParam(ci, params.icon_emoji) || 'javascript') + ':',
    };

    if (params.icon_url) {
        /// Specify sender icon URL using `--icon_url` param.
        body.icon_url = evalParam(params.icon_url);
    }

    if (params.channel) {
        /// You can overwrite default channel using `--channel` param.
        body.channel = evalParam(params.channel);
    }

    return request(ci, params, {
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
};

module.exports = slack;
