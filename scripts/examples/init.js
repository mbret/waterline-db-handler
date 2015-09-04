/**
 * Created by bretm on 8/11/2015.
 */
var path                    = require('path');
var UserRole                = require(path.join(process.env.APP_ROOT_PATH, 'api', 'models', 'UserRole.js'));
var User                    = require(path.join(process.env.APP_ROOT_PATH, 'api', 'models', 'User.js'));
var UserPassport            = require(path.join(process.env.APP_ROOT_PATH, 'api', 'models', 'UserPassport.js'));
var util                    = require('util');

module.exports = function(connection){

    var queries = [];

    queries.push({
        sql: util.format('INSERT INTO `%s` (`%s`, `%s`, `%s`) VALUES (?, ?, ?);',
            UserRole.tableName,
            UserRole.attributes.id.columnName,
            UserRole.attributes.name.columnName,
            UserRole.attributes.displayName.columnName),
        values: [
            [1, 'admin', 'Administrator'],
            [2, 'user', 'User']
        ]
    });

    queries.push({
        sql: util.format('INSERT INTO `%s` (`%s`, `%s`, `%s`, `%s`, `%s`, `%s`, `%s`, `%s`) VALUES (?, ?, ?, ?, ?, ?, ?, ?);',
            User.tableName,
            User.attributes.createdAt.columnName,
            User.attributes.updatedAt.columnName,
            User.attributes.id.columnName,
            User.attributes.email.columnName,
            User.attributes.firstName.columnName,
            User.attributes.lastName.columnName,
            User.attributes.role.columnName,
            User.attributes.phone.columnName),
        values: [
            ['2015-08-10 22:50:30', '2015-08-10 22:50:38', 2, 'user@user.com', 'User', 'User', 2, null],
        ]
    });

    queries.push({
        sql: util.format('INSERT INTO `%s` (`%s`, `%s`, `%s`, `%s`, `%s`, `%s`, `%s`, `%s`, `%s`, `%s`, `%s`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
            UserPassport.tableName,
            UserPassport.attributes.protocol.columnName,
            UserPassport.attributes.password.columnName,
            UserPassport.attributes.provider.columnName,
            UserPassport.attributes.identifier.columnName,
            UserPassport.attributes.accessToken.columnName,
            UserPassport.attributes.resetPasswordToken.columnName,
            UserPassport.attributes.resetPasswordTokenExpires.columnName,
            UserPassport.attributes.user.columnName,
            UserPassport.attributes.id.columnName,
            UserPassport.attributes.createdAt.columnName,
            UserPassport.attributes.updatedAt.columnName),
        values: [
            ['local', '$2a$10$YToL4y/wm.qltR5dZ.hwOO356SOEE4LLFE.Fjqt9i914wHijNgHpK', null, null, null, null, null, 2, 1, '2015-08-10 22:50:30', '2015-08-10 22:50:30'],
        ]
    });

    var promises = [];
    queries.forEach(function(object){
        object.values.forEach(function(value){
            promises.push(
                new Promise(function(resolve, reject){
                    connection.query({
                        sql: object.sql,
                        values: value
                    }, function (error, results, fields) {
                        if(error){
                            return reject(error);
                        }
                        return resolve();
                    })
                })
            );
        });
    });

    return Promise.all(promises);

};