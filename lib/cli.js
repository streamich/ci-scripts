const minimist = require('minimist');
const exec = require('./exec');

const main = async () => {
    const {_: commands, ...params} = minimist(process.argv.slice(2));

    try {
        const result = await exec(commands, params);

        if (result) {
            // eslint-disable-next-line no-console
            console.log(result);
        }
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        // eslint-disable-next-line no-process-exit
        process.exit(1);
    }
};

main();
