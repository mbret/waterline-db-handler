(function(){
    'use strict';

    var fs              = require('fs');
    var path            = require('path');
    var util            = require('util');
    var internalConfig  = require(path.join(__dirname, 'config.js'));
    var loader          = require('./lib/database-load.js');
    var logger          = require('./lib/logger.js');
    var configLoader    = require('./lib/config-loader.js');

    displayHeader();

    var argv    = require('./lib/args.js')

    var command = argv._[0];

    // Retrieve user specific config
    var userConfig = configLoader(argv.config);
    // We now have a valid config to connect to the user sails database
    var config = mergeConfig(internalConfig, userConfig);

    displayScriptInfo(command);

    logger.yellow('Script starting..');
    switch(command){
        case 'exec':
            var sample = require(argv.sample);
            loader(config, function(err, models){
                if(err) throw err;

                require('./lib/database-provider.js')(sample);
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

    /**
     * Merge the user config with the package config to create a valid config.
     * This config is then used to connect to waterline etc.
     * @param internalConfig
     * @param userConfig
     */
    function mergeConfig(internalConfig, userConfig){
        return internalConfig;
    }

})();