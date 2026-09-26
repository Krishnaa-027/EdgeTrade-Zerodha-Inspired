const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { UserModel } = require("../model/UserModel");
const { FundsModel } = require("../model/FundsModel");
const { HoldingsModel } = require("../model/HoldingsModel");
const { PositionsModel } = require("../model/PositionsModel");
const { OrdersModel } = require("../model/OrdersModel");

const router = express.Router();

router.post("/signup", async (req, res) => {
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

        const totalUsers = await UserModel.countDocuments();

        if (totalUsers === 1) {
            await HoldingsModel.updateMany(
                {},
                {
                    $set: {
                        userId: newUser._id,
                    },
                },
            );

            await PositionsModel.updateMany(
                {},
                {
                    $set: {
                        userId: newUser._id,
                    },
                },
            );

            await OrdersModel.updateMany(
                {},
                {
                    $set: {
                        userId: newUser._id,
                    },
                },
            );

            await FundsModel.updateMany(
                {},
                {
                    $set: {
                        userId: newUser._id,
                    },
                },
            );
        } else {
            const newFunds = new FundsModel({
                userId: newUser._id,
                initialBalance: 100000,
                availableCash: 100000,
            });

            await newFunds.save();
        }

        const token = jwt.sign(
            {
                id: newUser._id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d",
            },
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.send("Signup successful");
    } catch (error) {
        console.log(error);
        res.status(500).send("Something went wrong");
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({
            email: email,
        });

        if (!user) {
            return res.status(400).send("Invalid email or password");
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password,
        );

        if (!isPasswordCorrect) {
            return res.status(400).send("Invalid email or password");
        }

        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d",
            },
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.send("Login successful");
    } catch (error) {
        console.log(error);
        res.status(500).send("Something went wrong");
    }
});

router.get("/auth-status", async (req, res) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).send("Not logged in");
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET,
        );

        const user = await UserModel.findById(decoded.id);

        if (!user) {
            return res.status(401).send("User not found");
        }

        res.json({
            name: user.name,
            email: user.email,
        });
    } catch (error) {
        return res.status(401).send("Not logged in");
    }
});

router.get("/profile", async (req, res) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).send("Not logged in");
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET,
        );

        const user = await UserModel.findById(decoded.id);

        if (!user) {
            return res.status(401).send("User not found");
        }

        res.json({
            name: user.name,
            email: user.email,
            mobile: user.mobile,
            dateOfBirth: user.dateOfBirth,
            address: user.address,
            city: user.city,
            state: user.state,
            pincode: user.pincode,
            accountType: "Individual",
            accountStatus: "Active",
        });
    } catch (error) {
        return res.status(401).send("Not logged in");
    }
});

router.put("/profile", async (req, res) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).send("Not logged in");
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET,
        );

        const user = await UserModel.findById(decoded.id);

        if (!user) {
            return res.status(401).send("User not found");
        }

        const {
            name,
            mobile,
            dateOfBirth,
            address,
            city,
            state,
            pincode,
        } = req.body;

        if (!name) {
            return res.status(400).send("Name is required");
        }

        user.name = name;
        user.mobile = mobile || "";
        user.dateOfBirth = dateOfBirth || "";
        user.address = address || "";
        user.city = city || "";
        user.state = state || "";
        user.pincode = pincode || "";

        await user.save();

        res.send("Profile updated successfully");
    } catch (error) {
        console.log(error);
        res.status(500).send("Something went wrong");
    }
});

router.post("/logout", (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
    });

    res.send("Logout successful");
});

module.exports = { router };