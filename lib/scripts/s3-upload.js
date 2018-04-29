/* eslint-disable filenames/match-exported */
const s3UploadDir = require('../effects/s3UploadDir');
const evalParam = require('../evalParam');

const s3Upload = (ci, params) => {
    const config = {
        accessKeyId: evalParam(ci, params.accessKeyId),
        secretAccessKey: evalParam(ci, params.secretAccessKey),
        bucket: evalParam(ci, params.bucket),
        acl: evalParam(ci, params.acl) || undefined,
        deleteRemoved: Boolean(evalParam(ci, params.deleteRemoved)),
        localDir: evalParam(ci, params.localDir) || 'dist/',
        prefix: evalParam(ci, params.prefix) || '',
    };

    return s3UploadDir(ci, params, config);
};

module.exports = s3Upload;
