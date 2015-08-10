(function(){
    'use strict';

    var logger  = require('./logger.js');
    var loader  = require('./database-load.js');

    module.exports = function(internalConfig, userConfig, sample){

        return {
            run: function(){
                return new Promise(function(resolve, reject){

                    _overwriteUserConfig(userConfig);

                    var sample = require(internalConfig.samplePath);

                    loader(internalConfig, userConfig, function(err, models){
                        if(err){
                            return reject(err);
                        }

                        return sample()
                            .then(function(){
                                resolve('Sample executed with success');
                            });
                    });
                });
            }
        }
    };

    /**
     * Overwrite user config in order to process the command.
     * @param userConfig
     * @returns {*}
     * @private
     */
    function _overwriteUserConfig(userConfig){

    }
})();
