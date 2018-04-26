/// Is `true` if currently built branch is one of `RELEASE_BRANCHES`.
const IS_RELEASE = ({RELEASE_BRACHES, BUILD_BRANCH}) =>
    RELEASE_BRACHES.indexOf(BUILD_BRANCH) > -1;

module.exports = IS_RELEASE;
