const mongoose=require('mongoose');

const Schema=new mongoose.Schema({
    username:String,
    googleid:String
});
const User=mongoose.model("user_me",Schema);

module.exports=User;