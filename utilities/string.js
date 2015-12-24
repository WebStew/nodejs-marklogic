
'use strict';

/**
 * Available string utility functions witin the application.
 * @type {Object}
 */
module.exports = {


    /**
     * Sets the first letter of a string to uppercase first.
     * @param {String} string The string to manipulate.
     * @return {String} The manipulated string.
     */
    setUCFirst : function ( string ) {

        return string.charAt ( 0 ).toUpperCase () + string.slice ( 1 );
    }
};
