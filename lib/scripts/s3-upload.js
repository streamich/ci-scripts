/* eslint-disable filenames/match-exported */
const evalParam = require('../evalParam');

const s3Upload = async (ci, params) => {
    const s3Config = {
        s3Options: {},
    };

    const accessKeyId = evalParam(ci, params.accessKeyId);
    const secretAccessKey = evalParam(ci, params.secretAccessKey);
    const bucket = evalParam(ci, params.bucket);
    const deleteRemoved = evalParam(ci, params.deleteRemoved);
    const localDir = evalParam(ci, params.localDir);
    const prefix = evalParam(ci, params.prefix); // "some/remote/dir/"

    if (params.accessKeyId) {
        s3Config.s3Options.accessKeyId = params.accessKeyId;
    }

    if (params.secretAccessKey) {
        s3Config.s3Options.secretAccessKey = params.secretAccessKey;
    }

    const client = s3.createClient(s3Config);

    const uploadConfig = {
        localDir,
        deleteRemoved: Boolean(evalParam(ci, params.deleteRemoved)),
        s3Params: {
            Bucket: bucket,
            Prefix: prefix,
            // other options supported by putObject, except Body and ContentLength.
            // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property
        },
    };

    const uploader = client.uploadDir(uploadConfig);

    return new Promise((resolve, reject) => {
        uploader.on('error', (err) => {
            console.error("unable to sync:", err.stack);
        });

        uploader.on('progress', () => {
            console.log("progress", uploader.progressAmount, uploader.progressTotal);
        });

        uploader.on('end', () => {
            console.log("done uploading");
        });
    });
};

module.exports = s3Upload;
