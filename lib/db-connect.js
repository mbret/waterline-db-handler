(function(){
    'use strict';

    var _           = require('lodash');
    var path        = require('path');
    var fs          = require('fs');
    var mysql       = require('mysql');
    var UserError   = require(path.join(process.env.LIB_PATH, 'user-error.js'));
    var script      = require(process.env.SCRIPT_PATH);

    module.exports = function(config, cb){

        try{
            var connectionConfig = _extractConnectionConfig(config);
        }
        catch(err){
            cb(new Error("Unable to use your sails config to connect to host. Here is the error: " + err.message));
        }

        var connection = mysql.createConnection({
            host     : connectionConfig.host,
            user     : connectionConfig.user,
            password : connectionConfig.password,
            database : connectionConfig.database
        });

        script.on('shutdown', function(){
            connection.end(function(err){
                script.logger.debug('The connection to the database %s has been closed', connectionConfig.database);
            });
        });

        connection.connect(function(err){
            if(err){
                return cb(err);
            }
            script.logger.debug('The connection to the database %s has been established', connectionConfig.database);
            cb(null, connection);
        });

    };

    function _extractConnectionConfig(config){

        var connectionConfig = null;
        var connectionName = null;

        // Specific connection set as arg
        if(config.connection){
            connectionName = config.connection;
        }
        else{
            if(!config.userConfig.models.connection){
                throw new Error('No models.connection are set. Set a mysql connection or specify connection to use as argument');
            }
            else{
                connectionName = config.userConfig.models.connection;
            }
        }

        connectionConfig = config.userConfig.connections[connectionName];
        if(connectionConfig === null || _.isUndefined(connectionConfig)){
            throw new Error("The connection specified as argument doesn't exist or is not related to mysql. Use a valid mysql connection or set models.connection");
        }

        if(connectionConfig.adapter !== 'sails-mysql'){
            throw new Error("The connection set is not relative to mysql. Set a mysql connection or specify connection to use as argument");
        }

        return connectionConfig;
    }

})();