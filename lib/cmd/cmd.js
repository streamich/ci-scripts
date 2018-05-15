const exec = require('../effects/exec');

const cmd = async (ci) => {
    const {params} = ci;

    // eslint-disable-next-line prefer-const
    let {command, args = [], env = {}, shell} = params;

    if (!command) {
        throw new Error('--command not specified.');
    }

    if (typeof command !== 'string') {
        throw new TypeError('--command must be a string.');
    }

    if (typeof args === 'string') {
        args = [args];
    }

    if (!Array.isArray(args)) {
        throw new TypeError('--args must be an array.');
    }

    if (typeof env !== 'object') {
        throw new TypeError('--env must be a map.');
    }

    const opts = {
        command,
        args,
        env,
        shell: Boolean(shell),
    };

    const result = await exec(ci, opts);

    return result;
};

module.exports = cmd;
