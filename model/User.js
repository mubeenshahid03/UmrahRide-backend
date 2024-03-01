const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    
    phone: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
    },
    name: {
        type: String,
       // required: true,
    },
    email: {
        type: String,
       // required: true,
    }
});

const User = mongoose.model('User', userSchema, "users");
module.exports = User;
