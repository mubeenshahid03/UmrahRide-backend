// routes
// app.use("/api/vehicles/",require("./Routes/vehicles"));
const express=require("express");
const  router=express.Router();
const Pricing=require("../model/Pricing");
const Vehicle = require("../model/Vehicle");
const Booking=require("../model/Booking")
const Destination=require("../model/Destination")
const Package=require("../model/Package")
const fetchuser=require("../Middleware/fetchuser")
const mongoose=require("mongoose");
const User = require("../model/User");
// http://localhost:8000/api/pricings/addpricing
router.post("/addpricing",async(request,response)=>{
    try {
        const already= await Pricing.findOne({vehicleid:request.body.vehicleid, destinationid: request.body.destinationid});
        const{vehicleid,destinationid,price}=request.body
        
        if(already){
            return response.status(401).json({error:"this destination id and vehicleid is already in pricing table"})
            
        }
        else{
        let pricing=new Pricing({vehicleid,destinationid,price});
        let savedData=await pricing.save();
        response.status(200).json(savedData)
    }

    } catch (error) {
        console.log("error from backend /api/pricings/addpricing" + error)
    }
})

//below are the request for bookings

// http://localhost:8000/api/pricings/:destinationId
router.get("/:destinationId", async (request, response) => {
    try {
      const destinationId = request.params.destinationId;
  
      // Find pricing information based on the destination ID
      const pricingInfo = await Pricing.find({ destinationid: destinationId });
      console.log("from pricing")  
      console.log(pricingInfo)
      if (!pricingInfo) {
        return response.status(404).json({ error: "Pricing information not found for the destination" });
      }
  // // Extract the vehicle IDs from pricingInfo array
  // const vehicleIds = pricingInfo.map(info => info.vehicleid);

  // // Fetch vehicles based on the extracted vehicle IDs
  // const vehicles = await Vehicle.find({ _id: { $in: vehicleIds } });
  // console.log(vehicles);
  const PricingWithDetails = await Promise.all(
    pricingInfo.map(async (pricing) => {
      const destination = await Destination.findOne({ _id: pricing.destinationid });
      const vehicle = await Vehicle.findOne({ _id: pricing.vehicleid });
     
      return {
        _id: pricing._id,
        vehicle: vehicle,
        destination: destination,
        price: pricing.price,
        
        __v: pricing.__v
      };
    })
  );
  response.status(200).json(PricingWithDetails);
      
    } catch (error) {
      console.log("error from backend /api/pricings/fetchvehicles" + error);
      response.status(500).json({ error: "Internal Server Error" });
    }
  });

// http://localhost:8000/api/pricings/userbookings
router.post("/userbookings",fetchuser, async (request, response) => {
  try {
    const userid = request.user.id;
console.log(userid);

// Find bookings associated with the user
const bookings = await Booking.find({ userid: userid });
// console.log(bookings);

// Iterate through each booking and fetch additional data
const bookingsWithDetails = await Promise.all(
  bookings.map(async (booking) => {
    const destination = await Destination.findOne({ _id: booking.destinationId });
    const vehicle = await Vehicle.findOne({ _id: booking.vehicleId });
    const user = await User.findOne({ _id: booking.userid });
    const pricing = await Pricing.findOne({ destinationid: booking.destinationId, vehicleid: booking.vehicleId });
    let pkg=null;
    if(booking.isPackage===true){
    pkg=await Package.findOne({_id:booking.packageId})
   }
   else{
    pkg="notfound"
   }
    return {
      _id: booking._id,
      userid: booking.userid,
      datepicker: booking.datepicker,
      hotel_name: booking.hotel_name,
      flightno:booking.flightno,
      comments: booking.comments,
      isPackage: booking.isPackage,
      packageId: booking.packageId,
      pkg,
      destination,
      vehicle,
      user,
      pricing,

      price: booking.price,
      __v: booking.__v
    };
  })
);

// console.log(bookingsWithDetails);
response.status(200).json(bookingsWithDetails)

   
  } catch (error) {
    console.log("error from backend /api/pricings/userbookings" + error);
    response.status(500).json({ error: "Internal Server Error" });
  }
});






module.exports=router
