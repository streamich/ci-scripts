/// Name of the Git branch which is currently being built.
/// In CircleCI the `CIRCLE_BRANCH` environment variable is used.
/// In TravisCI it is set to `TRAVIS_PULL_REQUEST_BRANCH` if the build originated
/// as a pull request, or `TRAVIS_BRANCH` otherwise.
const BUILD_BRANCH =
    process.env.CIRCLE_BRANCH
    || (process.env.TRAVIS
        ? (process.env.TRAVIS_PULL_REQUEST_BRANCH || process.env.TRAVIS_BRANCH)
        : '')

    /// If `BUILD_BRANCH` environment variable is present, uses that.
    ///
    /// ```shell
    /// BUILD_BRANCH=test ci echo --message "branch: \${BUILD_BRANCH}"
    /// ```
    || process.env.BUILD_BRANCH

    /// If no branch is detected, defaults to `___UNKNOWN_BUILD_BRANCH___` string.
    || '___UNKNOWN_BUILD_BRANCH___';

module.exports = BUILD_BRANCH;
