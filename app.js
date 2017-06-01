// Problem: We need a simple way to look at a user's badge count and JavaScript points from a web browser
// Solution: Use Node.js to perform the profile lookup and serve our template via HTTP
"use strict";

//1. Create a web server
const http = require('http');
const routes = require('./router.js');

http.createServer(function(request, response) {
    routes.css(request, response);
    routes.home(request, response);
    routes.user(request, response);
}).listen(1337, '127.0.0.1');

console.log('Server is running at http://127.0.0.1:1337/');