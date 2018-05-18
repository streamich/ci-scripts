### `slack` Command


Posts a message to your Slack channel.


You can specify a custom message using `--text` param, either through `ci.config.js`
config file or as a command line argument. It can be a static string or a
JavaScript expression.

```
ci slack --text="Hello Slack"
ci slack --text="Year: \${YEAR}"
```

Set message text using `ci.config.js` config file:

```js
{
    slack: {
        params: {
            text: ({PROJECT_NAME}) =>
                `Success, built ${'`' + PROJECT_NAME + '`'}!`
        }
    }
}
```

You can also specify extra text messages using `--beforeText` and `--afterText` params.


Use `--username` param to overwrite sender's display name, defaults to `ci-scripts`.


Set emoji icon of the sender using `--icon_emoji` param, defaults to `javascript`.

```
ci slack --icon_emoji=ghost
```

Specify sender icon URL using `--icon_url` param.

You can overwrite default channel using `--channel` param.


To post to Slack you need a Webhook, you can create one
following [this link](https://mailonline.slack.com/apps/A0F7XDUAZ-incoming-webhooks).
Once you have a Webhook you can specify it to `ci-scipts` in a number of ways.
The simplest way is to an environment variable.

```
SLACK_WEBHOOK=<webhook> ci slack
```

You can also set it as a command parameter.

```
ci slack --webhook="<webhook>"
```

Or provide it in `ci.config.js` configuration file.

```js
{
    slack: {
        params: {
            webhook: "<webhook>"
        }
    }
}
```
