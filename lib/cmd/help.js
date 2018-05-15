const pkg = require('../../package.json');

/// Prints README in terminal.
const help = () =>
    `${pkg.name} v${pkg.version}

  Usage: ci <command> [sub-command] [subsub-command] [options]

  Use e.g. "ci slack --webhook=http://..." will post message to Slack".
  See https://github.com/streamich/ci-scripts for more commands.

  --config              Path to configuration file [default: "ci.config.js"]
  --plan, --dry-run     Do not touch or write anything, but show the commands
  --debug               Print debug information
  -h, --help            Print this help
  -v, --version         Print version number
  -V, --verbose         Verbose output`;

module.exports = help;
