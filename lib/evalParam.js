const createParamEvalWrapper = (ci) => [
    '(function (ci, {' + Object.keys(ci).join(',') + '}) { return `',
    '`; })',
];

const evalParam = (ci, param) => {
    if (typeof param === 'function') {
        return param(ci);
    }

    const doEval = ci.params.eval || ci.params.e;

    if (doEval) {
        const wrapper = createParamEvalWrapper(ci);
        const script = wrapper[0] + param + wrapper[1];

        // eslint-disable-next-line no-eval
        return eval(script)(ci, ci);
    }

    return param;
};

module.exports = evalParam;
