/**
 * Created by bretm on 8/3/2015.
 */
var path = require('path');
var diskAdapter = require('sails-disk');

module.exports = {
    configPath: path.join(__dirname, '..', '..', 'config'),
    modelsPath: path.join(__dirname, '..', '..', 'api', 'models'),
    samplePath: path.join(__dirname, 'sample.js'),

    waterline: {
        // Setup Adapters
        // Creates named adapters that have have been required
        adapters: {
            disk: diskAdapter,
        },

        connections: {
            localDiskDb: {
                adapter: 'disk',
                filePath : path.join(__dirname, '..', '..', '.tmp') + path.sep
            },
        },

        models: {
            connection: 'localDiskDb'
        },

        defaults: {
            migrate: 'alter'
        }
    }

};