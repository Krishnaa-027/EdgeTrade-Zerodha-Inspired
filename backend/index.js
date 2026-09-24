require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const { FundsModel } = require("./model/FundsModel.js");
const { UserModel } = require("./model/UserModel.js");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));

app.use(bodyParser.json());
app.use(cookieParser());


app.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).send("All fields are required");
        }

        const existingUser = await UserModel.findOne({
            email: email,
        });

        if (existingUser) {
            return res.status(400).send("Email already registered");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new UserModel({
            name: name,
            email: email,
            password: hashedPassword,
        });

        await newUser.save();

        const token = jwt.sign(
            {
                id: newUser._id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d",
            }
        );

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "lax",
            secure: false,
        });


        const totalUsers = await UserModel.countDocuments();

        if (totalUsers === 1) {

            await FundsModel.updateMany(
                { userId: { $exists: false } },
                {
                    $set: {
                        userId: newUser._id,
                    },
                }
            );

            await HoldingsModel.updateMany(
                { userId: { $exists: false } },
                {
                    $set: {
                        userId: newUser._id,
                    },
                }
            );

            await OrdersModel.updateMany(
                { userId: { $exists: false } },
                {
                    $set: {
                        userId: newUser._id,
                    },
                }
            );

            await PositionsModel.updateMany(
                { userId: { $exists: false } },
                {
                    $set: {
                        userId: newUser._id,
                    },
                }
            );

            const existingFunds = await FundsModel.findOne({
                userId: newUser._id,
            });

            if (!existingFunds) {
                const newFunds = new FundsModel({
                    userId: newUser._id,
                    initialBalance: 100000,
                    availableCash: 100000,
                });

                await newFunds.save();
            }

        } else {

            const newFunds = new FundsModel({
                userId: newUser._id,
                initialBalance: 100000,
                availableCash: 100000,
            });

            await newFunds.save();
        }


        res.status(201).send("Signup successful");

    } catch (error) {
        console.log(error);
        res.status(500).send("Something went wrong");
    }
});


app.get("/allHoldings", async (req, res) => {
    let allHoldings = await HoldingsModel.find({});
    res.json(allHoldings);
});


app.get("/allPositions", async (req, res) => {
    let allPositions = await PositionsModel.find({});
    res.json(allPositions);
});


app.get("/allOrders", async (req, res) => {
    let allOrders = await OrdersModel.find({});
    res.send(allOrders);
});


app.get("/funds", async (req, res) => {
    try {
        let funds = await FundsModel.findOne();

        if (!funds) {
            funds = new FundsModel({
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


app.post("/newOrder", async (req, res) => {
    try {
        const { name, qty, price, mode, product } = req.body;

        let existingHolding = await HoldingsModel.findOne({
            name: name,
        });

        let existingPosition = await PositionsModel.findOne({
            name: name,
            product: "MIS",
        });

        let funds = await FundsModel.findOne();

        if (!funds) {
            return res.status(500).send("Funds account not found");
        }

        if (mode === "BUY") {
            let orderValue = Number(qty) * Number(price);

            if (orderValue > funds.availableCash) {
                return res.status(400).send("Insufficient funds");
            }

            let newOrder = new OrdersModel({
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
                    return res
                        .status(400)
                        .send("Not enough quantity in position");
                }
            }

            let newOrder = new OrdersModel({
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