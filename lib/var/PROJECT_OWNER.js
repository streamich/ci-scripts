const pkg = require('../pkg');

const extractFromPackageJson = () => {
    try {
        const {url} = pkg.repository;

        if (typeof url === 'string') {
            const matches = url.match(/github.com\/([^/]+)/i);

            return matches && matches[1]
                ? matches[1]
                : '';
        }
    // eslint-disable-next-line no-empty
    } catch (error) {}

    return '';
};

/// User name or organization name that owns the repository.
/// In TravisCI it extracts repository owner from `user/repo` slug `TRAVIS_REPO_SLUG`.
const PROJECT_OWNER =
    (process.env.TRAVIS_REPO_SLUG ? process.env.TRAVIS_REPO_SLUG.split('/')[0] : '')

    /// It will also try to extract repository owner from `package.json`,
    /// using `repository.url` field.
    || extractFromPackageJson()

    || '___UNKNOWN_PROJECT_OWNER___';

module.exports = PROJECT_OWNER;