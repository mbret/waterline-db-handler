(function(){
    'use strict';

    var logger  = require('./logger.js');
    var _           = require('lodash');
    var Waterline   = require('waterline');
    var path        = require('path');
    var fs          = require('fs');
    var UserError   = require('./error.js');

    // @todo loader adapter for sails / without sails
    module.exports = function(internalConfig, userConfig, cb){

        // export globals like sails (for models)
        global._ = _;

        // Instantiate a new instance of the ORM
        var waterline  = new Waterline();

        // Get models filesNames
        var files = fs.readdirSync(internalConfig.modelsPath);
        files = files.filter(function(entry){
            return path.extname(entry) === '.js';
        });

        var modelFileMapper = [];


        // prepare waterline adapters
        _loadWaterlineAdapters(internalConfig, userConfig);

        files.forEach(function(file){

            // get model object
            // We clone object here because by experience of one of my project I was using a BaseModel in /models
            // and some others models was using inheritance module.exports = _.merge( _.cloneDeep( require('./BaseModel') ), {
            // It result of BaseModel get an automatic .identity and then all next model will have basemodel identity..
            var model = _.cloneDeep(require(path.join(internalConfig.modelsPath, file)));

            _prepareModelConfig(model, file, userConfig);

            // Load the Models into the ORM
            waterline.loadCollection(Waterline.Collection.extend(model));

            modelFileMapper[model.identity] = path.basename(file, '.js');

        });

        waterline.initialize(userConfig, function(err, models) {
            if(err){
                return cb(err);
            }

            logger.yellow('Waterline correctly loaded and connected!');

            _exportGlobalModels(models, modelFileMapper);

            if(internalConfig.usingSails){
                _exportGlobalServices(internalConfig);
            }

            return cb(null, models.collections)
        });
    };

    /**
     * Loop over the connection and check for eventual adapter that are a string instead of an object.
     * Sail allow to write string and map the correct object later. We have to handle it too.
     * @param userConfig
     * @private
     */
    function _loadWaterlineAdapters(internalConfig, userConfig){
        _.forEach(userConfig.connections, function(connection){

            if(connection.adapter === 'sails-disk'){
                logger.yellow("Your adapter sails-disk use the path %s for its database", path.resolve(connection.filePath));
            }

            // config relative to this adapter is not present
            if(!userConfig.adapters[connection.adapter]){
                var adapter = null;
                try{
                    adapter = require(path.join(internalConfig.sailsPath, 'node_modules', connection.adapter));
                }
                catch(err){
                    throw new UserError("The connection's adapter " + connection.adapter + " was not possible to load. \n" +
                        "Maybe you forgot to install it with npm inside your sails app? \n" +
                        "If not try to set directly the object in your config instead of a string.");
                }
                userConfig.adapters[connection.adapter] = adapter;
            }
        });
    }

    function _prepareModelConfig(model, file, userConfig){

        // No identity ? use lowered file name
        if(!model.identity){
            model.identity = path.basename(file, '.js').toLowerCase();
            logger.yellow("The model %s doesn't have identity set, use %s by default.", file, model.identity);
        }

        // model without tablename will crash as sails handle it in top of waterline
        if(!model.tableName){
            model.tableName = path.basename(file, '.js').toLowerCase();
            logger.yellow("The model %s doesn't have tableName set, use %s by default.", file, model.tableName);
        }

        // Use default model connection if not set
        if(!model.connection){
            model.connection = userConfig.models.connection;
        }

        // Use default migrate option if not set
        if(!model.migrate){
            model.migrate = userConfig.models.migrate;
        }
    }

    function _exportGlobalModels(models, modelFileMapper){
        // exports all models
        global.Models = {};
        Object.keys(models.collections).forEach(function(key){
            global.Models[modelFileMapper[key]] = models.collections[key];
        });
    }

    /**
     * @todo
     * @param internalConfig
     * @private
     */
    function _exportGlobalServices(internalConfig){
        // Get services filesname
        var files = fs.readdirSync(internalConfig.servicesPath);
        files = files.filter(function(entry){
            return path.extname(entry) === '.js';
        });

        //global['MailerService'] = require(path.join(internalConfig.servicesPath, 'MailerService.js'));
        //console.log(files);
    }

})();