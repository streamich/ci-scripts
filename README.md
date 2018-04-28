# ci-scripts

## Scripts

- [`echo`](#echo-script)
- [`github-post`](#github-post-script)
- [`slack`](#slack-script)



#### `echo` Script

Usage:

    ci echo



`echo` script simply prints a message to standard output. Set
message in `--message` param.

```shell
ci echo --message "Hello world!"
```


Parameters get wrapped in template string literals and evaluated.
You can use that to pring useful data.

```shell
ci echo --message "Version: \${PROJECT_VERSION"}"
ci echo --message "\${JSON.stringify(ci, null, 4)}"
```




#### `github-post` Script

Usage:

    ci github-post



Posts a message to your GitHub PR thread.




#### `slack` Script

Usage:

    ci slack

Posts a message to your Slack channel.


You can specify a custom message using `--text` param, either through `ci.config.js`
config file or as a command line parameter. It can be a static string or a
JavaScript expression.

```
ci slack --text="Hello Slack"
ci slack --text="Year: \${YEAR}"
```

Or use `ci.config.js` config file:

```js
{
    slack: {
        params: {
            text: ({PROJECT_NAME, BUILD_VERSION, BUILD_URL}) =>
                `Success, built ${'`' + PROJECT_NAME + '`'}!`
        }
    }
}
```


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





## Variables

`ci-scripts` pre-generates and normalizes across CI runners commonly used environment variables.
The convetion is to use all upper case letters for global variables.






