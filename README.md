# ci-scripts


## Variables

`ci-scripts` pre-generates and normalizes across CI runners commonly used environment variables.
The convetion is to use all upper case letters for global variables.


- [`BUILD_BRANCH`](#build_branch-variable)
- [`BUILD_NUM`](#build_num-variable)
- [`BUILD_PR_NUM`](#build_pr_num-variable)
- [`IS_PR`](#is_pr-variable)
- [`IS_RELEASE`](#is_release-variable)
- [`MONTH`](#month-variable)
- [`PROJECT_NAME`](#project_name-variable)
- [`PROJECT_OWNER`](#project_owner-variable)
- [`PROJECT_VERSION`](#project_version-variable)
- [`RELEASE_BRANCHES`](#release_branches-variable)
- [`UPLOAD_PATH`](#upload_path-variable)
- [`YEAR`](#year-variable)


### `BUILD_BRANCH` Variable

Name of the Git branch which is currently being built.

In CircleCI the `CIRCLE_BRANCH` environment variable is used.


In TravisCI it is set to `TRAVIS_PULL_REQUEST_BRANCH` if the build originated
as a pull request, or `TRAVIS_BRANCH` otherwise.


If no branch is detected, defaults to empty string `''`.



### `BUILD_NUM` Variable

Build number, a numeric value uniquely identifying current build.

On CircleCI equals to `CIRCLE_BUILD_NUM` environment variable.


On TravisCI equals to `TRAVIS_BUILD_NUMBER` environment variable.


If not build number detected, defaults to `0`.



### `BUILD_PR_NUM` Variable

Number of the pull request on GitHub.

On CircleCI pull request number is extracted from `CI_PULL_REQUEST` environment variable.
Which is a link to the pull request of the current job.


On TravicCI `TRAVIS_PULL_REQUEST` environment varialbe is used.


Otherwise defaults to `0`.



### `IS_PR` Variable

Boolean, `true` if the current build is triggered by a pull request.



### `IS_RELEASE` Variable

Is `true` if currently built branch is one of `RELEASE_BRANCHES`.



### `MONTH` Variable

Current month numeric value as a string of length two.



### `PROJECT_NAME` Variable

GitHub project name. Below is a list of environment variables per CI used to
detect project name:

- CircleCI: [`CIRCLE_PROJECT_REPONAME`](https://circleci.com/docs/1.0/environment-variables/#build-details)
- TravisCI: [`TRAVIS_REPO_SLUG`](https://docs.travis-ci.com/user/environment-variables/)


In TravisCI it extracts repository name from `user/repo` slug.


If project name is not found, it defaults to `UNKNOWN_PROJECT_NAME`.



### `PROJECT_OWNER` Variable

User name or organization name that owns the repository.


In TravisCI it extracts repository owner from `user/repo` slug `TRAVIS_REPO_SLUG`.



### `PROJECT_VERSION` Variable

Semver version of your project. Taken from `package.json`.


Defaults to `UNKNOWN_PROJECT_VERSION`.



### `RELEASE_BRANCHES` Variable

Names of branches which should trigger a release when they are built.

Defaults to `['master', 'develop', 'next-release', 'release']`.



### `UPLOAD_PATH` Variable

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



### `YEAR` Variable

Current year as a four character long string.





