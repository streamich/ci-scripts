const getParams = (ci) => {
    const {commands, config} = ci;
    const params = {};
    let curr = config;

    for (const command of commands) {
        if (!curr[command]) {
            break;
        }

        curr = curr[command];

        if (typeof curr !== 'object') {
            throw new TypeError(`Expected "${command}" subcommand config to be an object.`);
        }

        if (curr.params) {
            if (typeof curr.params !== 'object') {
                throw new TypeError(`Config "params" props must be an object, "${typeof curr.params}" found.`);
            }

            Object.assign(params, curr.params);
        }
    }

    Object.assign(params, ci.params);

    return params;
};

module.exports = getParams;
