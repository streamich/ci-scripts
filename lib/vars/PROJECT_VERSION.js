/// Semver version of your project. Taken from `package.json`.
const path = require('path');

/// Defaults to `UNKNOWN_PROJECT_VERSION`.
let PROJECT_VERSION = '___UNKNOWN_PROJECT_VERSION___';

const dir = process.cwd();
const pkg = path.join(dir, 'package.json');

try {
    // eslint-disable-next-line import/no-dynamic-require
    const pkgModule = require(pkg);

    if (typeof pkgModule.version === 'string') {
        PROJECT_VERSION = pkgModule.version;
    }
// eslint-disable-next-line no-empty
} catch (error) {}

module.exports = PROJECT_VERSION;
