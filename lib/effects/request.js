const util = require('util');
const rp = require('request-promise');
const chalk = require('chalk');
const evalParam = require('../evalParam');

const request = async (ci, params, config) => {
    if (params.plan) {
        // eslint-disable-next-line no-console
        console.log(chalk.cyan.bold('\n    Will execute HTTP request:\n'));
        // eslint-disable-next-line no-console
        console.log(util.inspect(config, {
            colors: true,
            depth: 10
        }));

        return undefined;
    }

    // Use `--verbose` paramerter to display HTTP requests.
    if (evalParam(ci, params.verbose)) {
        // eslint-disable-next-line no-console
        console.log('Executing HTTP request:');
        // eslint-disable-next-line no-console
        console.log(config);
    }

    const response = await rp(config);

    return response;
};

module.exports = request;
