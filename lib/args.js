'use strict';

var args    = process.argv.slice(2);

var argv = require('yargs')
    .usage('index.js <command>')
    .command('drop', 'Drop the current database', function(yargs){
        argv = yargs
            .argv
    })
    .command('exec', 'Execute a js sample to the current database', function(yargs){
        argv = yargs
            .option('s', {
                alias: 'sample',
                demand: true,
                type: 'string',
                describe: 'Path to js sample to read and execute',
            })
            .check(checkSample)
            .argv
    })
    .demand(1, 1) // demand at least one argv._ non option (command)
    .option('c', {
        alias: 'config',
    })
    //.demand('c')
    .check(checkCommand)
    .strict()
    .argv;

/**
 * Check if -sample path is correct
 * @param argv
 * @param options
 * @returns {boolean}
 */
function checkSample(argv, options){
    try{
        require(argv.sample);
    }
    catch(err){
        throw new Error('The sample path is invalid. You have to provide valid js file path (path:' + argv.sample + ')');
    }
    return true;
}

/**
 * Check if -action is valid
 * @param argv
 * @param options
 */
function checkCommand(argv, options){
    var validAction = ['exec', 'drop'];
    var command = argv._[0];
    console.log(argv);
    if(validAction.indexOf(command) === -1){
        throw new Error('The command is invalid (action:' + command + ')');
    }
    return true;
}

module.exports = argv;