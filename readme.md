
// Good articles
http://www.tamas.io/javascript-in-a-nosql-database/
http://www.tamas.io/marklogic-and-node-js/

// Run the below CURL command in the console to create a Mark Logic Database
// curl --digest --user admin:admin -X POST -d@"configuration.json" -i -H "Content-type:application/json" http://localhost:8002/v1/rest-apis

// Load documents via Query Console.
declareUpdate();

var files = xdmp.filesystemDirectory("/Users/spretorius/Desktop/ui-hack-day-2015/database/data/mock/");

files.forEach(function( file ) {
    xdmp.documentLoad(file.pathname, {
        'uri'         : '/country/' + file.filename.toLowerCase() ,
        'collections' : 'countries'
    });
});
