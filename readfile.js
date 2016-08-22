//readfile.js
//to know about async programming

var fs = require('fs');

fs.readFile("C:\\Users\\lee\\Desktop\\node-practice\\file.txt", "utf-8", function(error, content) {
	if(error) {
		console.error(error);
	}
	else {
		console.log(content);
	}
});

console.log("read file is in the end");