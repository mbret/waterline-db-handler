'use strict';

var path    = require('path');
var args    = process.argv.slice(2);

// sails env
var e = {
    alias: 'env',
    type: 'string',
    describe: 'Environment to use (used to detect sails config)',
    demand: true,
    choices: ['production', 'development', 'testing']
};
// sample to execute
var s = {
    alias: 'script',
    demand: true,
    type: 'string',
    describe: 'Script path to execute',
};
var c = {
    alias: 'connection',
    demand: false,
    type: 'string',
    describe: 'Connection name to use with your config (You should use a valid connection name available in /config/connection.js)',
};

var argv = require('yargs')
    .usage('index.js <command>')
    .command('drop', 'Drop the current database', function(yargs){
        yargs
            .option('e', e)
            .option('c', c);
    })
    .command('init', 'Initialize the current database', function(yargs){
        yargs
            .option('e', e)
            .option('c', c);
    })
    .command('exec', 'Execute a js sample to the current database', function(yargs){
        yargs
            .option('s', s)
            .option('e', e)
            .option('c', c)
            .check(checkSample);
    })
    .demand(1, 1) // demand at least one argv._ non option (command)
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
    var correctPath = path.resolve(process.cwd(), argv.s);
    try{
        require(correctPath);
    }
    catch(err){
        throw new Error('The script path is invalid. You have to provide valid js file path (path:' + correctPath + ')');
    }
    return true;
}

/**
 * Check if -action is valid
 * @param argv
 * @param options
 */
function checkCommand(argv, options){
    var validAction = ['exec', 'drop', 'init'];
    var command = argv._[0];
    if(validAction.indexOf(command) === -1){
        throw new Error('The command is invalid (action:' + command + ')');
    }
    return true;
}

module.exports = argv;