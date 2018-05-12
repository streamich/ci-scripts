const pkg = require('../../package.json');

/// Prints out the version of `ci-scripts`.
///
/// ```
/// ci version
/// ci -v
/// ci --version
/// ```
const version = () => pkg.version;

module.exports = version;
