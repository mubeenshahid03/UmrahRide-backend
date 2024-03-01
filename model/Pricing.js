
const mongoose=require("mongoose");
const pricingSchema= new mongoose.Schema({
    vehicleid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "vehicles",
        required: true,
      },
      destinationid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "destinations",
        required: true,
      },
      
    price:{
        type:String,
        required:true
    }
})

const Pricing=mongoose.model('Pricing', pricingSchema,"pricings");
module.exports=Pricing;