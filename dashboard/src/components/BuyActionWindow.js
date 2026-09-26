import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";

const BuyActionWindow = ({
    uid,
    marketPrice,
    dayChange,
}) => {
    const [product, setProduct] = useState("CNC");
    const [stockQuantity, setStockQuantity] = useState(1);
    const [stockPrice, setStockPrice] = useState(
        Number(marketPrice) || 0
    );
    const [error, setError] = useState("");

    const {
        closeBuyWindow,
        refreshHoldings,
        refreshFunds,
        showSuccessMessage,
    } = useContext(GeneralContext);

    useEffect(() => {
        setStockPrice(Number(marketPrice) || 0);
    }, [marketPrice]);

    const handleBuyClick = async () => {
        if (Number(stockQuantity) <= 0) {
            setError("Quantity must be greater than 0");
            return;
        }

        if (Number(stockPrice) <= 0) {
            setError("Price must be greater than 0");
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
                    mode: "BUY",
                    product: product,
                },
                {
                    withCredentials: true,
                }
            );

            setError("");

            refreshHoldings();
            refreshFunds();
            closeBuyWindow();

            showSuccessMessage(
                `Buy order successful for ${uid}`
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
        closeBuyWindow();
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

                <div className="market-info">
                    LTP: ₹{Number(marketPrice).toFixed(2)}
                    {" | "}
                    Day: {dayChange}
                </div>
            </div>

            <div className="buttons">
                <span>
                    Margin required: ₹{" "}
                    {marginRequired.toFixed(2)}
                </span>

                <div>
                    <Link
                        className="btn btn-blue"
                        onClick={handleBuyClick}
                    >
                        Buy
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

export default BuyActionWindow;