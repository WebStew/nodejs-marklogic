
'use strict';

var database    = require ( '../database/database'  ) ,
    string      = require ( '../utilities/string'   ) ,
    cheerio     = require ( 'cheerio'               ) ,

    /**
     * Creates an Array of author objects containing biography , name and surname properties.
     * @param   {Object} XML    The XML article object to search for authors.
     * @return  {Array}         An array of author objects containing biography , name and surname properties.
     */
    setSummary  = function ( documents ) {

        var summaries   = []    ,
            $                   ,
            abstract            ;


        documents.forEach( function ( value , index ) {

            $           = cheerio.load ( value.content )    ,
            abstract    = $ ( 'abstract' )                  ;

            abstract.children ( 'title' ).remove ();

            // Loop through the articles summaries and create our results
            summaries.push ({
                abstract    : $ ( 'abstract'                    ).text ().trim ()   ,
                published   : $ ( 'firstPublishedSortableDate'  ).text ()           ,
                title       : $ ( 'contentMeta document-title'  ).text ()
            });

        });

        return summaries;

    };

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

        var type    = request.params.type               ,
            dois    = request.query.dois.split ( ',' )  ,
            urls    = []                                ;

        dois.forEach ( function ( value, index ) {
            urls.push( value + '/' + type + '.xml' );
        });

        database.documents.read ( urls )
            .result ()
            .then ( function ( documents ) {

                var error   = string.setUCFirst ( type ) + ' ' + request.query.dois + ' not found.'     ,
                    body    = documents.length ? setSummary ( documents ) : error                                 ,
                    status  = documents.length ? 200 : 404                                                   ;

                response.status ( status ).send ( body );

            })
            .catch ( function ( error ) {
                console.log('error in summaries controller ', error);
                response.status ( error.statusCode || 500 ).send ( error );
            });
    }
};
