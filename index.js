#! /usr/bin/env node

(function(){
    'use strict';

    var _               = require('lodash');
    var fs              = require('fs');
    var path            = require('path');
    var util            = require('util');
    var loader          = require('./lib/database-load.js');
    var logger          = require('./lib/logger.js');
    var UserError       = require('./lib/error.js');

    logger.green('');
    logger.green('-------------------------------------');
    logger.green('');
    logger.green('   - Waterline database handler -');
    logger.green('   Prepare to destroy the server!');
    logger.green('');
    logger.green('--------------------------------------');
    logger.green('');

    var argv            = require('./lib/args.js');
    var command         = argv._[0];

    // Get a config helper with either support for sails or standalone
    var configHelper    = require('./lib/config-helper.js')(argv.sails ? "sails" : "standalone", argv);

    // Prepare internal config
    var internalConfig = configHelper.prepareInternalConfig(argv);

    // Load user config
    try{
        var userConfig = configHelper.loadConfig(argv);
    }
    catch(err){
        logger.red("We were unable to load your %sconfig", internalConfig.usingSails ? 'sails ' : null);
        process.exit();
    }

    // Validate user config
    if(!configHelper.validateUserConfig(userConfig)){
        logger.red("Your %sconfig seems invalid or doesn't contain minimal settings required", internalConfig.usingSails ? 'sails ' : null);
        process.exit();
    }

    // Change current directory if using sails. It avoid problem with relative path if user is using.
    if(internalConfig.usingSails){
        process.chdir(internalConfig.sailsPath);
        logger.yellow("The process changed its current directory to your sails app directory. This way if you\n" +
            "are using relative path in your application the script will work.");
    }

    logger.green('Here are some information about your current script command:');
    logger.green('- command     : %s', command);
    logger.green('- sails path  : %s', path.resolve(internalConfig.sailsPath));
    logger.green('- models path : %s', path.resolve(internalConfig.modelsPath));
    logger.green('');
    logger.yellow('Script starting..');

    // Prepare the action
    // Will do some stuff depending of the command
    var actionHandler = null;
    switch(command){
        case 'exec':
            actionHandler = require('./lib/database-provider.js')(internalConfig, userConfig);
            break;
        case 'drop':
            actionHandler = require('./lib/database-drop.js')(internalConfig, userConfig);
            break;
        default:
            break;
    }

    // Run the main action
    actionHandler
        .run()
        .then(function(message){
            logger.flash(message);
            logger.flash('Script completed with all the great success you deserve');
        })
        .catch(function(err){
            if(err instanceof UserError){
                logger.red(err.message);
            }
            else{
                logger.red("An internal error occured, here is the stack (yes deal with it!):");
                console.error(err.stack);
            }
        });

})();