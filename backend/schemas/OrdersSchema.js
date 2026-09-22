const {Schema} = require("mongoose");

const OrdersSchema = new Schema({
   name: String,
   qty: Number,
   price: Number,
   mode: String,     //add on by us contain buy or sell data
});

module.exports = {OrdersSchema};