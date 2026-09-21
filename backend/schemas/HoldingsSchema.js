const {schemas} = require("mongoose");

const HoldingsSchema = new schemas({
   name: String,
   qty: Number,
   avg: Number,
   price: Number,
   net: String,
   day: String,
});

module.exports = {HoldingsSchema};