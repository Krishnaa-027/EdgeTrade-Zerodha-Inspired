const { model } = require("mongoose");
const { UserSchema } = require("../schemas/UserSchema.js");

const UserModel = new model("user", UserSchema);

module.exports = { UserModel };