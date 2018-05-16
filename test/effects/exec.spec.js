const {spawnSync} = require('child_process');
const exec = require('../../lib/effects/exec');

jest.mock('child_process');

spawnSync.mockImplementation(() => ({}));

describe('exec effect', () => {
    test('exists', () => {
        expect(typeof exec).toBe('function');
    });

    test('calls spawnSync() with expected arguments', async () => {
        await exec({}, {
            command: './switch.sh',
            args: ['dev', 'web'],
            env: {
                NEW_KEY: 'foobar'
            },
            shell: true,
        });

        expect(spawnSync).toHaveBeenCalledTimes(1);
        expect(spawnSync.mock.calls[0][0]).toBe('./switch.sh');
        expect(spawnSync.mock.calls[0][1]).toEqual(['dev', 'web']);
        expect(spawnSync.mock.calls[0][2].env.NEW_KEY).toBe('foobar');
        expect(spawnSync.mock.calls[0][2].shell).toBe(true);
    });
});
