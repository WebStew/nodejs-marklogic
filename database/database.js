
'use strict';

var connection  = require ( '../database/connections'   ) ,
    marklogic   = require ( 'marklogic'                 ) ;

/**
 * Exports a connection to the relevant Database
 * @type {Object}
 */

var db = marklogic.createDatabaseClient ( connection );
module.exports = db;
