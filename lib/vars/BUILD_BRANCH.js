/// Name of the Git branch which is currently being built.
const BUILD_BRANCH =
    /// In CircleCI the `CIRCLE_BRANCH` environment variable is used.
    process.env.CIRCLE_BRANCH

    /// In TravisCI it is set to `TRAVIS_PULL_REQUEST_BRANCH` if the build originated
    /// as a pull request, or `TRAVIS_BRANCH` otherwise.
    || (process.env.TRAVIS
        ? (TRAVIS_PULL_REQUEST_BRANCH || process.env.TRAVIS_BRANCH)
        : '')

    /// If no branch is detected, defaults to empty string `''`.
    || '___UNKNOWN_BUILD_BRANCH___';

module.exports = BUILD_BRANCH;
