/**
 * Created by bretm on 8/11/2015.
 */
var path                    = require('path');
var UserRole                = require(path.join(process.env.APP_ROOT_PATH, 'api', 'models', 'UserRole.js'));
var User                    = require(path.join(process.env.APP_ROOT_PATH, 'api', 'models', 'User.js'));
var UserPassport            = require(path.join(process.env.APP_ROOT_PATH, 'api', 'models', 'UserPassport.js'));
var util                    = require('util');

module.exports = function(connection){

    var queries = [
        util.format("TRUNCATE `%s`", UserRole.tableName),
        util.format("TRUNCATE `%s`", User.tableName),
        util.format("TRUNCATE `%s`", UserPassport.tableName)
    ];

    var promises = [];
    queries.forEach(function(query){
        promises.push(
            new Promise(function(resolve, reject){
                connection.query(query, function(err, rows, fields) {
                    if(err){
                        return reject(err);
                    }
                    return resolve();
                });
            })
        );
    });

    return Promise.all(promises);

};