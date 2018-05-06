const minimist = require('minimist');
const executeCommand = require('./executeCommand');

const main = async () => {
    const {_: commands, ...params} = minimist(process.argv.slice(2));

    try {
        const result = await executeCommand(commands, params);

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
