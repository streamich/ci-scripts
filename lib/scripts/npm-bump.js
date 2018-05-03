/* eslint-disable filenames/match-exported */
const conventionalRecommendedBump = require('conventional-recommended-bump');
const npmBumpVersion = require('../effects/npmBumpVersion');

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

    // execSync('git fetch --all');
    // execSync(`git checkout ${ci.BUILD_BRANCH}`);
    // execSync(`git branch --set-upstream-to=origin/${ci.BUILD_BRANCH} ${ci.BUILD_BRANCH}`);
    // execSync(`git reset --hard origin/${ci.BUILD_BRANCH}`);

    // execSync(`git checkout $MASTER_BRANCH`);
    // execSync(`git branch --set-upstream-to=origin/$MASTER_BRANCH $MASTER_BRANCH`);
    // execSync(`git reset --hard origin/$MASTER_BRANCH`);
    // execSync(`git merge origin/$MERGING_BRANCH`);
};

module.exports = npmBump;
