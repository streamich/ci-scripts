const BUILD_VERSION = ({
    IS_PR,
    PROJECT_VERSION,
    BUILD_BRANCH,
    BUILD_PR_NUM,
    BUILD_NUM
}) =>
    IS_PR
        ? `${PROJECT_VERSION}-pr-${BUILD_PR_NUM}.${BUILD_NUM}`
        : `${PROJECT_VERSION}-${BUILD_BRANCH}.${BUILD_NUM}`;

module.exports = BUILD_VERSION;
