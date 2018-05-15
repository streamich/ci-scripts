const exec = require('../effects/exec');
const evalParam = require('../evalParam');

const cmd = async (ci) => {
    const opts = {
        command: evalParam(ci, ci.params.command),
    };

    const result = await exec(ci, opts);

    return result;
};

module.exports = cmd;
