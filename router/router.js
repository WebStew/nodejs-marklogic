
'use strict';

var country = require ( '../controllers/country'    ) ,
    express = require ( 'express'                   ) ,
    router  = express.Router ()                     ;

// Register the API routes
router.route ( '/country/:item' ).get ( country.read );

/**
 * Export the Express Router for our application
 * @type {Object}
 */
module.exports = router;

