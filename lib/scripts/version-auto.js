/* eslint-disable filenames/match-exported */
const conventionalRecommendedBump = require('conventional-recommended-bump');

const versionAuto = () => {
    conventionalRecommendedBump({
        preset: `angular`
    }, (error, recommendation) => {
        console.log(recommendation.releaseType); // 'major'
    });
};

module.exports = versionAuto;
