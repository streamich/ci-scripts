# ci-scripts

Useful scripts to execute from your CI runner. For example,
post to Slack and GitHub when your build completes:

```
ci slack
ci github-post
```

Uses [`cross-ci`](https://github.com/streamich/cross-ci) to normalize environment variables.


##### Install

```
npm install ci-scripts
```

##### CLI usage


```
ci echo --message="It works"
```

##### Node usage

```js
const {exec} = require('ci-scripts');

exec(['echo'], {message: 'It works'});
```

## Environment Variables

`ci-scripts` uses [`cross-ci`](https://github.com/streamich/cross-ci).


## Docs


##### Scripts

- [`cmd`](#ci-cmd-script)
- [`echo`](#ci-echo-script)
- [`github-post`](#ci-github-post-script)
- [`github-upload`](#ci-github-upload-script)
- [`help`](#ci-help-script)
- [`readme`](#ci-readme-script)
- [`s3-upload`](#ci-s3-upload-script)
- [`slack`](#ci-slack-script)
- [`version`](#ci-version-script)




##### CLI Params

- `--plan`, `--dry-run` &mdash; only show what would be done, without executing it.
- `--verbose` &mdash; log extra info.
- `-e`, `--eval` &mdash; evaluate command line params as template strings.
- `-v`, `--version` &mdash; prints version.
- `-h`, `--help` &mdash; prints README in terminal.


## Scripts




### `ci cmd` Script



`cmd` command allows you to execute any arbitrary command. It allows you
to construct command arguments and environment variables using variables
provided by [`cross-ci`](https://github.com/streamich/cross-ci). In your
`ci.config.js` create a new command definition, say "release":

```js
module.exports = {
  cmd: {
    release: {
      params: {
        command: 'python',
        args: ({PROJECT_NAME}) => ['./release.py', PROJECT_NAME, 'staging'],
        env: ({PROJECT_NAME, BUILD_VERSION}) => ({
          DEPLOY_PATH: `builds/${PROJECT_NAME}/${BUILD_VERSION}`
        })
      },
    }
  }
};
```

Now you can execute this command.

```
ci cmd release
```

Or only print what will this command do, without executing.

```
ci cmd release --plan
```

### Parameters

- `--command` &mdash; command to execute.
- `--args` &mdash; array of arguments to supply to command.
- `--env` &mdash; a map of environemnt variables to add to the command.
- `-shell` &mdash; boolean, specifying whether to execute command in console.




### `ci echo` Script



`echo` script simply prints a message to standard output. Set
message in `--message` param.

```shell
ci echo --message "Hello world!"
```

Using `--eval` parameters get wrapped in template string literals and evaluated.
You can use that to pring useful data.

```shell
ci echo --message "Version: \${PROJECT_VERSION}" --eval
ci echo --message "\${JSON.stringify(ci, null, 4)}" --eval
```




### `ci github-post` Script



Posts a message to your GitHub PR thread.


To be able to post to GitHub you need to have a GitHub access token,
you can get one [here](https://github.com/settings/tokens).

Once you have obtained your token, you can specify it as a
`GITHUB_TOKEN` environment varialbe.

```
GITHUB_TOKEN=<your_github_token> ci github-post --plan
```

As `--token` param:
```
ci github-post --token=<your_github_token> --plan
```

Or in `ci.config.js`:

```js
{
    'github-post': {
        params: {
            token: '<your_github_token>'
        }
    }
};
```


Use `--text` param to specify a custom message. Default message:

> Build version: __`x.y.z-pr-1.1`__

You can also add extra text arount the default text message using
the `--beforeText` and `--afterText` params.




### `ci github-upload` Script



Uploads a specified folder to GitHub `gh-pages` branch, which
can be used for static site or documentation hosting. By default
it uploads the contents of `./docs` folder, but you can overwrite
the folder using `--folder` param.




### `ci help` Script



Prints README in terminal.




### `ci readme` Script



Prints README in terminal.




### `ci s3-upload` Script



Uploads a folder and all its files recursively to a destination
in a S3 bucket.


- `accessKeyId` &mdash; optional, AWS access key id.
- `secretAccessKey` &mdash; optional, AWS secrekt key.
- `src` &mdash; optional, source folder to upload, defaults to `dist/`.
- `bucket` &mdash; required, S3 bucket name.
- `dest` &mdash; optional, S3 destination path, defaults to '""'.
- `acl` &mdash; optional, access rights to all uploaded objects.
- `delete` &mdash; optional, whether to delete old files on S3, defaults to `false`.




### `ci slack` Script


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




### `ci version` Script



Prints out the version of `ci-scripts`.

```
ci version
ci -v
ci --version
```





