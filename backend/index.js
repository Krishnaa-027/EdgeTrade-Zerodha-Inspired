require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");
const bodyParser = require("body-parser");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const { FundsModel } = require("./model/FundsModel.js");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

const app = express();

app.use(cors());
app.use(bodyParser.json());

// app.get("/addHoldings", async(req,res) => {

//     let tempHoldings = [
//         {
//             name: "BHARTIARTL",
//             qty: 2,
//             avg: 538.05,
//             price: 541.15,
//             net: "+0.58%",
//             day: "+2.99%",
//         },
//         {
//             name: "HDFCBANK",
//             qty: 2,
//             avg: 1383.4,
//             price: 1522.35,
//             net: "+10.04%",
//             day: "+0.11%",
//         },
//         {
//             name: "HINDUNILVR",
//             qty: 1,
//             avg: 2335.85,
//             price: 2417.4,
//             net: "+3.49%",
//             day: "+0.21%",
//         },
//         {
//             name: "INFY",
//             qty: 1,
//             avg: 1350.5,
//             price: 1555.45,
//             net: "+15.18%",
//             day: "-1.60%",
//             isLoss: true,
//         },
//         {
//             name: "ITC",
//             qty: 5,
//             avg: 202.0,
//             price: 207.9,
//             net: "+2.92%",
//             day: "+0.80%",
//         },
//         {
//             name: "KPITTECH",
//             qty: 5,
//             avg: 250.3,
//             price: 266.45,
//             net: "+6.45%",
//             day: "+3.54%",
//         },
//         {
//             name: "M&M",
//             qty: 2,
//             avg: 809.9,
//             price: 779.8,
//             net: "-3.72%",
//             day: "-0.01%",
//             isLoss: true,
//         },
//         {
//             name: "RELIANCE",
//             qty: 1,
//             avg: 2193.7,
//             price: 2112.4,
//             net: "-3.71%",
//             day: "+1.44%",
//         },
//         {
//             name: "SBIN",
//             qty: 4,
//             avg: 324.35,
//             price: 430.2,
//             net: "+32.63%",
//             day: "-0.34%",
//             isLoss: true,
//         },
//         {
//             name: "SGBMAY29",
//             qty: 2,
//             avg: 4727.0,
//             price: 4719.0,
//             net: "-0.17%",
//             day: "+0.15%",
//         },
//         {
//             name: "TATAPOWER",
//             qty: 5,
//             avg: 104.2,
//             price: 124.15,
//             net: "+19.15%",
//             day: "-0.24%",
//             isLoss: true,
//         },
//         {
//             name: "TCS",
//             qty: 1,
//             avg: 3041.7,
//             price: 3194.8,
//             net: "+5.03%",
//             day: "-0.25%",
//             isLoss: true,
//         },
//         {
//             name: "WIPRO",
//             qty: 4,
//             avg: 489.3,
//             price: 577.75,
//             net: "+18.08%",
//             day: "+0.32%",
//         },
//     ];

//     tempHoldings.forEach((item) => {
//         let newHolding = new HoldingsModel({
//             name: item.name,
//             qty: item.qty,
//             avg: item.avg,
//             price: item.price,
//             net: item.net,
//             day: item.day,
//         })

//         newHolding.save();
//     });

//     res.send("done!");
// })

// app.get("/addPositions", async (req, res) => {

//     let tempPositions = [
//         {
//             product: "CNC",
//             name: "EVEREADY",
//             qty: 2,
//             avg: 316.27,
//             price: 312.35,
//             net: "+0.58%",
//             day: "-1.24%",
//             isLoss: true,
//         },
//         {
//             product: "CNC",
//             name: "JUBLFOOD",
//             qty: 1,
//             avg: 3124.75,
//             price: 3082.65,
//             net: "+10.04%",
//             day: "-1.35%",
//             isLoss: true,
//         },
//     ];

//     tempPositions.forEach((item) => {
//         let newPosition = new PositionsModel({
//             product: item.product,
//             name: item.name,
//             qty: item.qty,
//             avg: item.avg,
//             price: item.price,
//             net: item.net,
//             day: item.day,
//             isLoss: item.isLoss,
//         });

//         newPosition.save();
//     });

//     res.send("done!");
// });

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