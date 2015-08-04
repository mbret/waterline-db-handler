(function(){
    'use strict';

    var fs      = require('fs');
    var path    = require('path');
    var util    = require('util');
    var config  = require(path.join(__dirname, 'config.js'));
    var loader  = require('./lib/database-load.js');
    var logger  = require('./lib/logger.js');

    displayHeader();

    var argv    = require('./lib/args.js')

    var command = argv._[0];

    displayScriptInfo(command);

    logger.yellow('Script starting..');
    switch(command){
        case 'exec':
            var sample = require(argv.sample);
            loader(config, function(err, models){
                if(err) throw err;

                require('./lib/provider.js')(sample);
            });
            break;
        case 'drop':
            config.waterline.models.migrate = 'drop';
            loader(config, function(err, models){
                if(err) throw err;
                logger.yellow('Database dropped!');
            });
            break;
        default:
            break;
    }

    function displayHeader(){
        logger.green('');
        logger.green('-------------------------------------');
        logger.green('');
        logger.green('   - Waterline database handler -');
        logger.green('   Prepare to destroy the server!');
        logger.green('');
        logger.green('--------------------------------------');
        logger.green('');
    }

    function displayScriptInfo(command){
        logger.green('Here are some information about your current command:');
        logger.green('- command: %s', command);
        logger.green('');
    }


})();