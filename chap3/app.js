//app.js
//using wait.for to handle async function

var http = require("http");
var wait = require("wait.for");
var fs = require("fs");

// in a fiber.. We can wait for async functions

function handleGet(request, response) {
    // call async_function(arg1), wait for result, return data
	
    var myObj = wait.for(fs.readFile, "./file.txt");
	
	response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
	response.write("<h1>Node.js</h1>");
	response.write("<h2>Node.js 應用</h2>");
	response.end(myObj.toString());
}

var server = http.createServer(function(request, response) {
	wait.launchFiber(handleGet, request, response);
});

server.listen(3000);

console.log("http server is running on port 3000");