
'use strict';

/**
 * Available logging utility functions witin the application.
 * @type {Object}
 */
module.exports = {

    /**
     * Logs a coloured term and description message into the console.
     * @param {String} type        The type of message. warning | error.
     * @param {String} term        The term of the message.
     * @param {String} description The description of the messafe.
     */
    log   : function ( term , description , type ) {

        type = type || 'warning';

        switch ( type ) {

        case 'error' :
            console.log ( '\x1b[31m' + term + '\x1b[33m' + description + '\x1b[32m' );
            break;

        case 'warning' :
            console.log ( '\x1b[33m' + term + '\x1b[32m' + description );
            break;

        }

    }
};
