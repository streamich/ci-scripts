const list = [
    'CI_PLATFORM',
    'CI_NAME',
    'MONTH',
    'YEAR',
    'RELEASE_BRANCHES',
    'PROJECT_NAME',
    'PROJECT_VERSION',
    'PROJECT_OWNER',
    'PROJECT_URL',
    'BUILD_BRANCH',
    'BUILD_NUM',
    'BUILD_PR_NUM',
    'BUILD_PR_URL',
    'BUILD_URL',
    'GIT_REMOTE',
    'BRANCH_PRODUCTION',
    'BRANCH_STAGING',
    'BRANCH_BUILD',
    'BRANCH_URL',
    'IS_PR',
    'IS_RELEASE',
    'BUILD_VERSION',
    'UPLOAD_PATH',
    'GITHUB_TOKEN',
];

const loadVar = (ci, varDefinition) =>
    typeof varDefinition === 'function'
        ? varDefinition(ci)
        : varDefinition;

for (const name of list) {
    // eslint-disable-next-line import/no-dynamic-require
    exports[name] = loadVar(exports, require('./vars/' + name));
}
