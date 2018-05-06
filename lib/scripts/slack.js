/// Posts a message to your Slack channel.
const request = require('../effects/request');
const log = require('../effects/log');
const evalParam = require('../evalParam');

const headers = {
    'Content-type': 'application/json',
};

const defaultEmoji = 'clap';
const messageSeparator = ':fingerscrossed:';
const defaultMessage = ({PROJECT_NAME, BUILD_VERSION, BUILD_URL, CI_NAME, PROJECT_URL,
    IS_PR, BUILD_PR_URL, BUILD_PR_NUM}) => {
    let msg = `Built <${PROJECT_URL}|${'`' + PROJECT_NAME + '`'}>`;

    if (IS_PR) {
        msg += ` ${messageSeparator} <${BUILD_PR_URL}|\`/pull/${BUILD_PR_NUM}\`>`;
    }

    msg += ` ${messageSeparator} ${'*`' + BUILD_VERSION + '`*'}`;

    if (BUILD_URL) {
        msg += ` ${messageSeparator} on <${BUILD_URL}|_${CI_NAME}_>`;
    } else {
        msg += ` ${messageSeparator} on ${CI_NAME}`;
    }

    return msg;
};

const slack = async (ci, params) => {
    const param = (name) => evalParam(ci, params[name]);

    const body = {

        /// You can specify a custom message using `--text` param, either through `ci.config.js`
        /// config file or as a command line argument. It can be a static string or a
        /// JavaScript expression.
        ///
        /// ```
        /// ci slack --text="Hello Slack"
        /// ci slack --text="Year: \${YEAR}"
        /// ```
        ///
        /// Set message text using `ci.config.js` config file:
        ///
        /// ```js
        /// {
        ///     slack: {
        ///         params: {
        ///             text: ({PROJECT_NAME}) =>
        ///                 `Success, built ${'`' + PROJECT_NAME + '`'}!`
        ///         }
        ///     }
        /// }
        /// ```
        text: evalParam(ci,
            params.text
            || defaultMessage
        ),

        /// Use `--username` param to overwrite sender's display name, defaults to `ci-scripts`.
        username: param('username') || 'ci-scripts',

        /// Set emoji icon of the sender using `--icon_emoji` param, defaults to `javascript`.
        ///
        /// ```
        /// ci slack --icon_emoji=ghost
        /// ```
        icon_emoji: params.icon_emoji === void 0
            ? `:${defaultEmoji}:`
            : ':' + (evalParam(ci, params.icon_emoji) || defaultEmoji) + ':',
    };

    if (params.icon_url) {
        /// Specify sender icon URL using `--icon_url` param.
        body.icon_url = evalParam(params.icon_url);
    }

    if (params.channel) {
        /// You can overwrite default channel using `--channel` param.
        body.channel = evalParam(params.channel);
    }

    const result = await request(ci, params, {
        method: 'POST',

        /// To post to Slack you need a Webhook, you can create one
        /// following [this link](https://mailonline.slack.com/apps/A0F7XDUAZ-incoming-webhooks).
        /// Once you have a Webhook you can specify it to `ci-scipts` in a number of ways.
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

    log(ci, params, `Posted to Slack: ${ci.BUILD_VERSION}`);

    return result;
};

module.exports = slack;
