(function(){
    'use strict';

    var winston = require('winston');
    var util    = require('util');
    var chalk = require('chalk');
    var args    = process.argv.slice(2);

    var logger = new (winston.Logger)({
        transports: [
            new (winston.transports.Console)({
                showLevel: false,
                colorize: false,
                level: 'silly',
                debugStdout: true
            }),
        ],
    });

    logger.addFilter(function(msg, meta, level) {
        return stylize(msg, level);
    });

    // singleton http://fredkschott.com/post/2013/12/node-js-cookbook---designing-singletons/
    module.exports = logger;

    function stylize(msg, level){
        switch(level){
            case 'silly':
                return chalk.blue.bold(msg);
            case 'debug':
                return chalk.yellow(msg);
            case 'error':
                return chalk.red.inverse(msg);
            case 'info':
                return chalk.green.bold(msg);
            default:
                return msg;
        }
    }
})();