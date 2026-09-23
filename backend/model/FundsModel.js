const { model } = require("mongoose");
const { FundsSchema } = require("../schemas/FundsSchema.js");

const FundsModel = new model("fund", FundsSchema);

module.exports = { FundsModel };