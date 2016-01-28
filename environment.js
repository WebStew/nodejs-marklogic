
'use strict';

/**
 * Exports the environment configuration details the application is being run in.
 * @type {Object}
 */
module.exports = {

    /**
     * The environment name.
     * @type {String}
     */
    name    : process.env.ENVIRONMENT   || 'development' ,

    /**
     * The port number the application is available on.
     * @type {Number}
     */
    port    : process.env.PORT          || 3000 ,

    /**
     * The current version of the API
     * @type {String}
     */
    version : 'v0.0.1'

};
