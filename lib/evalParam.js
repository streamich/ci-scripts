const createParamEvalWrapper = (ci) => [
    '(function ({' + Object.keys(ci).join(',') + '}) { return `',
    '`; })',
];

const evalParam = (ci, param) => {
    if (typeof param === 'function') {
        return param(ci);
    }

    const wrapper = createParamEvalWrapper(ci);
    const script = wrapper[0] + param + wrapper[1];

    // eslint-disable-next-line no-eval
    return eval(script)(ci);
};

module.exports = evalParam;
