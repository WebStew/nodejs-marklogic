
'use strict';

/**
 * Available logging utility functions witin the application.
 * @type {Object}
 */
module.exports = {

    /**
     * Logs a coloured term and description message into the console.
     * @param {String} term        [description]
     * @param {String} description [description]
     */
    setConsoleMessage   : function ( term , description ) {

        console.log ( '\x1b[33m' + term + '\x1b[32m' + description );
    }
};
