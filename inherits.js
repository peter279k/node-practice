//inherits.js

var util = require('util');

function Base() {
	this.name = "lee";
	this.base = "1990";
		
	this.sayHello = function() {
		console.log("Hello " + this.name);
	}; 
}

Base.prototype.showName = function() {
	console.log(this.name);
};

function Sub() {
	this.name = 'sub';
}

util.inherits(Sub, Base);

var objBase = new Base();
objBase.showName();
objBase.sayHello();
console.log(objBase);

var objSub = new Sub();

//only inherits the prototype method

objSub.showName();

//objSub.sayHello(); (TypeError)

console.log(objSub);