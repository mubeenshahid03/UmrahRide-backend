
const mongoose=require("mongoose");
const destinationSchema= new mongoose.Schema({
    to:{
        type:String,
        required:true,
    },
    from:{
        type:String,
        required:true,
    }
})

const Destination=mongoose.model('Destination', destinationSchema,"destinations");
module.exports=Destination;