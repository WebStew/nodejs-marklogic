
'use strict';

var database    = require ( '../database/database'  ) ,
    string      = require ( '../utilities/string'   ) ,
    cheerio     = require ( 'cheerio'               ) ,

    hrefBase = 'http://onlinelibrary.wiley.com/store/{{doi}}/asset/',

    /**
     * Creates an Array of author objects containing biography , name and surname properties.
     * @param   {Object} XML    The XML article object to search for images.
     * @return  {Array}         An array of author objects containing biography , name and surname properties.
     */
    setImages  = function ( XML, doi ) {

        var images = []                    ,
            $       = cheerio.load ( XML )  ;

        // Loop through the articles images and create our results
        $ ( 'figure' ).each ( function () {

            var image = $ ( this );
            var imageOriginal = image.find('mediaResource[rendition="webOriginal"]');
            var imageThumbnail = image.find('mediaResource[rendition="webLoRes"]');

            var href = hrefBase.replace('{{doi}}', doi);

            images.push ({
                label: image.find('label').text().trim(),
                caption: image.find('caption').text(),
                href: href,
                source: {
                    original: {
                        alt: imageOriginal.attr('alt'),
                        name: imageOriginal.attr('href')
                    },
                    thumbnail: {
                        alt: imageThumbnail.attr('alt'),
                        name: imageThumbnail.attr('href')
                    },
                }
            });

        });

        return images;
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
                    body    = data.length ? setImages ( data [ 0 ].content, doi ) : error   ,
                    status  = data.length ? 200 : 404                                   ;

                response.status ( status ).send ( body );

            })
            .catch ( function ( error ) {
                console.log('error in images controller ', error);
                response.status ( error.statusCode || 500 ).send ( error );
            });
    }
};
