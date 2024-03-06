// routes
// app.use("/api/vehicles/",require("./Routes/vehicles"));
const express = require("express");
const router = express.Router();
const Booking = require("../model/Booking");
const User = require("../model/User");
const Pricing = require("../model/Pricing");
const fetchuser = require("../Middleware/fetchuser");
const Contacts = require("../model/Contacts");
const Package = require("../model/Package");
const Vehicle = require("../model/Vehicle");
const moment = require("moment");

//this route contain requests of bookings and contacts and packages

router.post("/addbooking", fetchuser, async (request, response) => {
  try {
    console.log(request.body);
    const {
      date_time,
      hotel_name,
      comments,
      vehicleId,
      destinationId,
      price,
      isPackage,
      packageId,
      bookingstatus,
      flight_number,
    } = request.body.bookingInfo;

    let userid = await User.findOne({ _id: request.user.id });

    if (!date_time) {
      return response.status(401).json({
        error:
          "complete data not received in http://localhost:8000/api/bookings/addbooking",
      });
    }

    // Parse the date and time using moment.js
    const dateTimeMoment = moment(date_time);
    const date = dateTimeMoment.format("YYYY-MM-DD");
    const time = dateTimeMoment.format("HH:mm:ss");

    let booking = new Booking({
      userid,
      datepicker: date,
      timepicker: time,
      hotel_name,
      comments,
      destinationId,
      price,
      isPackage,
      packageId,
      vehicleId,
      bookingstatus,
      flightno: flight_number,
    });
    let savedData = await booking.save();
    response.status(200).json(savedData);
  } catch (error) {
    console.log("error from backend /api/destination/addbooking" + error);
  }
});


// http://localhost:8000/api/bookings/deletebooking
router.post("/deletebooking", fetchuser, async (request, response) => {
  try {
    console.log(request.body);
    if (!request.body.bookingid) {
      response.status(401).json({ error: "body not received" });
    }

    const booking = await Booking.findByIdAndDelete(request.body.bookingid);
    if (!booking) {
      response.status(404).json({ error: "id not found" });
    } else {
      response.status(200).json(booking);
    }
  } catch (error) {
    console.log("error from backend /api/bookings/deletebooking" + error);
  }
});

//bellow are the requests for contacts
// path 1 http://localhost:8000/api/bookings/addcontacts
router.post("/addcontacts", async (request, response) => {
  try {
    const { name, email, subject, message } = request.body.ContactsInfo;

    if (!name || !email || !subject || !message) {
      return response
        .status(401)
        .json({ error: "please enter all body fields" });
    } else {
      let contacts = new Contacts({ name, email, subject, message });
      let savedData = await contacts.save();
      response.status(200).json(savedData);
    }
  } catch (error) {
    console.log("error from backend 8000 /api/bookings/addcontacts" + error);
  }
});

//api calls for packages
// path 1  http://localhost:8000/api/bookings/fetchallpackages
router.get("/fetchallpackages", async (request, response) => {
    try {
      // Find bookings associated with the user
      const packages = await Package.find();
  
      // Iterate through each booking and fetch additional data
      const bookingsWithDetails = await Promise.all(
        packages.map(async (pkg) => {
          console.log("from packages")
          
        //   console.log(pkg);
          const vehicle = await Vehicle.findOne({ _id: pkg.vehicleid });
  
          
  
          return {
            _id: pkg._id,
            title: pkg.title,
            description: pkg.description,
            price: pkg.price, 
            vehicle,
            __v: pkg.__v,
          };
        })
      );
  
      // console.log(bookingsWithDetails);
      response.status(200).json(bookingsWithDetails);
    } catch (error) {
      console.log("error in api/vehicles/fetchallpackages" + error);
    }
  });
  

//add package in Bookings table
// http://localhost:8000/api/bookings/addpkgbooking
router.post("/addpkgbooking", fetchuser, async (request, response) => {
  try {
    console.log("pkgbooking", request.body.pkgbooking);
    const {
      datepicker,
      vehicleid,
      price,
      isPackage,
      packageid,
      bookingstatus,
      name,
      email,
      phone,
    } = request.body.pkgbooking;

    if (!datepicker || !email || !datepicker) {
      return response
        .status(401)
        .json({
          error:
            "Complete data not received in http://localhost:8000/api/bookings/addbooking",
        });
    }
    const dateTimeMoment = moment(datepicker);
    const date = dateTimeMoment.format("YYYY-MM-DD");
    const time = dateTimeMoment.format("HH:mm:ss");

    // Fetching user by id
    let user = await User.findById(request.user.id);

    if (!user) {
      return response.status(404).json({ error: "User not found" });
    }

    // Updating user details
    user.name = name;
    user.email = email;
    await user.save();

    let booking = new Booking({
      userid: user._id,
      datepicker:date,
      timepicker:time,
      price,
      isPackage,
      packageId: packageid,
      vehicleId: vehicleid,
      bookingstatus,
    });
    let savedData = await booking.save();
    response.status(200).json(savedData);
  } catch (error) {
    console.log("error from backend /api/bookings/addpkgbooking" + error);
  }
});

// router.post('/addbooking', fetchuser, async (request, response) => {
//     try {
//       console.log("from backend");
//       console.log(request.body);

//       if (!request.body.bookingInfo) {
//         return response.status(401).json({ error: "body not received in add booking" });
//       }

//       // Updating the user document by setting the bookings field with the new bookingInfo
//       const updatedUser = await User.findByIdAndUpdate(
//         request.user.id,
//         {
//           $set: {
//             'bookings.destination': request.body.bookingInfo.destination,
//             'bookings.hotelname':request.body.bookingInfo.hotel_name,
//             'bookings.date':request.body.bookingInfo.datepicker,
//             'bookings.pickup':request.body.bookingInfo.pickup,
//             'bookings.comments':request.body.bookingInfo.comments,
//           },
//         },
//         { new: true }
//       );

//       response.json(updatedUser);
//     } catch (error) {
//       console.log("error in api/users/addbooking" + error);
//     }
//   });

module.exports = router;
