/// Build number, a numeric value uniquely identifying current build.
/// In CircleCI equals to `CIRCLE_BUILD_NUM` environment variable.
/// In TravisCI equals to `TRAVIS_BUILD_NUMBER` environment variable.
const BUILD_NUM =
    process.env.CIRCLE_BUILD_NUM
    || process.env.TRAVIS_BUILD_NUMBER

    /// Otherwise tries `BUILD_NUM` environment variable.
    /// If not build number detected, defaults to `0`.
    || process.env.BUILD_NUM
    || 0;

module.exports = BUILD_NUM;
