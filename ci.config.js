module.exports = {
    'github-post': {
        params: {
            token: ''
        }
    },
    's3-upload': {
        params: {
            bucket: 'ci-scripts-test',
            acl: 'public-read',
            delete: true,
        },
        fonts: {
            params: {
                src: 'fonts/',
                dest: 'lol/fonts',
            }
        }
    },
};
