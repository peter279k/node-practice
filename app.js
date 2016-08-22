//app.js

var http = require("http");

var server = http.createServer(function(request, response) {
	response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
	response.write("<h1>Node.js</h1>");
	response.write("<h2>Node.js 應用</h2>");
	response.end("<p>hello world</p>");
});

server.listen(3000);

console.log("http server is running on port 3000");