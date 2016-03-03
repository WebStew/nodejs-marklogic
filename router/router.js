
'use strict';

var aggregates  = require ( '../controllers/aggregate'  )   ,
    authors     = require ( '../controllers/authors'    )   ,
    citations   = require ( '../controllers/citations'  )   ,
    express     = require ( 'express'                   )   ,
    environment = require ( '../environment.js'         )   ,
    router      = express.Router ()                         ,
    version     = '/' + environment.version                 ,
    doi         = ':prefix/:suffix'                         ;

// Register the API routes
router.route ( version + '/:type/' + doi + '/aggregate' ).get ( aggregates.read );
router.route ( version + '/:type/' + doi + '/authors'   ).get ( authors.read    );
router.route ( version + '/:type/' + doi + '/citations' ).get ( citations.read  );

/**
 * Export the Express Router for our application
 * @type {Object}
 */
module.exports = router;
