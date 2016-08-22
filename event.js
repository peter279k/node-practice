//event
var event = require("events").EventEmitter;

var emitter = new event();

emitter.on('some_event', function() {
	console.log('some event happened');
});

setTimeout(function() {
	emitter.emit('some_event');
}, 1000);