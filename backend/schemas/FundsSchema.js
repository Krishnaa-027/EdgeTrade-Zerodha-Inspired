const { Schema } = require("mongoose");

const FundsSchema = new Schema({
    initialBalance: Number,
    availableCash: Number,
});

module.exports = { FundsSchema };