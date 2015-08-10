(function(){
    'use strict';

    var logger  = require('./logger.js');
    var loader  = require('./database-load.js');

    module.exports = function(internalConfig, userConfig){

        return {
            run: function(){
                return new Promise(function(resolve, reject){

                    _overwriteUserConfig(userConfig);

                    loader(internalConfig, userConfig, function(err, models){
                        if(err){
                            return reject(err);
                        }

                        return resolve('Database dropped!');
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
        userConfig.models.migrate = 'drop';
    }
})();
