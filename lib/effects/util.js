const child_process = require('child_process');

exports.exec = (command, options = {}) => new Promise((resolve, reject) => {
    child_process.exec(command, options, (error, stdout) => {
        if (error) {
            reject(error);
        } else {
            resolve(stdout);
        }
    });
});
