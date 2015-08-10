/**
 * Created by bretm on 8/3/2015.
 */
var path = require('path');
//var diskAdapter = require('sails-disk');

module.exports = {

    modelsPath: null, // st later

    models: {
        migrate: 'safe' // always use safe by default
    }

    //configPath: path.join(__dirname, '..', '..', 'config'),
    //modelsPath: path.join(__dirname, '..', '..', 'api', 'models'),
    //
    //waterline: {
    //    // Setup Adapters
    //    // Creates named adapters that have have been required
    //    adapters: {
    //        disk: diskAdapter,
    //    },
    //
    //    connections: {
    //        localDiskDb: {
    //            adapter: 'disk',
    //            filePath : path.join(__dirname, '..', '..', '.tmp') + path.sep
    //        },
    //    },
    //
    //    models: {
    //        connection: 'localDiskDb'
    //    },
    //
    //    defaults: {
    //        migrate: 'alter'
    //    }
    //}

};