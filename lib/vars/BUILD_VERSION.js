/// A human-readable string uniquely identifying current build.
const BUILD_VERSION = ({
    IS_PR,
    PROJECT_VERSION,
    BUILD_BRANCH,
    BUILD_PR_NUM,
    BUILD_NUM
}) =>
    IS_PR
        /// For pull requests will equal to something like `x.y.z-pr-1.1`.
        ? `${PROJECT_VERSION}-pr-${BUILD_PR_NUM}.${BUILD_NUM}`

        /// For build jobs that are not part of a pull request,
        /// it will contain a branch name, like `x.y.z-master.1`.
        : `${PROJECT_VERSION}-${BUILD_BRANCH}.${BUILD_NUM}`;

module.exports = BUILD_VERSION;
