const http = require('http');
const https = require('https');
const util = require('util');
const s3 = require('s3');
const chalk = require('chalk');
const evalParam = require('../evalParam');

http.globalAgent.maxSockets = https.globalAgent.maxSockets = 20;

const s3UploadDir = (ci, params, config) => {
    const {
        accessKeyId,
        secretAccessKey,
        bucket,
        acl,
        deleteRemoved,
        localDir,
        prefix,
    } = config;

    if (!bucket || (typeof bucket !== 'string')) {
        throw new TypeError('Bucket not specified or not a string.');
    }

    if (!localDir || (typeof localDir !== 'string')) {
        throw new TypeError('Directory not specified or not a string.');
    }

    if (params.plan) {
        // eslint-disable-next-line no-console
        console.log(chalk.cyan.bold('\n    Wil upload to S3:\n'));
        // eslint-disable-next-line no-console
        console.log(util.inspect(config, {
            colors: true,
            depth: 10
        }));

        return undefined;
    }

    const isVerbose = evalParam(ci, params.verbose);

    const s3Config = {
        s3Options: {},
    };

    if (accessKeyId) {
        s3Config.s3Options.accessKeyId = params.accessKeyId;
    }

    if (secretAccessKey) {
        s3Config.s3Options.secretAccessKey = params.secretAccessKey;
    }

    const client = s3.createClient(s3Config);
    const uploader = client.uploadDir({
        localDir,
        deleteRemoved,
        s3Params: {
            Bucket: bucket,
            Prefix: prefix,
            ACL: acl,
            // other options supported by putObject, except Body and ContentLength.
            // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property
        },
    });

    if (isVerbose) {
        // eslint-disable-next-line no-console
        console.log('Uploading to S3:');
        // eslint-disable-next-line no-console
        console.log(config);
    }

    return new Promise((resolve, reject) => {
        uploader.on('error', (error) => {
            if (isVerbose) {
                // eslint-disable-next-line no-console
                console.log('Error happened:');
                // eslint-disable-next-line no-console
                console.log(error);
            }

            reject(error);
        });

        uploader.on('end', () => {
            if (isVerbose) {
                // eslint-disable-next-line no-console
                console.log('Done uploading to S3.');
            }
        });

        if (isVerbose) {
            uploader.on('progress', () => {
                // eslint-disable-next-line no-console
                console.log('Progress:', uploader.progressAmount, uploader.progressTotal);
            });
        }
    });
};

module.exports = s3UploadDir;
