//httpserverreqpost.js (demonstration)

var http = require("http");
var queryStr = require("querystring");
var util = require("util");

var server = http.createServer(function(req, res) {
	var post = '';
	
	req.on('data', function(chunk) {
		post += chunk;
	});
	
	req.on('end', function() {
		post = queryStr.parse(post);
		res.end(util.inspect(post, true));
	});
});

server.listen(3000);

