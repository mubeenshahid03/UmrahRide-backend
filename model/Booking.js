
const mongoose=require("mongoose");
const bookingSchema= new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
      },
    datepicker: {
        type: String,
      //  required: true,
    },
    timepicker:{
type:String,
    },
    flightnumber: {
        type: String,
        //required: true,
    },
    hotel_name: {
        type: String,
       // required: true,
    },
    comments: {
        type: String,
       // required: true,
    },
    isPackage: {
        type: Boolean,
       // required: true,
    },
    packageId: {
        type: String,
       // required: true,
    },
    destinationId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "destinations",
     //   required: true,
    },
    vehicleId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "vehicles",
        //required: true,
    },
    price:{
        type:String,
      //  required:true,
    },
    bookingstatus:{
        type:String,
      // required:true,
    },
    flightno:{
      type:String,
    }    
})

const Booking=mongoose.model('Booking',bookingSchema,"bookings");
module.exports=Booking;