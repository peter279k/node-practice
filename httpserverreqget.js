//httpserverreqget.js

var http = require("http");
var url = require("url");
var util = require("util");

var server = http.createServer(function(req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.end(util.inspect(url.parse(req.url, true)));
});

server.listen(3000);