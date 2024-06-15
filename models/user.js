const { model,Schema } = require("mongoose");


const userSchema= new Schema({
    
    firstName:{type:String,require:true},
    lastName:{type:String,require:true},
    email:{type:String,require:true},
    password:{type:String,require:true},
    contact:{type:String,require:true},
    address:{type:String,require:true},
    country:{type:String,require:true},
    state:{type:String,require:true},
    city:{type:String,require:true},
    zip:{type:String,require:true},

},
{ timestamps: true }
);

const User=model("user",userSchema);
module.exports=User;