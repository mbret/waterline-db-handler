(function(){
    'use strict';

    var path = require('path');
    var _ = require('lodash');
    var fs = require('fs');
    var internalConfig  = require(path.join(__dirname, '..', 'config.js'));

    module.exports = function(adapter, argv){

        var adapters = {

            "sails": {

                sailsPath: argv.path,
                env: argv.env,

                /**
                 * Load the user config
                 * @returns {*}
                 */
                loadConfig: function(){
                    var configEnvPath   = path.join(this.sailsPath, 'config', 'env', this.env);
                    var configPath      = path.join(this.sailsPath, 'config');
                    var envConfig       = _loadConfig(configEnvPath);
                    var globalConfig    = _.merge(_loadConfig(configPath), envConfig);
                    this.prepareUserConfig(globalConfig);
                    return globalConfig;
                },

                /**
                 * Prepare the internal config
                 * @returns {*}
                 */
                prepareInternalConfig: function(){
                    var self = this;
                    return _.merge(internalConfig, {
                        modelsPath: path.join(self.sailsPath, 'api', 'models'),
                        sailsPath: self.sailsPath,
                        samplePath: argv.sample,
                        usingSails: argv.sails,
                        servicesPath: path.join(self.sailsPath, 'api', 'services')
                    });
                },

                /**
                 * Validate the user config
                 * @param userConfig
                 * @returns {boolean}
                 */
                validateUserConfig: function(userConfig){
                    var shouldContain = [

                    ];
                    var ok = true;
                    shouldContain.forEach(function(key){
                        if(!userConfig.hasOwnProperty(key)){
                            ok = false;
                        }
                    });
                    return ok;
                },

                /**
                 * Prepare user config.
                 * Will set what is missing. For example sails doesn't need config.adapters because it handle it automatically with
                 * config.connections and their adapter.
                 */
                prepareUserConfig: function(config){
                    if(!config.adapters){
                        config.adapters = {};
                    }
                }
            },

            "standalone": {

            }
        };

        return adapters[adapter];
    };


    /**
     * Load dynamically config files following sails behaviour.
     * This function can be used to load testing config files. It will load every files present inside directory.
     *
     * @param string path Path for the testing configuration. Ex: /root/config/env/testing
     */
    function _loadConfig(configPath){

        // try to load one file
        if(path.extname(configPath) === '.js'){
            return require(configPath);
        }
        // try to load config folder
        else{
            var config = {};
            var files = fs.readdirSync(configPath);
            files = files.filter(function(entry){
                return path.extname(entry) === '.js';
            });
            files.forEach(function(filePath){
                var file = require(path.join(configPath, filePath));
                config = _.merge(config, file);
            });

            // load specific env config
            return config;
        }
    }

})();