//promise.js using wait.for package to make the async sequential call

var wait = require('wait.for');
var fs = require('fs');

// launch a new fiber
wait.launchFiber(my_sequential_function);

// in a fiber.. We can wait for async functions

function my_sequential_function() {
    // call async_function(arg1), wait for result, return data
	
    var myObj = wait.for(fs.readFile, "./file.txt");
	
    console.log(myObj.toString());
	
    console.log("read file is end...");
}