/* eslint-disable filenames/match-exported */
const conventionalRecommendedBump = require('conventional-recommended-bump');
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

const bump = async (ci, params) => {
    let releaseType = 'patch';

    if (!params.type || (params.type === 'auto')) {
        const recommendation = await getRecommendedBump();

        releaseType = recommendation.releaseType;
    }

    const result = await exec(`npm version ${releaseType}`);

    // execSync('git fetch --all');
    // execSync(`git checkout ${ci.BUILD_BRANCH}`);
    // execSync(`git branch --set-upstream-to=origin/${ci.BUILD_BRANCH} ${ci.BUILD_BRANCH}`);
    // execSync(`git reset --hard origin/${ci.BUILD_BRANCH}`);

    // execSync(`git checkout $MASTER_BRANCH`);
    // execSync(`git branch --set-upstream-to=origin/$MASTER_BRANCH $MASTER_BRANCH`);
    // execSync(`git reset --hard origin/$MASTER_BRANCH`);
    // execSync(`git merge origin/$MERGING_BRANCH`);

    console.log('result', result);
};

module.exports = bump;
