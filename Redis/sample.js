var fs = require('fs');
var qs = require('querystring');
var http = require('http');

var path = require('path');
var formidable=require('formidable');

http.createServer(form1).listen(8080);

    console.log("reach");
    
var form1=function(req,res){
    console.log(req.url);
    if(req.url=="/fileupload"){
        var form = new formidable.IncomingForm();
            form.parse(req,function(err,fields,files){
                console.log(files);
            });
        res.write("added");
        res.end();
    }
    else{
         var d=fs.readFileSync('/anu.html').toString();
        res.write(d);
        res.end();
    }
};