const list = [
    'MONTH',
    'YEAR',
    'RELEASE_BRANCHES',
    'PROJECT_NAME',
    'PROJECT_VERSION',
    'PROJECT_OWNER',
    'BUILD_BRANCH',
    'BUILD_NUM',
    'BUILD_PR_NUM',
    'BUILD_PR_URL',
    'BUILD_URL',
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
