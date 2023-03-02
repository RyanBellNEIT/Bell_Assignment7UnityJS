var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Schema = new Schema({
    username:{
        type:String,
    },
    firstName:{
        type:String,
    },
    lastName:{
        type:String,
    },
    date:{
        type:String,
    },
    score:{
        type:Number,
    },
});

mongoose.model("unitySave", Schema);