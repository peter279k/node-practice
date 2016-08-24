//httpserver.js

var wait = require("wait.for");
var fs = require("fs");
var http = require("http");

var server = new http.Server();

server.on('request', function(req, res) {
	wait.launchFiber(handleGet, req, res);
});

function handleGet(req, res) {
	var obj = wait.for(fs.readFile, "./file.txt");
	
	res.writeHead(200, {'content-Type': 'text/html; charset=utf-8'});
	res.write("<h2>Node.js applications</h2>");
	res.end(obj.toString());
}

server.listen(3000);