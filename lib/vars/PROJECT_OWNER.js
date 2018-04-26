/// User name or organization name that owns the repository.
const PROJECT_OWNER =

    /// In TravisCI it extracts repository owner from `user/repo` slug `TRAVIS_REPO_SLUG`.
    (process.env.TRAVIS_REPO_SLUG ? process.env.TRAVIS_REPO_SLUG.split('/')[0] : '')

    // TODO: Extract from `package.json` Git section.
    ;

module.exports = PROJECT_OWNER;
