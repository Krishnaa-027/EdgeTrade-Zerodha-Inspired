import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";

const SellActionWindow = ({
    uid,
    marketPrice,
    dayChange,
}) => {
    const [product, setProduct] = useState("CNC");
    const [stockQuantity, setStockQuantity] = useState(1);
    const [stockPrice, setStockPrice] = useState(
        Number(marketPrice) || 0
    );
    const [availableQuantity, setAvailableQuantity] = useState(0);
    const [error, setError] = useState("");

    const {
        closeSellWindow,
        refreshHoldings,
        refreshFunds,
        showSuccessMessage,
    } = useContext(GeneralContext);

    const loadAvailableQuantity = async () => {
        try {
            const holdingsResponse = await axios.get(
                "http://localhost:3002/allHoldings",
                {
                    withCredentials: true,
                }
            );

            const positionsResponse = await axios.get(
                "http://localhost:3002/allPositions",
                {
                    withCredentials: true,
                }
            );

            if (product === "CNC") {
                const holding =
                    holdingsResponse.data.find(
                        (item) => item.name === uid
                    );

                setAvailableQuantity(
                    holding ? holding.qty : 0
                );
            } else {
                const position =
                    positionsResponse.data.find(
                        (item) =>
                            item.name === uid &&
                            item.product === "MIS"
                    );

                setAvailableQuantity(
                    position ? position.qty : 0
                );
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        setStockPrice(Number(marketPrice) || 0);
    }, [marketPrice]);

    useEffect(() => {
        loadAvailableQuantity();
    }, [product, uid]);

    const handleSellClick = async () => {
        if (availableQuantity === 0) {
            setError(
                "You need to buy this stock first"
            );
            return;
        }

        if (Number(stockQuantity) <= 0) {
            setError(
                "Quantity must be greater than 0"
            );
            return;
        }

        if (Number(stockQuantity) > availableQuantity) {
            setError(
                `You can sell maximum ${availableQuantity} quantity`
            );
            return;
        }

        if (Number(stockPrice) <= 0) {
            setError(
                "Price must be greater than 0"
            );
            return;
        }

        try {
            await axios.post(
                "http://localhost:3002/newOrder",
                {
                    name: uid,
                    qty: Number(stockQuantity),
                    price: Number(stockPrice),
                    marketPrice: Number(marketPrice),
                    day: dayChange,
                    mode: "SELL",
                    product: product,
                },
                {
                    withCredentials: true,
                }
            );

            setError("");

            refreshHoldings();
            refreshFunds();

            closeSellWindow();

            showSuccessMessage(
                `Sell order successful for ${uid}`
            );
        } catch (error) {
            setError(
                error.response?.data ||
                "Something went wrong"
            );

            setTimeout(() => {
                setError("");
            }, 4000);
        }
    };

    const handleCancelClick = () => {
        closeSellWindow();
    };

    const marginRequired =
        Number(stockQuantity) * Number(stockPrice);

    return (
        <div
            className="container"
            id="buy-window"
            draggable="true"
        >
            <div className="regular-order">

                <div className="stock-name">
                    {uid}
                </div>

                <div className="product-select">
                    <label>Product</label>

                    <select
                        value={product}
                        onChange={(e) =>
                            setProduct(e.target.value)
                        }
                    >
                        <option value="CNC">CNC</option>
                        <option value="MIS">MIS</option>
                    </select>
                </div>

                <div className="inputs">
                    <fieldset>
                        <legend>Qty.</legend>

                        <input
                            type="number"
                            name="qty"
                            id="qty"
                            min="1"
                            onChange={(e) =>
                                setStockQuantity(
                                    e.target.value
                                )
                            }
                            value={stockQuantity}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>Price</legend>

                        <input
                            type="number"
                            name="price"
                            id="price"
                            step="0.05"
                            min="0"
                            onChange={(e) =>
                                setStockPrice(
                                    e.target.value
                                )
                            }
                            value={stockPrice}
                        />
                    </fieldset>
                </div>

                <div className="available-quantity">
                    Available quantity: {availableQuantity}
                </div>

                <div className="market-info">
                    LTP: ₹{Number(marketPrice).toFixed(2)}
                    {" | "}
                    Day: {dayChange}
                </div>
            </div>

            <div className="buttons">
                <span>
                    Order value: ₹{" "}
                    {marginRequired.toFixed(2)}
                </span>

                <div>
                    <Link
                        className="btn btn-blue"
                        onClick={handleSellClick}
                    >
                        Sell
                    </Link>

                    <Link
                        to=""
                        className="btn btn-grey"
                        onClick={handleCancelClick}
                    >
                        Cancel
                    </Link>
                </div>
            </div>

            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}
        </div>
    );
};

export default SellActionWindow;