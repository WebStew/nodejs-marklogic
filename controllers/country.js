
'use strict';

var endpoint    = 'country'                                     ,
    connection  = require ( '../database/connections'           ) ,
    marklogic   = require ( 'marklogic'                         ) ,
    string      = require ( '../utilities/string'               ) ,
    database    = marklogic.createDatabaseClient ( connection   ) ;

/**
 * CRUD controller to handle the requests to the country endpoint.
 * @type {Object}
 */
module.exports = {

    /**
     * Gets a single country model from the database and returns it as JSON.
     * @param  {Object} request  The request object
     * @param  {Object} response The response object
     * @return {Object}          A JSON representation of the country document.
     */
    read : function ( request , response ) {

        var item    = request.params.item ,
            url     = '/' + endpoint + '/' + item.toLowerCase ().replace ( /\s/g , '' ) + '.json';

        database.documents.read ( url )
            .result ()
            .then ( function ( data ) {
                response.status ( 200 )
                    .send ( data [ 0 ].content );
            })
            .catch ( function ( error ) {

                var status = string.setUCFirst ( endpoint ) + ' ' + string.setUCFirst ( item ) + ' does no exists.';

                response.status ( 200 ).send ({
                    error   : error ,
                    status  : status
                });

            });

    }
};
