const { Schema } = require("mongoose");

const FundsSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    initialBalance: Number,
    availableCash: Number,
});

module.exports = { FundsSchema };