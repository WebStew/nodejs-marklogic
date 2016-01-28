
'use strict';

/**
 * The environment variable set on the current machine.
 * Defaults to development if not set.
 * @type {String}
 */
var environment = require ( '../environment'        ) ,
    logger      = require ( '../utilities/logger'   ) ,

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
            authType    : 'DIGEST'                  ,
            database    : 'wiley-online-library'    ,
            host        : 'localhost'               ,
            password    : 'admin'                   ,
            port        : 3001                      ,
            user        : 'admin'
        }
    } ,

    /**
     * The connection details for current environment
     * @type {Object}
     */
    connecton   = connections [ environment.name ] ,

    /**
     * Warning details for the console if a connection for the environment does not exist.
     * @type {Object}
     */
    notifications = {
        warning         : {
            heading     : 'WARNING : ' ,
            messages    : [
                'There is no Mark Logic Database connection details for your environment variable "' + environment.name + '".' ,
                'Setting Mark Logic Database connection details to development.'
            ] ,
            type        : 'error'
        }
    };

// Log some helpful messages to the console if there is no database connection details for the current environment
if ( ! connecton ) {

    logger.log (
        notifications.warning.heading           ,
        notifications.warning.messages [ 0 ]    ,
        notifications.warning.type
    );

    logger.log (
        notifications.warning.heading           ,
        notifications.warning.messages [ 1 ]    ,
        notifications.warning.type
    );

}

/**
 * Exports the Database connection details for the current environment.
 * Tries to start the application with a development connection if none exist.
 * @type {Object}
 */
module.exports = connections[ environment.name ] || connections.development;
