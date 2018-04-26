const GITHUB_TOKEN =
    process.env.GITHUB_TOKEN
    || process.env.GITHUB_ACCESS_TOKEN;

module.exports = GITHUB_TOKEN;
