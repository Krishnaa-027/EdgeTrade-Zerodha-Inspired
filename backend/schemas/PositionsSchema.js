const {schemas} = require("mongoose");

const PositionsSchema = new schemas({
   product: String,
   name: String,
   qty: Number,
   avg: Number,
   price: Number,
   net: String,
   day: String,
   isLoss: Boolean,
});

module.exports = {PositionsSchema};