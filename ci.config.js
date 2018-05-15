module.exports = {
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
    cmd: {
        test: {
            params: {
                command: './switch.sh',
                args: ['prod', 'web'],
                env: ({PROJECT_NAME, BUILD_VERSION}) => ({
                    NEW_KEY: `builds/${PROJECT_NAME}/${BUILD_VERSION}`
                }),
            }
        },
        year: {
            params: {
                command: 'printenv',
                args: 'YEAR'
            }
        }
    },
};
