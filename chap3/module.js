//module.js
//understand how to create the module

var name;

exports.setName = function(fileName) {
	name = fileName;
};

exports.sayHello = function() {
	console.log('Hello ' + name);
};