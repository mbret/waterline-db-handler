(function(){
    'use strict';

    var _               = require('lodash');
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

    // Load user config
    try{
        var userConfig = argv.sails ? configLoader.loadConfigFromSails(argv.path, argv.env) : configLoader.loadConfig(argv.config);
    }
    catch(err){
        logger.red("We were unable to load your %sconfig", argv.sails ? 'sails ' : null);
        process.exit();
    }
    // Validate user config
    if(!isConfigValid(userConfig)){
        logger.red("Your %sconfig seems invalid or doesn't contain minimal settings required", argv.sails ? 'sails ' : null);
        process.exit();
    }
    // Build script config with user config and internal config
    var config = mergeConfig(internalConfig, userConfig);

    displayScriptInfo(command);

    logger.yellow('Script starting..');

    console.log(config);
    switch(command){
        case 'exec':
            var sample = require(argv.sample);
            require('./lib/database-provider.js')(config, sample);
            break;
        case 'drop':
            require('./lib/database-drop.js')(config);
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
        return _.merge(internalConfig, {
            modelPath: ''
        });
    }



    function isConfigValid(userConfig){
        var shouldContain = [

        ];
        var ok = true;
        shouldContain.forEach(function(key){
            if(!userConfig.hasOwnProperty(key)){
                ok = false;
            }
        })
        return ok;
    }

})();