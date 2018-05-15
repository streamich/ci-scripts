const exec = require('../effects/exec');

const cmd = async (ci) => {
    const opts = {
        command: ci.params.command,
    };

    const result = await exec(ci, opts);

    return result;
};

module.exports = cmd;
