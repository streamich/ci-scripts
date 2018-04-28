# ci-scripts

Useful scripts to execute from your CI runner.

```shell
ci slack --message="Build finished!"
ci github-post
ci s3-upload
```

Install globally or in your project repo to get started.

```shell
npm install -g ci-scripts
```

Test that it works.

```shell
ci echo --message="It works"
```

## CLI

Command line params

- `--plan` &mdash; don't execute the actual command, but show what it would have done.
- `--verbose` &mdash; log extra info.
- `-e`, `--eval` &mdash; evaluate command line params as templat string.


## Scripts

- [`echo`](#echo-script)
- [`github-post`](#github-post-script)
- [`slack`](#slack-script)



### `ci echo` Script



`echo` script simply prints a message to standard output. Set
message in `--message` param.

```shell
ci echo --message "Hello world!"
```


Using `--eval` parameters get wrapped in template string literals and evaluated.
You can use that to pring useful data.

```shell
ci echo --message "Version: \${PROJECT_VERSION"}" --eval
ci echo --message "\${JSON.stringify(ci, null, 4)}" --eval
```




### `ci github-post` Script



Posts a message to your GitHub PR thread.


Use `--text` param to specify a custom message.


Default message:

> Build version: __`x.y.z-pr-1.1`__




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
The convetion is to use all upper case letters for "global" variables.


- [`BUILD_BRANCH`](#build_branch-variable)
- [`BUILD_NUM`](#build_num-variable)
- [`BUILD_PR_NUM`](#build_pr_num-variable)
- [`BUILD_PR_URL`](#build_pr_url-variable)
- [`BUILD_URL`](#build_url-variable)
- [`BUILD_VERSION`](#build_version-variable)
- [`GITHUB_TOKEN`](#github_token-variable)
- [`IS_PR`](#is_pr-variable)
- [`IS_RELEASE`](#is_release-variable)
- [`MONTH`](#month-variable)
- [`PROJECT_NAME`](#project_name-variable)
- [`PROJECT_OWNER`](#project_owner-variable)
- [`PROJECT_VERSION`](#project_version-variable)
- [`RELEASE_BRANCHES`](#release_branches-variable)
- [`UPLOAD_PATH`](#upload_path-variable)
- [`YEAR`](#year-variable)


#### `BUILD_BRANCH` Variable

Name of the Git branch which is currently being built.

In CircleCI the `CIRCLE_BRANCH` environment variable is used.


In TravisCI it is set to `TRAVIS_PULL_REQUEST_BRANCH` if the build originated
as a pull request, or `TRAVIS_BRANCH` otherwise.


If `BUILD_BRANCH` environment variable is present, uses that.

```shell
BUILD_BRANCH=test ci echo --message "branch: \${BUILD_BRANCH}"
```


If no branch is detected, defaults to empty string `___UNKNOWN_BUILD_BRANCH___`.



#### `BUILD_NUM` Variable

Build number, a numeric value uniquely identifying current build.

On CircleCI equals to `CIRCLE_BUILD_NUM` environment variable.


On TravisCI equals to `TRAVIS_BUILD_NUMBER` environment variable.


Otherwise tries `BUILD_NUM` environment variable.


If not build number detected, defaults to `0`.



#### `BUILD_PR_NUM` Variable

Number of the pull request on GitHub.

On CircleCI pull request number is extracted from `CI_PULL_REQUEST` environment variable.
Which is a link to the pull request of the current job.


On TravicCI `TRAVIS_PULL_REQUEST` environment varialbe is used.


Will also try `BUILD_PR_NUM` environment variable.


Otherwise defaults to `0`.



#### `BUILD_PR_URL` Variable

URL to GitHub PR page.



#### `BUILD_URL` Variable

URL to CI build page.

In CircleCI runner `CIRCLE_BUILD_URL` environment variable is used.



#### `BUILD_VERSION` Variable

A human-readable string uniquely identifying current build.

For pull requests will equal to something like `x.y.z-pr-1.1`.


For build jobs that are not part of a pull request,
it will contain a branch name, like `x.y.z-master.1`.



#### `GITHUB_TOKEN` Variable

Equals to `GITHUB_TOKEN` or `GITHUB_ACCESS_TOKEN` environment variables, in that order.



#### `IS_PR` Variable

Boolean, `true` if the current build is triggered by a pull request.



#### `IS_RELEASE` Variable

Is `true` if currently built branch is one of `RELEASE_BRANCHES`.



#### `MONTH` Variable

Current month numeric value as a string of length two.



#### `PROJECT_NAME` Variable



GitHub project name. Below is a list of environment variables per CI used to
detect project name:

- CircleCI: [`CIRCLE_PROJECT_REPONAME`](https://circleci.com/docs/1.0/environment-variables/#build-details)
- TravisCI: [`TRAVIS_REPO_SLUG`](https://docs.travis-ci.com/user/environment-variables/)

If environment variables are empty, it will also try to extract
project name from `package.json`.

First it will try `name` field.


If project name is not specified in `name` field, it will
try `repository.url` field.


If project name was not possible to determine, it will default to `UNKNOWN_PROJECT_NAME`.



#### `PROJECT_OWNER` Variable



User name or organization name that owns the repository.


In TravisCI it extracts repository owner from `user/repo` slug `TRAVIS_REPO_SLUG`.


It will also try to extract repository owner from `package.json`,
using `repository.url` field.



#### `PROJECT_VERSION` Variable

Semver version of your project. Taken from `package.json`.



#### `RELEASE_BRANCHES` Variable

Names of branches which should trigger a release when they are built.

Defaults to `['master', 'develop', 'next-release', 'release']`.



#### `UPLOAD_PATH` Variable

Relative upload path where artifacts will be stored.

For a pull request it defaults to:

```js
`/builds/${PROJECT_NAME}/prs/${YEAR}-${MONTH}/${BUILD_VERSION}`
```

Which results into something like:

```
/builds/repo/prs/2018-04/1.2.3-pr-1.1`
```


For not pull request it defaults to:

```js
`/builds/${PROJECT_NAME}/${BUILD_BRANCH}`
```

Which results into something like:

```
/builds/repo/master`
```



#### `YEAR` Variable

Current year as a four character long string.





