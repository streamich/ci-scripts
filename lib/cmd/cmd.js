const exec = require('../effects/exec');

const cmd = async (ci) => {
    const {params} = ci;

    // eslint-disable-next-line prefer-const
    let {args = [], env = {}, shell} = params;

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
        command: ci.params.command,
        args,
        env,
        shell: Boolean(shell),
    };

    const result = await exec(ci, opts);

    return result;
};

module.exports = cmd;
