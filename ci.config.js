module.exports = {
    UPLOAD_PATH: 'XXXX',
    AWS_CLOUD_FRONT: 'XXXX',

    slack: {
        params: {
            webhook: 'XXX',
            text: ({PROJECT_NAME, BUILD_BRANCH, AWS_CLOUD_FRONT, UPLOAD_PATH}) => {
                const url = `https://${AWS_CLOUD_FRONT}${UPLOAD_PATH}`;

                return `${'`' + PROJECT_NAME + '`'} deployed ${'`' + BUILD_BRANCH + '`'} branch: ${url}`;
            },
        },
    }
};
