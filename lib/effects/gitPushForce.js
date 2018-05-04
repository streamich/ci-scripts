const {exec} = require('./util');

const gitPushForce = (ci, params, config) => {
    // eslint-disable-next-line prefer-const
    let {remote, branch} = config;

    if (!remote) {
        // eslint-disable-next-line no-console
        console.warn(`Remote not specified for gitPushForce effect, will assume "origin"`);

        remote = 'origin';
    }

    if (typeof remote !== 'string') {
        throw new TypeError(`gitPushForce expected origin to be a string, but "${typeof remote}" received.`);
    }

    if (!branch) {
        throw new Error('Branch not specified, gitPushForce expects a "branch" argument.');
    }

    if (typeof branch !== 'string') {
        throw new TypeError(`gitPushForce expected branch to be a string, but "${typeof remote}" received.`);
    }

    return exec(`git push ${remote} ${branch} --force`);
};

export default gitPushForce;
