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

- `--plan`, `--dry-run` &mdash; only show what would be done, without executing it.
- `--verbose` &mdash; log extra info.
- `-e`, `--eval` &mdash; evaluate command line params as template strings.
- `-v`, `--version` &mdash; prints version.
- `-h`, `--help` &mdash; prints README in terminal.
