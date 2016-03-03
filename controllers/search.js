
'use strict';

var database    = require ( '../database/database'  ) ,
    marklogic   = require ( 'marklogic'             ) ,
    cheerio     = require ( 'cheerio'               ) ,
    string      = require ( '../utilities/string'   ) ;

var formatData = function(data) {

    return data.map(function(docDescr) {

        var $ = cheerio.load(docDescr.content);

        return {
            abstract    : $ ( 'abstract'                    ).text () ,
            doi         : $ ( 'doi'                         ).text () ,
            published   : $ ( 'firstPublishedSortableDate'  ).text () ,
            title       : $ ( 'articleTitle'                ).text ()
        };
    });
};

/**
 * CRUD controller to handle the requests to the article endpoint.
 * @type {Object}
 */
module.exports = {

    /**
     * Gets a search results.
     * @param  {Object} request  The request object
     * @param  {Object} response The response object
     * @return {Object}          A JSON representation of the country document.
     */
    read : function ( request , response ) {

        var query       = request.params.query ,
            qb          = marklogic.queryBuilder,
            results     = [];


        database.documents.query(qb.where(qb.term(query)))
            .result ()
            .then ( function ( data ) {

                var error   = query + ' not found.'    ,
                    body    = data.length ? formatData(data) : error   ,
                    status  = data.length ? 200 : 404                                   ;

                response.status ( status ).send ( body );

            })
            .catch ( function ( error ) {
                console.log('error in search controller ', error);
                response.status ( error.statusCode || 500 ).send ( error );
            });

    }
};
