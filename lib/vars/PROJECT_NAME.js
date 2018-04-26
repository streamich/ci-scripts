/// GitHub project name. Below is a list of environment variables per CI used to
/// detect project name:
///
/// - CircleCI: [`CIRCLE_PROJECT_REPONAME`](https://circleci.com/docs/1.0/environment-variables/#build-details)
/// - TravisCI: [`TRAVIS_REPO_SLUG`](https://docs.travis-ci.com/user/environment-variables/)
const PROJECT_NAME =
    process.env.CIRCLE_PROJECT_REPONAME ||

    /// In TravisCI it extracts repository name from `user/repo` slug.
    (process.env.TRAVIS_REPO_SLUG ? process.env.TRAVIS_REPO_SLUG.split('/')[1] : '')

    /// If project name is not found, it defaults to `UNKNOWN_PROJECT_NAME`.
    'UNKNOWN_PROJECT_NAME';

module.exports = PROJECT_NAME;
