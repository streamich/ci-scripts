const pkg = require('../../package.json');

/// Prints out the version of `ci-scripts`. Use it in
/// one the three ways below.
///
/// ```
/// ci version
/// ci -v
/// ci --version
/// ```
const version = () => pkg.version;

module.exports = version;
