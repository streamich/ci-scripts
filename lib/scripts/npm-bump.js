/* eslint-disable filenames/match-exported */
const conventionalRecommendedBump = require('conventional-recommended-bump');
const npmBumpVersion = require('../effects/npmBumpVersion');
const {exec} = require('../effects/util');

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

    await npmBumpVersion({type});
    await exec(`git push ${ci.GIT_REMOTE} ${ci.BUILD_BRANCH} --force`);
};

module.exports = npmBump;
