/* eslint-disable filenames/match-exported */
const conventionalRecommendedBump = require('conventional-recommended-bump');
const npmBumpVersion = require('../effects/npmBumpVersion');
const gitForcePush = require('../effects/gitForcePush');

const getRecommendedBump = () => new Promise((resolve, reject) => {
    conventionalRecommendedBump({
        preset: `angular`
    }, (error, recommendation) => {
        if (error) {
            reject(error);
        } else {
            resolve(recommendation);
        }
    });
});

const VALID_BUMPS = ['major', 'minor', 'patch', 'premajor', 'preminor',
    'prepatch', 'prerelease', 'from-git'];

const defaultMessage = (ci) =>
    `Upgrade to %s by ci-scripts on ${ci.CI_NAME}`;

const npmBump = async (ci) => {
    const {params} = ci;
    let type = 'patch';

    if (!params.type || (params.type === 'auto')) {
        const recommendation = await getRecommendedBump();

        type = recommendation.releaseType;
    }

    if (VALID_BUMPS.indexOf(type) === -1) {
        throw new TypeError(`Invalid version bump type "${String(type)}".`);
    }

    let message = params.message || defaultMessage(ci);
    const skipCI = Boolean(typeof params.skipCI === 'undefined' ? true : params.skipCI);

    if (skipCI) {
        message += ' [skip ci]';
    }

    const version = await npmBumpVersion(ci, params, {
        type,
        message,
        force: Boolean(params.force),
        noTag: Boolean(params['no-tag']),
    });

    await gitForcePush(ci, {
        remote: ci.GIT_REMOTE,
        branch: ci.BUILD_BRANCH,
    });

    return version;
};

module.exports = npmBump;
