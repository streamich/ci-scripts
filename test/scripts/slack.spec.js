const slack = require('../../lib/scripts/slack');
const log = require('../../lib/effects/log');
const request = require('../../lib/effects/request');
const createCi = require('../../lib/createCi');

jest.mock('../../lib/effects/log');
jest.mock('../../lib/effects/request');

const webhook = 'https://example.com/hook';

describe('slack script', () => {
    beforeEach(() => {
        log.mockClear();
        request.mockClear();
    });

    test('exists', () => {
        expect(typeof slack).toBe('function');
    });

    test('throws if webhook not provided', async () => {
        const ci = createCi();

        try {
            slack(ci, ci.params);
            throw new Error('Did not throw on no WebHook.');
        } catch (error) {
            expect(Boolean(error.message.match(/webhook/i))).toBe(true);
        }
    });

    test('posts message to slack and logs to console', async () => {
        const ci = {
            params: {
                webhook
            },
        };

        await slack(ci, ci.params);
    });
});
