// routes
// app.use("/api/vehicles/",require("./Routes/vehicles"));
const express = require("express");
const router = express.Router();
const fetchuser = require("../Middleware/fetchuser");
const Vehicle = require("../model/Vehicle");

// path 1   http://localhost:8000/api/vehicles/addvehicle
router.post("/addvehicle", async (request, response) => {
  try {
    const { name, imgURL, cartype, seats, bags, doors, price, userid } =
      request.body;
    console.log("i am from add vehicle path");
    let vehicle = new Vehicle({
      name,
      imgURL,
      cartype,
      seats,
      bags,
      price,
      userid,
    });
    let savedData = await vehicle.save();
    response.status(200).json(savedData);

    // let name=request.body.name
    // response.send(name)
  } catch (error) {
    console.log("error from backend /api/vehicles/addvehicle" + error);
  }
});

// path 2   http://localhost:8000/api/vehicles/deletevehicle/_id
router.post("/deletevehicle/:id", async (request, response) => {
  try {
    if (!request.params.id) {
      return response.status(400).json({ error: "id in params not found" });
    }

    let id = request.params.id;
    let vehicle = await Vehicle.findByIdAndDelete(id);
    if (!vehicle) {
      return response.status(404).json({ error: "Vehicle not found" });
    } else {
      return response
        .status(200)
        .json({ message: `vehicle with id ${id} deleted successsfully ` });
    }
  } catch (error) {
    console.log("error from backend /api/vehicles/deletevehicle/_id" + error);
  }
});

// path 3   http://localhost:8000/api/vehicles/editvehicle/_id
router.put("/editvehicle/:id", async (request, response) => {
  try {
    let { name, cartype, seats, bags, doors, price, userid } = request.body;
    if (!request.params.id) {
      return response.status(400).json({ error: "id in params not found" });
    }
    let newVehicle = {};
    if (name || cartype || seats || bags || doors || price || userid) {
      newVehicle.name = name;
      newVehicle.cartype = cartype;
      newVehicle.seats = seats;
      newVehicle.bags = bags;
      newVehicle.doors = doors;
      newVehicle.price = price;
    }

    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      request.params.id,
      { $set: newVehicle },
      { new: true }
    );
    if (!updatedVehicle) {
      return response.status(400).json({ error: "error in vehicle updation" });
    } else {
      return response.status(200).json(updatedVehicle);
    }
  } catch (error) {
    console.log("error from backend /api/vehicles/editvehicle/_id" + error);
  }
});

// path 4   http://localhost:8000/api/vehicles/fetchallvehicles?_id
router.get("/fetchallvehicles/:id", async (request, response) => {
  try {
    if (!request.params.id) {
      return response.status(400).json({ error: "userid not enter in params" });
    } else {
      let fetchVehicles = await Vehicle.find({ userid: request.params.id });
      response.status(200).json(fetchVehicles);
    }
  } catch (error) {
    console.log("error from backend /api/vehicles/fetchallvehicles" + error);
  }
});

// path 5   http://localhost:8000/api/vehicles/filtervehicles/:name
router.get("/filtervehicles/:name", async (request, response) => {
  try {
    if (!request.params.name) {
      return response
        .status(400)
        .json({ error: "car name not enter in params" });
    } else {
      // console.log(request.body.name)
      let fetchVehicles = await Vehicle.find({ cartype: request.params.name });
      // console.log(fetchVehicles)
      response.status(200).json(fetchVehicles);
    }
  } catch (error) {
    console.log(
      "error from backend /api/vehicles/filtervehicles/:name" + error
    );
  }
});

module.exports = router;
