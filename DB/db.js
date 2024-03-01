const mongoose = require("mongoose");
// const mongooseURI =
//   "mongodb+srv://mubeenshahid232:JBuFOX7XshAtW5Fd@cluster0.wvrjy7f.mongodb.net/umrahride?retryWrites=true&w=majority";
const mongooseURI=process.env.DATABASE
const connectToMongoose = () => {
  mongoose
    .connect(mongooseURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log("connection successfull to DB");
    })
    .catch((error) => {
      console.log(error);
    });
};
module.exports = connectToMongoose;
