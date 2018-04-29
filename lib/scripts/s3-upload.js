/* eslint-disable filenames/match-exported */
const uploadToS3 = require('../effects/uploadToS3');
const evalParam = require('../evalParam');

const s3Upload = (ci, params) => {
    const config = {
        accessKeyId: evalParam(ci, params.accessKeyId),
        secretAccessKey: evalParam(ci, params.secretAccessKey),
        bucket: evalParam(ci, params.bucket),
        deleteRemoved: evalParam(ci, params.deleteRemoved),
        localDir: evalParam(ci, params.localDir),
        prefix: evalParam(ci, params.prefix) || 'dist/',
    };

    return uploadToS3(ci, params, config);
};

module.exports = s3Upload;
