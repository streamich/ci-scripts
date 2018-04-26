/// Build number, a numeric value uniquely identifying current build.
const BUILD_NUM =
    /// On CircleCI equals to `CIRCLE_BUILD_NUM` environment variable.
    process.env.CIRCLE_BUILD_NUM

    /// On TravisCI equals to `TRAVIS_BUILD_NUMBER` environment variable.
    || process.env.TRAVIS_BUILD_NUMBER

    /// If not build number detected, defaults to `0`.
    || 0;

module.exports = BUILD_NUM;
