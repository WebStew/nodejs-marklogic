
'use strict';

/**
 * The environment variable set on the current machine.
 * Defaults to development if not set.
 * @type {String}
 */
var environment = require ( '../environment' ) ,

    /**
     * An object literal containing the Mark Logic Database connection details
     * for the different environments.
     * @type {Object}
     */
    connections = {

        /**
         * Development environment Mark Logic Database connection details.
         * @type {Object}
         */
        development : {
            authType    : 'DIGEST'      ,
            database    : 'ui-hack-day' ,
            host        : 'localhost'   ,
            password    : 'admin'       ,
            port        : 3030          ,
            user        : 'admin'
        }
    };

/**
 * Exports the Mark Logic Database connection details for the curent environment.
 * @type {Object}
 */
module.exports = connections[ environment.name ];
