# ci-scripts

Useful scripts to execute from your CI runner. For example,
post to Slack and GitHub when your build completes:


##### Install

```
npm install ci-scripts
```

##### CLI usage


```
ci slack
```

##### Node usage

```js
const {exec} = require('ci-scripts');

exec(['echo'], {message: 'It works'});
```

## Docs


##### Commands

- [`cmd`](./docs/cmd.md)
- [`echo`](./docs/echo.md)
- [`github-post`](./docs/github-post.md)
- [`github-upload`](./docs/github-upload.md)
- [`help`](./docs/help.md)
- [`readme`](./docs/readme.md)
- [`s3-upload`](./docs/s3-upload.md)
- [`slack`](./docs/slack.md)
- [`version`](./docs/version.md)




##### CLI Params

```
ci-scripts v0.10.0

  Usage: ci <command> [sub-command] [subsub-command] [options]

  Use e.g. "ci slack --webhook=http://..." will post message to Slack".
  See https://github.com/streamich/ci-scripts for more commands.

  --config              Path to configuration file [default: "ci.config.js"]
  --plan, --dry-run     Do not touch or write anything, but show the commands
  --debug               Print debug information
  -h, --help            Print this help
  -v, --version         Print version number
  -V, --verbose         Verbose output
```

##### Environment Variables

Uses [`cross-ci`](https://github.com/streamich/cross-ci) to normalize environment variables.


##### `ci.config.js` File

Optionally, you can add a `ci.config.js` file to your project, see [config file reference](./docs/ci.config.md).
