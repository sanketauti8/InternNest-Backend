const {model,Schema}=require("mongoose");

const postSchema=new Schema({

    profileImage:{type:String,default: "/myserver.jpg",},
    description:{type:String,require:true},
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
},
{ timestamps: true }
);

const Post=model("post",postSchema);
module.exports=Post;