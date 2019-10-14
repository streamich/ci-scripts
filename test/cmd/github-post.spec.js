const log = require('../../lib/effects/log');
const request = require('../../lib/effects/request');
const githubPost = require('../../lib/cmd/github-post');
const createCi = require('../../lib/createCi');
const executeCommand = require('../../lib/exec');

jest.mock('../../lib/effects/log');
jest.mock('../../lib/effects/request');

describe('github-post script', () => {
    beforeEach(() => {
        log.mockClear();
        request.mockClear();
    });

    test('exists', () => {
        expect(typeof githubPost).toBe('function');
    });

    test('does nothing if not PR and "onlyPR" set', async () => {
        const ci = createCi(['github-post']);

        ci.IS_PR = false;
        ci.params.onlyPR = true;

        await githubPost(ci);

        expect(request).toHaveBeenCalledTimes(0);
        expect(log).toHaveBeenCalledTimes(1);
        expect(log.mock.calls[0][1]).toMatchSnapshot();
    });

    test('throws if GITHUB_TOKEN not provided', async () => {
        if (process.env.CI || process.env.TRAVIS) {
            return;
        }

        const ci = createCi(['github-post']);

        try {
            await githubPost(ci);
            throw new Error('not this');
        } catch (error) {
            if (error.message === 'not this') {
                throw new Error('did not throw');
            }
        }

        expect(request).toHaveBeenCalledTimes(0);
        expect(log).toHaveBeenCalledTimes(0);
    });

    test('posts to GitHub and logs', async () => {
        const ci = createCi(['github-post']);

        ci.params.token = '123';

        await githubPost(ci);

        expect(request).toHaveBeenCalledTimes(1);

        const config = request.mock.calls[0][1];

        expect(config).toMatchObject({
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'User-Agent': 'ci-scripts',
            },
            json: true,
        });
        expect(config.body.body.includes(ci.BUILD_VERSION)).toBe(true);

        expect(log).toHaveBeenCalledTimes(1);
        expect(Boolean(log.mock.calls[0][1].match(/posted/i))).toBe(true);
        expect(log.mock.calls[0][1].includes(ci.BUILD_VERSION)).toBe(true);
    });

    test('can specify text', async () => {
        await executeCommand(['github-post'], {
            token: '123',
            text: 'foo'
        });

        expect(request).toHaveBeenCalledTimes(1);

        const config = request.mock.calls[0][1];
        const text = config.body.body;

        expect(text).toBe('foo');
    });

    test('can specify command', async () => {
        await executeCommand(['github-post'], {
            token: '123',
            command: 'echo testing command'
        });

        expect(request).toHaveBeenCalledTimes(1);

        const config = request.mock.calls[0][1];
        const text = config.body.body;

        expect(text).toBe('testing command\n');
    });

    test('can specify extra text', async () => {
        await executeCommand(['github-post'], {
            token: '123',
            beforeText: 'bar',
            text: 'foo',
            afterText: 'baz',
        });

        expect(request).toHaveBeenCalledTimes(1);

        const config = request.mock.calls[0][1];
        const text = config.body.body;

        expect(text).toBe('bar\n\nfoo\n\nbaz');
    });

    test('specify extra text as function', async () => {
        await executeCommand(['github-post'], {
            token: '123',
            text: 'foo',
            afterText: ({PROJECT_NAME}) => PROJECT_NAME,
        });

        const config = request.mock.calls[0][1];
        const text = config.body.body;

        expect(text).toBe('foo\n\nci-scripts');
    });
});
