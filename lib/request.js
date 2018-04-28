const util = require('util');
const rp = require('request-promise');
const chalk = require('chalk');

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

    const response = await rp(config);

    return response;
};

module.exports = request;
