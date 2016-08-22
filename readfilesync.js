//readfilesync.js
//understand read file sync

var fs = require("fs");

var data = fs.readFileSync("C:\\Users\\lee\\Desktop\\node-practice\\file.txt", "utf-8");

console.log(data);
console.log("read file is in the end")