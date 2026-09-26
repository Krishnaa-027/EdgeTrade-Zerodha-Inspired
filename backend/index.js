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
        const {
            name,
            qty,
            price,
            marketPrice,
            day,
            mode,
            product,
        } = req.body;

        const orderQty = Number(qty);
        const orderPrice = Number(price);
        const currentPrice = Number(marketPrice);
        const dayChange = day || "0.00%";

        if (!name || !product || !mode) {
            return res.status(400).send(
                "Required order details are missing"
            );
        }

        if (orderQty <= 0) {
            return res.status(400).send(
                "Quantity must be greater than 0"
            );
        }

        if (orderPrice <= 0) {
            return res.status(400).send(
                "Price must be greater than 0"
            );
        }

        if (currentPrice <= 0) {
            return res.status(400).send(
                "Current stock price is invalid"
            );
        }

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
            return res.status(500).send(
                "Funds account not found"
            );
        }

        if (mode === "BUY") {
            const orderValue =
                orderQty * orderPrice;

            if (orderValue > funds.availableCash) {
                return res.status(400).send(
                    "Insufficient funds"
                );
            }

            const newOrder = new OrdersModel({
                userId: req.userId,
                name: name,
                qty: orderQty,
                price: orderPrice,
                mode: mode,
                product: product,
            });

            await newOrder.save();

            if (product === "CNC") {
                if (existingHolding) {
                    const oldQty =
                        existingHolding.qty;

                    const oldAvg =
                        existingHolding.avg;

                    const newQty =
                        oldQty + orderQty;

                    const newAvg =
                        (
                            oldQty * oldAvg +
                            orderQty * orderPrice
                        ) / newQty;

                    const netPercentage =
                        (
                            (currentPrice - newAvg) /
                            newAvg
                        ) * 100;

                    existingHolding.qty =
                        newQty;

                    existingHolding.avg =
                        newAvg;

                    existingHolding.price =
                        currentPrice;

                    existingHolding.net =
                        `${netPercentage >= 0 ? "+" : ""}${netPercentage.toFixed(2)}%`;

                    existingHolding.day =
                        dayChange;

                    await existingHolding.save();
                } else {
                    const netPercentage =
                        (
                            (currentPrice - orderPrice) /
                            orderPrice
                        ) * 100;

                    const newHolding =
                        new HoldingsModel({
                            userId: req.userId,
                            name: name,
                            qty: orderQty,
                            avg: orderPrice,
                            price: currentPrice,
                            net:
                                `${netPercentage >= 0 ? "+" : ""}${netPercentage.toFixed(2)}%`,
                            day: dayChange,
                        });

                    await newHolding.save();
                }
            }

            if (product === "MIS") {
                if (existingPosition) {
                    const oldQty =
                        existingPosition.qty;

                    const oldAvg =
                        existingPosition.avg;

                    const newQty =
                        oldQty + orderQty;

                    const newAvg =
                        (
                            oldQty * oldAvg +
                            orderQty * orderPrice
                        ) / newQty;

                    const netPercentage =
                        (
                            (currentPrice - newAvg) /
                            newAvg
                        ) * 100;

                    existingPosition.qty =
                        newQty;

                    existingPosition.avg =
                        newAvg;

                    existingPosition.price =
                        currentPrice;

                    existingPosition.net =
                        `${netPercentage >= 0 ? "+" : ""}${netPercentage.toFixed(2)}%`;

                    existingPosition.day =
                        dayChange;

                    existingPosition.isLoss =
                        netPercentage < 0;

                    await existingPosition.save();
                } else {
                    const netPercentage =
                        (
                            (currentPrice - orderPrice) /
                            orderPrice
                        ) * 100;

                    const newPosition =
                        new PositionsModel({
                            userId: req.userId,
                            product: "MIS",
                            name: name,
                            qty: orderQty,
                            avg: orderPrice,
                            price: currentPrice,
                            net:
                                `${netPercentage >= 0 ? "+" : ""}${netPercentage.toFixed(2)}%`,
                            day: dayChange,
                            isLoss:
                                netPercentage < 0,
                        });

                    await newPosition.save();
                }
            }

            funds.availableCash =
                funds.availableCash - orderValue;

            await funds.save();

            return res.send(
                "Buy order saved successfully"
            );
        }

        if (mode === "SELL") {
            if (product === "CNC") {
                if (!existingHolding) {
                    return res.status(400).send(
                        "Holding not found"
                    );
                }

                if (orderQty > existingHolding.qty) {
                    return res.status(400).send(
                        "Not enough quantity to sell"
                    );
                }
            }

            if (product === "MIS") {
                if (!existingPosition) {
                    return res.status(400).send(
                        "Position not found"
                    );
                }

                if (orderQty > existingPosition.qty) {
                    return res.status(400).send(
                        "Not enough quantity in position"
                    );
                }
            }

            const newOrder = new OrdersModel({
                userId: req.userId,
                name: name,
                qty: orderQty,
                price: orderPrice,
                mode: mode,
                product: product,
            });

            await newOrder.save();

            if (product === "CNC") {
                const newQty =
                    existingHolding.qty - orderQty;

                if (newQty === 0) {
                    await HoldingsModel.deleteOne({
                        userId: req.userId,
                        name: name,
                    });
                } else {
                    const netPercentage =
                        (
                            (currentPrice -
                                existingHolding.avg) /
                            existingHolding.avg
                        ) * 100;

                    existingHolding.qty =
                        newQty;

                    existingHolding.price =
                        currentPrice;

                    existingHolding.net =
                        `${netPercentage >= 0 ? "+" : ""}${netPercentage.toFixed(2)}%`;

                    existingHolding.day =
                        dayChange;

                    await existingHolding.save();
                }
            }

            if (product === "MIS") {
                const newQty =
                    existingPosition.qty - orderQty;

                if (newQty === 0) {
                    await PositionsModel.deleteOne({
                        userId: req.userId,
                        name: name,
                        product: "MIS",
                    });
                } else {
                    const netPercentage =
                        (
                            (currentPrice -
                                existingPosition.avg) /
                            existingPosition.avg
                        ) * 100;

                    existingPosition.qty =
                        newQty;

                    existingPosition.price =
                        currentPrice;

                    existingPosition.net =
                        `${netPercentage >= 0 ? "+" : ""}${netPercentage.toFixed(2)}%`;

                    existingPosition.day =
                        dayChange;

                    existingPosition.isLoss =
                        netPercentage < 0;

                    await existingPosition.save();
                }
            }

            const orderValue =
                orderQty * orderPrice;

            funds.availableCash =
                funds.availableCash + orderValue;

            await funds.save();

            return res.send(
                "Sell order saved successfully"
            );
        }

        return res.status(400).send(
            "Invalid order mode"
        );
    } catch (error) {
        console.log(error);
        res.status(500).send(
            "Something went wrong"
        );
    }
});

app.listen(PORT, () => {
    console.log(`App started on port ${PORT}`);

    mongoose.connect(uri)
        .then(() => {
            console.log("DB Connected");
        })
        .catch((error) => {
            console.log(
                "DB connection error:",
                error
            );
        });
});