(function(){
    'use strict';

    var winston = require('winston');
    var util    = require('util');
    var args    = process.argv.slice(2);

    var logger = new (winston.Logger)({
        levels: {
            green: 0,
            yellow: 1,
            red: 3
        },
        transports: [
            new (winston.transports.Console)({
                showLevel: false,
                colorize: false,
                level: 'green'
            }),
        ],
    });
    // https://coderwall.com/p/yphywg/printing-colorful-text-in-terminal-when-run-node-js-script
    var fontColors = {
        green:  '\x1b[32m%s\x1b[0m',
        red:    '\x1b[41m\x1b[37m%s\x1b[0m',
        yellow: '\x1b[33m%s\x1b[0m',
    }
    logger.addFilter(function(msg, meta, level) {
        return util.format(fontColors[level], msg);
    });

    // singleton
    exports = module.exports = logger;
})();