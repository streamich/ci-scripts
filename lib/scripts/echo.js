const evalParam = require('../evalParam');

const echo = (ci, params) => {
    if (typeof params.message === 'undefined') {
        throw new TypeError('echo command requires a "message" parameter.');
    }

    const message = evalParam(ci, params.message);

    console.log(message);
};

module.exports = echo;
