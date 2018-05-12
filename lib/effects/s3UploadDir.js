/* eslint-disable no-console */
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
        region,
        src,
        bucket,
        dest,
        acl,
        delete: deleteRemoved,
    } = config;

    if (params.plan) {
        console.log(chalk.cyan.bold('\n    Will upload to S3:\n'));
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
        s3Config.s3Options.accessKeyId = accessKeyId;
    }

    if (secretAccessKey) {
        s3Config.s3Options.secretAccessKey = secretAccessKey;
    }

    if (region) {
        s3Config.s3Options.region = region;
    }

    const client = s3.createClient(s3Config);
    const uploadConfig = {
        localDir: src,
        deleteRemoved,
        s3Params: {
            Bucket: bucket,
            Prefix: dest,
            ACL: acl,
            // other options supported by putObject, except Body and ContentLength.
            // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property
        },
    };
    const uploader = client.uploadDir(uploadConfig);

    if (isVerbose) {
        console.log('Uploading to S3:');
        console.log(config);
    }

    return new Promise((resolve, reject) => {
        uploader.on('error', (error) => {
            if (isVerbose) {
                console.log('Error happened:');
                console.log(error);
            }

            reject(error);
        });

        uploader.on('end', () => {
            if (isVerbose) {
                console.log('Done uploading to S3.');
            }
        });

        if (isVerbose) {
            uploader.on('progress', () => {
                console.log('Progress:', uploader.progressAmount, uploader.progressTotal);
            });
        }
    });
};

module.exports = s3UploadDir;
