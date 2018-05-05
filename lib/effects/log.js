const log = (ci, params, msg) => {
    if (params.plan) {
        return;
    }

    // eslint-disable-next-line no-console
    console.log(msg);
};

module.exports = log;
