// routes
// app.use("/api/vehicles/",require("./Routes/vehicles"));
const express = require("express");
const router = express.Router();
const Destination = require("../model/Destination");

// http://localhost:8000/api/destinations/adddestination
router.post("/adddestination", async (request, response) => {
  try {
    const { to, from } = request.body;
    let destination = new Destination({ to, from });
    let savedData = await destination.save();
    response.status(200).json(savedData);
  } catch (error) {
    console.log("error from backend /api/destination/adddestination" + error);
  }
});

// http://localhost:8000/api/destinations/fetchdestinations
router.get("/fetchdestinations", async (request, response) => {
  try {
    let fetchdestiantions = await Destination.find();
    response.status(200).json(fetchdestiantions);
  } catch (error) {
    console.log(
      "error from backend /api/destinations/fetchdestination" + error
    );
    response.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
