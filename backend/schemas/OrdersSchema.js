const {schemas} = require("mongoose");

const OrdersSchema = new schemas({
   name: String,
   qty: Number,
   price: Number,
   mode: String,     //add on by us contain buy or sell data
});

module.exports = {OrdersSchema};