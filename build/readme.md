# ci-scripts

Useful scripts to execute from your CI runner. For example, post to Slack and GitHub:

```
ci slack
ci github-post
```

Upload build artifacts to S3:

```
ci s3-upload
```

Bump NPM version automatically using semantic semver and push changed `package.json` to origin:

```
ci npm-bump
```

See sample [Travis](./.travis.yml) and [CircleCI](./.circleci/config.yml) configurations.

Uses [`cross-ci`](https://github.com/streamich/cross-ci) to normalize CI variables.


## Usage

You can use `ci-scripts` as a CLI tool as well as programmatically.


### From Command Line

Install globally or in your project repo to get started.

```
npm install -g ci-scripts
```

Test that it works.

```
ci echo --message="It works"
```


### From Node.js

```js
const {exec} = require('ci-scripts');

exec(['echo'], {message: 'It works'});
```



## Docs


##### Scripts

```mmd
return scripts.scriptList();
```


##### CLI Params

- `--plan` &mdash; don't execute the actual command, but show what it would do.
- `--verbose` &mdash; log extra info.
- `-e`, `--eval` &mdash; evaluate command line params as template strings.
- `-v`, `--version` &mdash; prints version.
- `-h`, `--help` &mdash; prints README in terminal.


## Scripts

```mmd
return scripts.scripts();
```
