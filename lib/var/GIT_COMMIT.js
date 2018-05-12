const {execSync} = require('child_process');

const getCommit = () => {
    try {
        return execSync('git rev-parse HEAD').trim();
    } catch (error) {
        return '';
    }
};

const GIT_COMMIT =
    process.env.CIRCLE_SHA1
    || getCommit()
    || '___UNKNOWN_GIT_COMMIT___';

module.exports = GIT_COMMIT;
