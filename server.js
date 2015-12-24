
'use strict';

var express     = require ( 'express'               ) ,
    router      = require ( './router/router'       ) ,
    log         = require ( './utilities/log'       ) ,
    environment = require ( './environment'         ) ,
    application = express () ,
    server;

// Setup the router
application.use ( '/' , router );

// Start the application
server = application.listen ( environment.port , function () {

    // Log a friendly message on the current environment details
    log.setConsoleMessage ( 'ENVIRONMENT  : ' , environment.name          );
    log.setConsoleMessage ( 'PORT         : ' , environment.port          );
    log.setConsoleMessage ( 'ADDRESS      : ' , server.address ().address );

});
