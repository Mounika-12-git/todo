const http = require('http');
http.createServer((req,res)=>{
    res.write("This is http node module");
    res.end();
}).listen(9000)
{
    console.log("Success");
};