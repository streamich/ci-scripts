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

const npmBump = async (ci, params) => {
    let type = 'patch';

    if (!params.type || (params.type === 'auto')) {
        const recommendation = await getRecommendedBump();

        type = recommendation.releaseType;
    }

    if (VALID_BUMPS.indexOf(type) === -1) {
        throw new TypeError(`Invalid version bump type "${String(type)}".`);
    }

    const version = await npmBumpVersion(ci, params, {type});

    await gitForcePush(ci, params, {
        remote: ci.GIT_REMOTE,
        branch: ci.BUILD_BRANCH,
    });

    return version;
};

module.exports = npmBump;
