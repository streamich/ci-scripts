/* eslint-disable filenames/match-exported */
const s3UploadDir = require('../effects/s3UploadDir');

/// Uploads a folder and all its files recursively to a destination
/// in a S3 bucket.
const s3Upload = (ci) => {
    const {params} = ci;
    const bucket = params.bucket;
    const src = params.localDir || 'dist/';

    if (!bucket || (typeof bucket !== 'string')) {
        throw new TypeError('Bucket not specified or not a string.');
    }

    if (!src || (typeof src !== 'string')) {
        throw new TypeError('Directory not specified or not a string.');
    }

    /// - `--accessKeyId` &mdash; optional, AWS access key id.
    /// - `--secretAccessKey` &mdash; optional, AWS secrekt key.
    /// - `--src` &mdash; optional, source folder to upload, defaults to `dist/`.
    /// - `--bucket` &mdash; required, S3 bucket name.
    /// - `--dest` &mdash; optional, S3 destination path, defaults to '""'.
    /// - `--acl` &mdash; optional, access rights to all uploaded objects.
    /// - `--delete` &mdash; optional, whether to delete old files on S3, defaults to `false`.
    const config = {
        accessKeyId: params.accessKeyId,
        secretAccessKey: params.secretAccessKey,
        region: params.region,
        src,
        bucket,
        dest: params.dest || '',
        acl: params.acl || undefined,
        delete: Boolean(params.delete),
    };

    return s3UploadDir(ci, config);
};

module.exports = s3Upload;
