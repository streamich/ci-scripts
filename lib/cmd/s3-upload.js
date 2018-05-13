/* eslint-disable filenames/match-exported */
const s3UploadDir = require('../effects/s3UploadDir');
const evalParam = require('../evalParam');

/// Uploads a folder and all its files recursively to a destination
/// in a S3 bucket.
const s3Upload = (ci) => {
    const {params} = ci;
    const bucket = evalParam(ci, params.bucket);
    const src = evalParam(ci, params.localDir) || 'dist/';

    if (!bucket || (typeof bucket !== 'string')) {
        throw new TypeError('Bucket not specified or not a string.');
    }

    if (!src || (typeof src !== 'string')) {
        throw new TypeError('Directory not specified or not a string.');
    }

    /// - `accessKeyId` &mdash; optional, AWS access key id.
    /// - `secretAccessKey` &mdash; optional, AWS secrekt key.
    /// - `src` &mdash; optional, source folder to upload, defaults to `dist/`.
    /// - `bucket` &mdash; required, S3 bucket name.
    /// - `dest` &mdash; optional, S3 destination path, defaults to '""'.
    /// - `acl` &mdash; optional, access rights to all uploaded objects.
    /// - `delete` &mdash; optional, whether to delete old files on S3, defaults to `false`.
    const config = {
        accessKeyId: evalParam(ci, params.accessKeyId),
        secretAccessKey: evalParam(ci, params.secretAccessKey),
        region: evalParam(ci, params.region),
        src,
        bucket,
        dest: evalParam(ci, params.dest) || '',
        acl: evalParam(ci, params.acl) || undefined,
        delete: Boolean(evalParam(ci, params.delete)),
    };

    return s3UploadDir(ci, params, config);
};

module.exports = s3Upload;
