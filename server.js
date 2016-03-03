
'use strict';

var express     = require ( 'express'               )   ,
	cors 		= require ( 'cors' 					) 	,
    router      = require ( './router/router'       )   ,
    logger      = require ( './utilities/logger'    )   ,
    environment = require ( './environment'         )   ,
    application = express ()                            ,
    server                                              ;

// Setup the router
application.use ( '/' , router 	);
application.use ( cors 			);

// Start the application
server = application.listen ( environment.port , function () {

    // Log a friendly message on the current environment details
    logger.log ( 'ENVIRONMENT  : ' , environment.name          );
    logger.log ( 'PORT         : ' , environment.port          );
    logger.log ( 'ADDRESS      : ' , server.address ().address );

});
