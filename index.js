(function(){
    'use strict';

    //var _ = require('lodash');
    var fs = require('fs');
    var path = require('path');
    var loader  = require('./lib/database-load.js');
    var config  = require(path.join(__dirname, 'config.js'));
    //var sample  = require(config.samplePath);
    var args    = process.argv.slice(2);

    var argv = require('yargs')
        .usage('Usage: $0 -action [num] -sample [path]')
        .demand(['action', 'sample'])
        .argv;

    try{
        var sample = require(argv.sample);
    }
    catch(err){
        console.error('Please specify a valid sample path');
        process.exit();
    }

    displayInfo();

    switch(argv.action){
        case 'exec':
            console.log('executing script ..');
            loader(config, function(err, models){
                if(err) throw err;

                sample()
                    .then(function(){
                        console.log('Script over');
                    })
                    .catch(console.error);
            });
            break;
        case 'drop':
            console.log('Dropping database ..');
            config.waterline.models.migrate = 'drop';
            loader(config, function(err, models){
                if(err) throw err;

                console.log('Dropping done!');
            });
            break;
        default:
            break;
    }

    function displayInfo(){
        console.log('');
        console.log('--------------------------------');
        console.log('Information');
        console.log('--------------------------------');
        console.log('- db script    : ' + config.waterline.connections.localDiskDb.filePath);
        console.log('- models path  : ' + config.modelPath);
        console.log('--------------------------------');
        console.log('');
    }
})();