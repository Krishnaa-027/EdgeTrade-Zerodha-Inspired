import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";

const SellActionWindow = ({ uid }) => {
    const [product, setProduct] = useState("CNC");
    const [stockQuantity, setStockQuantity] = useState(1);
    const [stockPrice, setStockPrice] = useState(0.0);
    const [error, setError] = useState("");

    const {
        closeSellWindow,
        refreshHoldings,
        refreshFunds,
        showSuccessMessage,
    } = useContext(GeneralContext);

    const handleSellClick = async () => {
        try {
            await axios.post("http://localhost:3002/newOrder", {
                name: uid,
                qty: stockQuantity,
                price: stockPrice,
                mode: "SELL",
                product: product,
            });

            setError("");
            refreshHoldings();
            refreshFunds();
            closeSellWindow();

            showSuccessMessage(`Sell order successful for ${uid}`);
        } catch (error) {
            setError(
                error.response?.data || "Something went wrong"
            );

            setTimeout(() => {
                setError("");
            }, 4000);
        }
    };

    const handleCancelClick = () => {
        closeSellWindow();
    };

    return (
        <div className="container" id="buy-window" draggable="true">
            <div className="regular-order">

                <div className="stock-name">
                    {uid}
                </div>

                <div className="product-select">
                    <label>Product</label>

                    <select
                        value={product}
                        onChange={(e) => setProduct(e.target.value)}
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
                            onChange={(e) =>
                                setStockQuantity(e.target.value)
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
                            onChange={(e) =>
                                setStockPrice(e.target.value)
                            }
                            value={stockPrice}
                        />
                    </fieldset>
                </div>
            </div>

            <div className="buttons">
                <span>Margin required: ₹ _ _</span>

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
