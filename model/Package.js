
const mongoose=require("mongoose");
const packageSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    vehicleid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "vehicles",
        required: true,
    },
    price:{
        type:String,
        
    }
})

const Package=mongoose.model('Package', packageSchema,"packages");
module.exports=Package;