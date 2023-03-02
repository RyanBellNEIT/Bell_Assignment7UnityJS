var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var port = process.env.port||3000;
var db = require("./config/database");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());

mongoose.connect(db.mongoURI,{
    useNewURLParser:true
}).then(function(){
    console.log("Connected to MongoDB Database");
}).catch(function(err){
    console.log(err);
});

require("./modules/Game");
var UnityData = mongoose.model("unitySave");

app.post("/unity", function(req, res){
    var data = {
        "username" : req.body.username,
        "firstName" : req.body.firstName,
        "lastName" : req.body.lastName,
        "date" : req.body.date,
        "score" : req.body.score
    }
    console.log(data);

    new UnityData(data).save();
})

app.get("/saveList", function(req, res){
    UnityData.find({}).sort({"username":1}).then(function(data){
        res.send({data});
    })
})

app.post("/deleteFromList", function(req, res){
    console.log(req.body)
    UnityData.findByIdAndDelete(req.body.holder).exec();
})

app.post("/searchFromList", function(req, res){
    UnityData.find({"username":req.body.holder}).then(function(data){
        res.send(data);
        console.log(data);
    })
})

app.use(express.static(__dirname+"/pages"));
app.listen(port, function(){
    console.log(`Running on port ${port}`);
})

