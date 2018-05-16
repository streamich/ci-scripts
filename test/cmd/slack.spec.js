const slack = require('../../lib/cmd/slack');
const log = require('../../lib/effects/log');
const request = require('../../lib/effects/request');
const createCi = require('../../lib/createCi');
const exec = require('../..').exec;
const executeCommand = require('../../lib/exec');

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
        const ci = await createCi(['slack']);

        try {
            slack(ci, ci.params);
            throw new Error('Did not throw on no WebHook.');
        } catch (error) {
            expect(Boolean(error.message.match(/webhook/i))).toBe(true);
        }
    });

    test('posts message to slack and logs to console', async () => {
        const ci = await createCi(['slack'], {webhook});

        await slack(ci, ci.params);

        expect(log).toHaveBeenCalledTimes(1);

        const postMessage = log.mock.calls[0][1];

        expect(Boolean(postMessage.match(/posted/i))).toBe(true);
        expect(postMessage.includes(ci.BUILD_VERSION)).toBe(true);

        expect(request).toHaveBeenCalledTimes(1);

        const config = request.mock.calls[0][1];

        expect(config.uri).toBe(webhook);
        expect(config.body.text.includes(ci.BUILD_VERSION)).toBe(true);
    });

    test('integration - posts message to Slack', async () => {
        await exec(['slack'], {webhook});

        expect(log).toHaveBeenCalledTimes(1);

        const postMessage = log.mock.calls[0][1];

        expect(Boolean(postMessage.match(/posted/i))).toBe(true);

        expect(request).toHaveBeenCalledTimes(1);

        const config = request.mock.calls[0][1];

        expect(config.uri).toBe(webhook);
    });

    test('can set before, after, and main text', async () => {
        await executeCommand(['slack'], {
            webhook,
            beforeText: 'foo',
            text: 'bar',
            afterText: 'baz',
        });

        expect(request).toHaveBeenCalledTimes(1);

        const config = request.mock.calls[0][1];
        const text = config.body.text;

        expect(text).toBe('foo\n\nbar\n\nbaz');
    });

    test('text can be a function', async () => {
        await executeCommand(['slack'], {
            webhook,
            beforeText: 'foo',
            text: ci => ci.PROJECT_NAME,
            afterText: 'baz',
        });

        expect(request).toHaveBeenCalledTimes(1);

        const config = request.mock.calls[0][1];
        const text = config.body.text;

        expect(text).toBe('foo\n\nci-scripts\n\nbaz');
    });
});
