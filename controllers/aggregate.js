
'use strict';

var database        = require ( '../database/database'  ) ,
    string          = require ( '../utilities/string'   ) ,
    XML             = require ( '../utilities/xml'      ) ;

/**
 * CRUD controller to handle the requests to the article endpoint.
 * @type {Object}
 */
module.exports = {

    /**
     * Gets a full text object from the database and returns it as XML.
     * @param  {Object} request  The request object
     * @param  {Object} response The response object
     * @return {Object}          A JSON representation of the country document.
     */
    read : function ( request , response ) {

        var type    = request.params.type       ,
            prefix  = request.params.prefix     ,
            suffix  = request.params.suffix     ,
            doi     = prefix + '/' + suffix     ,
            url     = doi + '/' + type + '.xml' ;

        database.documents.read ( url )
            .result ()
            .then ( function ( data ) {

                // If we have a record
                if ( data.length ) {

                    XML.toJSON ( data [ 0 ].content , {
                        error   : function ( error  ) {
                            response.status ( 500 ).send ( error );
                        } ,

                        success : function ( result ) {
                            response.status ( 200 ).send ( result.document );
                        }
                    });
                }

                else {

                    response.status ( 404 ).send ( string.setUCFirst ( type ) + ' ' + doi + ' not found.' );
                }

            })
            .catch ( function ( error ) {
                console.log('error in aggregate controller ', error);
                response.status ( error.statusCode || 500 ).send ( error );
            });

    }
};
