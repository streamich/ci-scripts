const BUILD_PR_URL = ({BUILD_PR_NUM, PROJECT_OWNER, PROJECT_NAME}) =>
    process.env.CIRCLE_BUILD_URL
    || `https://github.com/${PROJECT_OWNER}/${PROJECT_NAME}/pull/${BUILD_PR_NUM}`;

module.exports = BUILD_PR_URL;
