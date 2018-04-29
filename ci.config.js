module.exports = {
    slack: {
        params: {
            webhook: '',
        },
    },
    'github-post': {
        params: {
            token: ''
        }
    },
    's3-upload': {
        params: {
            bucket: 'ci-scripts-test',
            acl: 'public-read',
            deleteRemoved: true,
        },
        fonts: {
            params: {
                localDir: 'fonts/',
                prefix: 'lol/fonts',
            }
        }
    },
};
