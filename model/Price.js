
const mongoose=require("mongoose");
const priceSchema= new mongoose.Schema({
    price:{
        type:String,
        required:true,
    }
    
})

const Price=mongoose.model('Price', priceSchema,"prices");
module.exports=Price;