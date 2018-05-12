const log = require('../../lib/effects/log');
const request = require('../../lib/effects/request');
const githubPost = require('../../lib/cmd/github-post');
const createCi = require('../../lib/createCi');

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

        await githubPost(ci, {
            onlyPR: true
        });

        expect(request).toHaveBeenCalledTimes(0);
        expect(log).toHaveBeenCalledTimes(1);
        expect(log.mock.calls[0][2]).toMatchSnapshot();
    });

    test('throws if GITHUB_TOKEN not provided', async () => {
        const ci = createCi(['github-post']);

        try {
            await githubPost(ci, {});
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

        await githubPost(ci, {
            token: '123'
        });

        expect(request).toHaveBeenCalledTimes(1);

        const config = request.mock.calls[0][2];

        expect(config).toMatchObject({
            method: 'POST',
            uri: `https://api.github.com/repos/${ci.PROJECT_OWNER}/${ci.PROJECT_NAME}/commits/${ci.BUILD_COMMIT}/comments?access_token=123`,
            headers: {
                'Content-type': 'application/json',
                'User-Agent': 'ci-scripts',
            },
            json: true,
        });
        expect(config.body.body.includes(ci.BUILD_VERSION)).toBe(true);

        expect(log).toHaveBeenCalledTimes(1);
        expect(Boolean(log.mock.calls[0][2].match(/posted/i))).toBe(true);
        expect(log.mock.calls[0][2].includes(ci.BUILD_VERSION)).toBe(true);
    });
});
