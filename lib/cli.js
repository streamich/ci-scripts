const minimist = require('minimist');
const exec = require('./exec');

/* eslint-disable no-console, no-process-exit */
const main = async () => {
    const {_: commands, ...params} = minimist(process.argv.slice(2));

    try {
        const result = await exec(commands, params);

        if (result) {
            console.log(result);
        }

        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

main();
