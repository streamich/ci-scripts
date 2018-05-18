# `ci.config.js` File

You can add a `ci.config.js` file to the root of your project to specify default
parameters for your commands, or have multiple configurations for each command.

```js
module.exports = {
    slack: {
        params: {
            webhook: 'https://hooks.slack.com/services/XXXX/XXXX/XXXXXXXX'
        }
    }
};
```

Now you can simply run `slack` command and it will pick up parameters from the config file.

```shell
ci slack
```

Let's say you wanted to post a Slack message to two different channels, here is how you do it.

```js
module.exports = {
    slack: {
        channel1: {
            params: {
                webhook: 'https://hooks.slack.com/services/XXXX/XXXX/XXXXXXXX'
            }
        },
        channel2: {
            params: {
                webhook: 'https://hooks.slack.com/services/XXXX/XXXX/XXXXXXXX'
            }
        },
    }
};
```

Now you have to specify the config to be used, like so:

```shell
ci slack channel1
ci slack channel2
```


## Variables

You can use [`cross-ci`](https://github.com/streamich/cross-ci) variables in your
params, simply use functions as param values:

```js
module.exports = {
    cmd: {
        params: {
            command: 'aws',
            args: ({PROJECT_NAME, BUILD_VERSION}) =>
                ['s3', 'sync', 'dist', `s3://bucket/${PROJECT_NAME}/${BUILD_VERSION}`]
        }
    }
};
```
