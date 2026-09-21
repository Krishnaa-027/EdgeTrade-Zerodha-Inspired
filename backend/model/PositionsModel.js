const { model } = require("mongoose");
const {PositionsSchema} = require("../schemas/PositionsSchema.js")

const PositionsModel = new model("holding", PositionsSchema);

module.exports = {PositionsModel};