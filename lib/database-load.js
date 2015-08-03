(function(){
    'use strict';

    module.exports = function(config, cb){
        var _ = require('lodash');
        var Waterline = require('waterline');
        var path = require('path');
        var fs = require('fs');

        // export globals like sails (for models)
        global._ = _;

        // Instantiate a new instance of the ORM
        var waterline  = new Waterline();

        var files = fs.readdirSync(config.modelsPath);
        files = files.filter(function(entry){
            return path.extname(entry) === '.js';
        });

        var modelFileMapper = [];

        files.forEach(function(file){
            var model = require(path.join(config.modelsPath, file));
            // only load valid models
            if(model.tableName){
                if(!model.connection){
                    model.connection = 'localDiskDb';
                }
                if(!model.migrate){
                    model.migrate = config.waterline.models.migrate
                }
                // Load the Models into the ORM
                waterline.loadCollection(Waterline.Collection.extend(model));

                modelFileMapper[model.identity] = path.basename(file, '.js');
            }
        });

        // Start Waterline passing adapters in
        waterline.initialize(config.waterline, function(err, models) {

            if(!err) console.log('Waterline connected');

            // exports all models
            global.Models = {};
            Object.keys(models.collections).forEach(function(key){
                global.Models[modelFileMapper[key]] = models.collections[key];
            });

            return cb(err, models.collections)
        });
    };

})();