const { Schema } = require("mongoose");

const OrdersSchema = new Schema({
    name: String,
    qty: Number,
    price: Number,
    mode: String,       
    product: String,    // CNC or MIS
});

module.exports = { OrdersSchema };

