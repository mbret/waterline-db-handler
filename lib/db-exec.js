(function(){
    'use strict';

    var path        = require('path');
    var util        = require('util');
    var _           = require('lodash');
    var dbConnect   = require(path.join(process.env.LIB_PATH, 'db-connect.js'));
    var UserError   = require(path.join(process.env.LIB_PATH, 'user-error.js'));

    module.exports = function(config, scriptPath){
        return {
            run: function(){
                return new Promise(function(resolve, reject){

                    dbConnect(config, function(err, connection){
                        if(err){
                            return reject(err);
                        }

                        var script = require(scriptPath);
                        try{
                            script(connection)
                                .then(function(){
                                    return resolve('Script executed');
                                })
                                .catch(function(err){
                                    reject(new UserError(err));
                                });
                        }
                        catch(err){
                            return reject(err);
                        }

                    });

                });
            }
        }
    };

})();