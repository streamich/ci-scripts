const echo = require('../../lib/scripts/echo');
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
            params: {}
        };
        const params = {
            message: 'foobar',
        };

        echo(ci, params);

        expect(log).toHaveBeenCalledWith(ci, params, 'foobar');
    });
});
