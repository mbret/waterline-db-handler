'use strict';

var logger  = require('./logger.js');

module.exports = function(sample){
    sample()
        .then(function(){
            logger.yellow('Script executed!');
        })
        .catch(console.error);
};