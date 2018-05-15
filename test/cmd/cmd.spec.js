const cmd = require('../../lib/cmd/cmd');
const log = require('../../lib/effects/log');
const exec = require('../../lib/effects/exec');
const createCi = require('../../lib/createCi');

jest.mock('../../lib/effects/log');
jest.mock('../../lib/effects/exec');

describe('cmd command', () => {
    beforeEach(() => {
        log.mockClear();
        exec.mockClear();
    });

    test('exists', () => {
        expect(typeof cmd).toBe('function');
    });

    test('executes command', () => {
        const ci = createCi(['cmd']);

        ci.params.command = 'printenv';

        cmd(ci);

        expect(exec).toHaveBeenCalledTimes(1);
        expect(exec.mock.calls[0][0]).toBe(ci);

        const opts = exec.mock.calls[0][1];

        expect(opts.command).toBe('printenv');
    });
});
