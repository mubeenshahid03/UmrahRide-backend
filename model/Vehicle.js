
const mongoose=require("mongoose");
const vehicleSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    imgURL:{
        type:String,
        required:true,
    },
    cartype:{
        type:String,
        required:true,
    },
    seats:{
        type:String,
        required:true,
    },
    bags:{
        type:String,
        required:true,
    },
    doors:{
        type:String,
       
    },
    price:{
        type:String,
        required:true,
    },
    userid:{
        type:String,
        required:true,
    },
})

const Vehicle=mongoose.model('Vehicle', vehicleSchema,"vehicles");
module.exports=Vehicle;