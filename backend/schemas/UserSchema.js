const { Schema } = require("mongoose");

const UserSchema = new Schema({
    name: String,

    email: {
        type: String,
        unique: true,
    },

    password: String,

    mobile: {
        type: String,
        default: "",
    },

    dateOfBirth: {
        type: String,
        default: "",
    },

    address: {
        type: String,
        default: "",
    },

    city: {
        type: String,
        default: "",
    },

    state: {
        type: String,
        default: "",
    },

    pincode: {
        type: String,
        default: "",
    },
});

module.exports = { UserSchema };