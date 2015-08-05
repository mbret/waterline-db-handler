'use strict';

var args    = process.argv.slice(2);
// standalone config
var c = {
    alias: 'config',
    describe: 'Path to the user env sails config',
    type: 'string',
    demand: true
};
// sails env
var e = {
    alias: 'env',
    type: 'string',
    describe: 'Environment to use (used to detect sails config)',
    demand: true,
    choices: ['production', 'development', 'testing']
};
// sails path
var p = {
    alias: 'path',
    describe: 'Path to the sails root folder',
    demand: true
};
// sample to execute
var s = {
    alias: 'sample',
    demand: true,
    type: 'string',
    describe: 'Path to js sample to read and execute',
};
// sails option
var sails = {
    type: 'boolean',
    demand: false,
    describe: 'Activate sails support',
    default: false
};

var argv = require('yargs')
    .usage('index.js <command>')
    .command('drop', 'Drop the current database', function(yargs){
        if(yargs.argv.sails === true){
            yargs
                .option('p', p)
                .option('e', e)
                .check(checkSailsPath);
        }
        else{
            yargs
                .option('c', c)
                .check(checkConfig);
        }
    })
    .command('exec', 'Execute a js sample to the current database', function(yargs){
        yargs
            .option('s', s)
        if(yargs.argv.sails === true){
            yargs
                .option('p', p)
                .option('e', e)
                .check(checkSailsPath);
        }
        else{
            yargs
                .option('c', c)
                .check(checkConfig);
        }
        yargs
            .check(checkSample);
    })
    .demand(1, 1) // demand at least one argv._ non option (command)
    .option('sails', sails)
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

/**
 * Check if the -config path is correct
 * @param argv
 * @param options
 */
function checkConfig(argv, options){
    try{
        var config = require('./config-loader.js')(argv.config);
    }
    catch(err){
        throw new Error('The config path is invalid. You have to provide valid folder path (path:' + argv.config + ')');
    }
    return true;
}

function checkSailsPath(argv, options){
    return true;
}

module.exports = argv;