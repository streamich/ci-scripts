/// URL to CI build page.
const BUILD_URL =
    /// In CircleCI runner `CIRCLE_BUILD_URL` environment variable is used.
    process.env.CIRCLE_BUILD_URL

    || '';

module.exports = BUILD_URL;
