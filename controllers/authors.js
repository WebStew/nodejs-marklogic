
'use strict';

var database    = require ( '../database/database'  ) ,
    string      = require ( '../utilities/string'   ) ,
    cheerio     = require ( 'cheerio'               ) ,

    /**
     * Creates an Array of author objects containing biography , name and surname properties.
     * @param   {Object} XML    The XML article object to search for authors.
     * @return  {Array}         An array of author objects containing biography , name and surname properties.
     */
    setAuthors  = function ( XML ) {

        var authors = []                    ,
            $       = cheerio.load ( XML )  ;

        // Loop through the articles authors and create our results
        $ ( 'creators author' ).each ( function () {

            var author = $ ( this );

            authors.push ({
                biography   : author.find ( 'biographyInfo' ).text ().trim ()   ,
                name        : author.find ( 'givenNames'    ).text ()           ,
                surname     : author.find ( 'familyName'    ).text ()
            });

        });

        return authors;

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

        var type    = request.params.type       ,
            prefix  = request.params.prefix     ,
            suffix  = request.params.suffix     ,
            doi     = prefix + '/' + suffix     ,
            url     = doi + '/' + type + '.xml' ;

        database.documents.read ( url )
            .result ()
            .then ( function ( data ) {

                var error   = string.setUCFirst ( type ) + ' ' + doi + ' not found.'    ,
                    body    = data.length ? setAuthors ( data [ 0 ].content ) : error   ,
                    status  = data.length ? 200 : 404                                   ;

                response.status ( status ).send ( body );

            })
            .catch ( function ( error ) {
                console.log('error in authors controller ', error);
                response.status ( error.statusCode || 500 ).send ( error );
            });

    }
};
