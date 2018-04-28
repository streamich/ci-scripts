/// Number of the pull request on GitHub.
const BUILD_PR_NUM =
    /// On CircleCI pull request number is extracted from `CI_PULL_REQUEST` environment variable.
    /// Which is a link to the pull request of the current job.
    (process.env.CI_PULL_REQUEST ? parseInt(process.env.CI_PULL_REQUEST.match(/\/pull\/([0-9]+)$/)[1], 10) : 0)

    /// On TravicCI `TRAVIS_PULL_REQUEST` environment varialbe is used.
    || parseInt(process.env.TRAVIS_PULL_REQUEST, 10)

    /// Otherwise defaults to `0`.
    // Has to default to falsy, because it is used in `IS_PR` variable.
    || 0;

module.exports = BUILD_PR_NUM;
