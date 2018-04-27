module.exports = {
    UPLOAD_PATH: 'XXXX',
    AWS_CLOUD_FRONT: 'XXXX',

    slack: {
        params: {
            webhook: 'https://hooks.slack.com/services/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',
            text: ({PROJECT_NAME, BUILD_BRANCH, AWS_CLOUD_FRONT, UPLOAD_PATH}) => {
                const url = `https://${AWS_CLOUD_FRONT}${UPLOAD_PATH}`;

                return `${'`' + PROJECT_NAME + '`'} deployed ${'`' + BUILD_BRANCH + '`'} branch: ${url}`;
            },
        },
    }
};
