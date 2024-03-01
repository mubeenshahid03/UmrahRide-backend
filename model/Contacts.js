
const mongoose=require("mongoose");
const contactsSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    subject:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        required:true,
    },
    
    
})

const Contacts=mongoose.model('Contacts', contactsSchema,"contacts");
module.exports=Contacts;