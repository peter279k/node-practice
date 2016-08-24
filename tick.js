//tick.js
function doSomething(args, callback) {
	somethingComplex(args);
	//using nextTick to enhance the performance
	//process.nextTick(callback);
	callback();
}

doSomething(100, function onEnd() {
	compute();
});

function somethingComplex(num) {
	console.log("somethingComplex: " + (1 + 25 + num));
}

function compute() {
	console.log("compute: " + (4 - 5));
}