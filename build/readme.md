# ci-scripts

Useful scripts to execute from your CI runner. For example, post to Slack:

```
ci slack --message="Build finished!"
```

Upload build artifacts to S3:

```
ci s3-upload
```

Bump NPM version automatically using semantic semver and push changed `package.json` to origin:

```
ci npm-bump --type=auto
```

See sample [Travis](./.travis.yml) and [CircleCI](./.circleci/config.yml) configurations.


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


##### CLI Params

- `--plan` &mdash; don't execute the actual command, but show what it would do.
- `--verbose` &mdash; log extra info.
- `-e`, `--eval` &mdash; evaluate command line params as templat strings.
- `-v`, `--version` &mdash; prints version.
- `-h`, `--help` &mdash; prints README in terminal.


##### Scripts

```mmd
return scripts.scriptList();
```


##### Variables

```mmd
return scripts.variableList();
```


## Scripts

```mmd
return scripts.scripts();
```


## Variables

`ci-scripts` pre-generates and normalizes across CI runners commonly used environment variables.
The convetion is to use all upper case letters for "global" variables.


```mmd
return scripts.variables();
```
