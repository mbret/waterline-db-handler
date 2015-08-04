'use strict';

var logger  = require('./logger.js');

module.exports = function(sample){
    sample()
        .then(function(){
            logger.yellow('Script executed!');
        })
        .catch(function(err){
            logger.red('An error occured with your sample, see below:');
            console.error(err);
            logger.yellow('Script executed with 1 error!');
        })
};