const cmd = require('../../lib/cmd/cmd');
const log = require('../../lib/effects/log');
const exec = require('../../lib/effects/exec');
const createCi = require('../../lib/createCi');
const executeCommand = require('../../lib/exec');

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

    test('executes command', async () => {
        const ci = createCi(['cmd']);

        ci.params.command = 'printenv';

        await cmd(ci);

        expect(exec).toHaveBeenCalledTimes(1);
        expect(exec.mock.calls[0][0]).toBe(ci);

        const opts = exec.mock.calls[0][1];

        expect(opts.command).toBe('printenv');
    });

    test('passes args and env vars to command', async () => {
        const ci = createCi(['cmd'], {
            command: './switch.sh',
            args: ['prod', 'web'],
            env: {
                NEW_KEY: 'builds/xyz'
            },
        });

        await cmd(ci);

        const opts = exec.mock.calls[0][1];

        expect(opts.command).toBe('./switch.sh');
        expect(opts.args).toEqual(['prod', 'web']);
        expect(opts.env).toEqual({
            NEW_KEY: 'builds/xyz'
        });
    });

    test('allows params to be functions', async () => {
        await executeCommand(['cmd'], {
            command: () => './switch.sh',
            args: () => ['prod', 'web'],
            env: () => ({
                NEW_KEY: 'builds/xyz'
            }),
        });

        const opts = exec.mock.calls[0][1];

        expect(opts.command).toBe('./switch.sh');
        expect(opts.args).toEqual(['prod', 'web']);
        expect(opts.env).toEqual({
            NEW_KEY: 'builds/xyz'
        });
    });

    test('can enable shell', async () => {
        await executeCommand(['cmd'], {
            command: () => 'ls',
            shell: true,
        });

        let opts = exec.mock.calls[0][1];

        expect(opts.command).toBe('ls');
        expect(opts.shell).toBe(true);

        await executeCommand(['cmd'], {
            command: () => 'ls',
            shell: false,
        });

        opts = exec.mock.calls[1][1];

        expect(opts.command).toBe('ls');
        expect(opts.shell).toBe(false);
    });
});
