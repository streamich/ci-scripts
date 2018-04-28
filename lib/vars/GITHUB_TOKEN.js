/// Equals to `GITHUB_TOKEN` or `GITHUB_ACCESS_TOKEN` environment variables, in that order.
const GITHUB_TOKEN =
    process.env.GITHUB_TOKEN
    || process.env.GITHUB_ACCESS_TOKEN;

module.exports = GITHUB_TOKEN;
