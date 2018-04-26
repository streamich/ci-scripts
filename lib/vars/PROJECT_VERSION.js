/// Semver version of your project. Taken from `package.json`.
const path = require('path');

/// Defaults to `UNKNOWN_PROJECT_VERSION`.
let PROJECT_VERSION = 'UNKNOWN_PROJECT_VERSION';

const dir = process.cwd();
const pkg = path.join(dir, 'package.json');

try {
    const pkgModule = require();

    if (typeof pkgModule.version === 'string') {
        PROJECT_VERSION = pkgModule.version;
    }
} catch (errro) {}

module.exports = PROJECT_VERSION;
