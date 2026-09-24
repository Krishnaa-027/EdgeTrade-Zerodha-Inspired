require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const { router: authRouter } = require("./routes/AuthRoutes");
const { authMiddleware } = require("./middleware/AuthMiddleware");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const { FundsModel } = require("./model/FundsModel.js");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

const app = express();

app.use(cors({
    origin: [
        "http://localhost:3000",
        "http://localhost:3001",
    ],
    credentials: true,
}));

app.use(bodyParser.json());
app.use(cookieParser());

app.use("/", authRouter);

app.get("/allHoldings", authMiddleware, async (req, res) => {
    try {
        let allHoldings = await HoldingsModel.find({
            userId: req.userId,
        });

        res.json(allHoldings);
    } catch (error) {
        console.log(error);
        res.status(500).send("Something went wrong");
    }
});

app.get("/allPositions", authMiddleware, async (req, res) => {
    try {
        let allPositions = await PositionsModel.find({
            userId: req.userId,
        });

        res.json(allPositions);
    } catch (error) {
        console.log(error);
        res.status(500).send("Something went wrong");
    }
});

app.get("/allOrders", authMiddleware, async (req, res) => {
    try {
        let allOrders = await OrdersModel.find({
            userId: req.userId,
        });

        res.json(allOrders);
    } catch (error) {
        console.log(error);
        res.status(500).send("Something went wrong");
    }
});

app.get("/funds", authMiddleware, async (req, res) => {
    try {
        let funds = await FundsModel.findOne({
            userId: req.userId,
        });

        if (!funds) {
            funds = new FundsModel({
                userId: req.userId,
                initialBalance: 100000,
                availableCash: 100000,
            });

            await funds.save();
        }

        res.json(funds);
    } catch (error) {
        console.log(error);
        res.status(500).send("Something went wrong");
    }
});

app.post("/newOrder", authMiddleware, async (req, res) => {
    try {
        const { name, qty, price, mode, product } = req.body;

        let existingHolding = await HoldingsModel.findOne({
            userId: req.userId,
            name: name,
        });

        let existingPosition = await PositionsModel.findOne({
            userId: req.userId,
            name: name,
            product: "MIS",
        });

        let funds = await FundsModel.findOne({
            userId: req.userId,
        });

        if (!funds) {
            return res.status(500).send("Funds account not found");
        }

        if (mode === "BUY") {
            let orderValue = Number(qty) * Number(price);

            if (orderValue > funds.availableCash) {
                return res.status(400).send("Insufficient funds");
            }

            let newOrder = new OrdersModel({
                userId: req.userId,
                name: name,
                qty: qty,
                price: price,
                mode: mode,
                product: product,
            });

            await newOrder.save();

            if (product === "CNC") {
                if (existingHolding) {
                    let oldQty = existingHolding.qty;
                    let oldAvg = existingHolding.avg;

                    let newQty = oldQty + Number(qty);

                    let newAvg =
                        (oldQty * oldAvg + Number(qty) * Number(price)) /
                        newQty;

                    existingHolding.qty = newQty;
                    existingHolding.avg = newAvg;
                    existingHolding.price = Number(price);

                    await existingHolding.save();
                } else {
                    let newHolding = new HoldingsModel({
                        userId: req.userId,
                        name: name,
                        qty: Number(qty),
                        avg: Number(price),
                        price: Number(price),
                        net: "0.00%",
                        day: "0.00%",
                    });

                    await newHolding.save();
                }
            }

            if (product === "MIS") {
                if (existingPosition) {
                    let oldQty = existingPosition.qty;
                    let oldAvg = existingPosition.avg;

                    let newQty = oldQty + Number(qty);

                    let newAvg =
                        (oldQty * oldAvg + Number(qty) * Number(price)) /
                        newQty;

                    existingPosition.qty = newQty;
                    existingPosition.avg = newAvg;
                    existingPosition.price = Number(price);

                    await existingPosition.save();
                } else {
                    let newPosition = new PositionsModel({
                        userId: req.userId,
                        product: "MIS",
                        name: name,
                        qty: Number(qty),
                        avg: Number(price),
                        price: Number(price),
                        net: "0.00%",
                        day: "0.00%",
                        isLoss: false,
                    });

                    await newPosition.save();
                }
            }

            funds.availableCash =
                funds.availableCash - orderValue;

            await funds.save();

            return res.send("Buy order saved successfully");
        }

        if (mode === "SELL") {
            if (product === "CNC") {
                if (!existingHolding) {
                    return res.status(400).send("Holding not found");
                }

                if (Number(qty) > existingHolding.qty) {
                    return res.status(400).send("Not enough quantity to sell");
                }
            }

            if (product === "MIS") {
                if (!existingPosition) {
                    return res.status(400).send("Position not found");
                }

                if (Number(qty) > existingPosition.qty) {
                    return res.status(400).send("Not enough quantity in position");
                }
            }

            let newOrder = new OrdersModel({
                userId: req.userId,
                name: name,
                qty: qty,
                price: price,
                mode: mode,
                product: product,
            });

            await newOrder.save();

            if (product === "CNC") {
                let newQty =
                    existingHolding.qty - Number(qty);

                if (newQty === 0) {
                    await HoldingsModel.deleteOne({
                        userId: req.userId,
                        name: name,
                    });
                } else {
                    existingHolding.qty = newQty;
                    existingHolding.price = Number(price);

                    await existingHolding.save();
                }
            }

            if (product === "MIS") {
                let newQty =
                    existingPosition.qty - Number(qty);

                if (newQty === 0) {
                    await PositionsModel.deleteOne({
                        userId: req.userId,
                        name: name,
                        product: "MIS",
                    });
                } else {
                    existingPosition.qty = newQty;
                    existingPosition.price = Number(price);

                    await existingPosition.save();
                }
            }

            let orderValue = Number(qty) * Number(price);

            funds.availableCash =
                funds.availableCash + orderValue;

            await funds.save();

            return res.send("Sell order saved successfully");
        }

        return res.status(400).send("Invalid order mode");
    } catch (error) {
        console.log(error);
        res.status(500).send("Something went wrong");
    }
});

app.listen(PORT, () => {
    console.log(`App started on port ${PORT}`);

    mongoose.connect(uri)
        .then(() => {
            console.log("DB Connected");
        })
        .catch((error) => {
            console.log("DB connection error:", error);
        });
});