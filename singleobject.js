//singleobject.js

function Hello() {
	var name;
	
	this.setName = function(theName) {
		name = theName;
	};
	
	this.sayHello = function() {
		console.log("Hello " + name);
	};
}

module.exports = Hello;

//exports.Hello = Hello;
// instance: require("/path/to/singleobject").Hello
