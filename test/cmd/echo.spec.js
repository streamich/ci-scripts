const {execSync} = require('child_process');
const echo = require('../../lib/cmd/echo');
const log = require('../../lib/effects/log');

jest.mock('../../lib/effects/log');

describe('echo script', () => {
    beforeEach(() => {
        log.mockClear();
    });

    test('exists', () => {
        expect(typeof echo).toBe('function');
    });

    test('logs message to console', () => {
        const ci = {
            params: {
                message: 'foobar',
            }
        };

        echo(ci);

        expect(log).toHaveBeenCalledWith(ci, 'foobar');
    });

    test('static message', () => {
        expect(execSync('./bin/ci.js echo --message="foobar"').toString().trim()).toBe('foobar');
    });

    test('static message with --eval or -e', () => {
        expect(execSync('./bin/ci.js echo --message="foobar" --eval').toString().trim()).toBe('foobar');
        expect(execSync('./bin/ci.js echo --message="foobar" -e').toString().trim()).toBe('foobar');
    });

    test('evals variables with --eval and -e flags', () => {
        const year = (new Date()).toJSON().substr(0, 4);

        /* eslint-disable no-template-curly-in-string */
        expect(execSync('./bin/ci.js echo --message="\\${YEAR}" --eval').toString().trim()).toBe(year);
        expect(execSync('./bin/ci.js echo --message="\\${YEAR}" --e').toString().trim()).toBe(year);
        /* eslint-enable no-template-curly-in-string */
    });
});
