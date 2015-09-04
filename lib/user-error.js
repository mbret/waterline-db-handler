(function(){
    'use strict';
    function UserError(err){

        if(err instanceof Error){
            this.message = err.message;
            this.stack = err.stack;
        }
        else{
            this.message = err;
        }
    }

    module.exports = UserError;
})();