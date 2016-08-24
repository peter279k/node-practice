//argv.js

console.log(process.argv);

process.stdout.write("stdout message\n");

console.log("stdin something");

process.stdin.resume();

process.stdin.on('data', function(data) {
	process.stdout.write("stdout from console: " + data.toString());
	process.stdout.write("the application will exit...");
	process.exit(1);
});