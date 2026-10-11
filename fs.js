const fs = require('fs');
fs.writeFileSync('demo.txt','Hello node js');
console.log("File created successfully");
let data = fs.readFileSync('demo.txt','utf-8');
console.log("File data: " ,data);
fs.appendFileSync('demo.txt','\nThis is node js file system module');
console.log("File updated successfully");
fs.unlinkSync('demo.txt');
console.log("File deleted successfully");