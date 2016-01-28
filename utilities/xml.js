
'use strict';

var xml2js = require ( 'xml2js' );

module.exports = {


    /**
     * Converts an XML document to its JSON equivalent.
     * @param {Object} XML The XML document.
     * @param {Object} callbacks An object literal containing the error and success callbacks.
     */
    toJSON : function ( XML , callbacks ) {

        // As the current MLDB is in XML we need to convert this to JSON
        // This is probably an overhead
        xml2js.parseString (
            XML                         ,
            {
                async           : true  ,
                explicitArray   : false ,
                ignoreAttrs     : true  ,
                trim            : true
            }                           ,
            function ( error , result ) {

                var callback    = error ? 'error'   : 'success' ,
                    parameter   = error ? error     : result    ;

                callbacks [ callback ] ( parameter );

            }
        );
    }
};
