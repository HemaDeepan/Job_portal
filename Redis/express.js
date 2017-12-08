var express=require('express');
var app=express();

app.use("/RecuirementPortal",express.static(__dirname+"/RecuirementPortal"));
app.listen(8443);
