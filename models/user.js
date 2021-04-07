const mongoose = require("mongoose");

//Creates a new schema, kind of like object that we can send to our database
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    jobs: {
        type: Array,
        default: ["Test1", "Test2", "Test3"]
    }
});

//Creates User model using the previously defined schema
const User = mongoose.model("Users", userSchema, "userCollection");

module.exports = User