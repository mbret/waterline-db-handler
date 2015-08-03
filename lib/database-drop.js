(function(){
    'use strict';

    //var express = require('express');
    var _ = require('lodash');
    //app = express(),
    var Waterline = require('waterline');
    //bodyParser = require('body-parser'),
    //methodOverride = require('method-override'),
    // Require any waterline compatible adapters here
    var diskAdapter = require('sails-disk');
    var path = require('path');
    var fs = require('fs');

    // export globals like sails
    global._ = _;

    // Instantiate a new instance of the ORM
    var waterline  = new Waterline();

    // Build A Config Object
    var config = {

        // Setup Adapters
        // Creates named adapters that have have been required
        adapters: {
            disk: diskAdapter,
        },

        connections: {
            default: {
                adapter: 'disk'
            },
        },

        models: {
            connection: 'default'
        },

        defaults: {
            migrate: 'drop'
        }

    };

    // Start Waterline passing adapters in
    waterline .initialize(config, function(err, models) {
        if(err) throw err;

        console.log('db dropped');
    });

})();