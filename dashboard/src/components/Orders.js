import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import GeneralContext from "./GeneralContext";

const Orders = () => {
    const [allOrders, setAllOrders] = useState([]);

    const { holdingsRefresh } = useContext(GeneralContext);

    useEffect(() => {
        axios
            .get("http://localhost:3002/allOrders", {
                withCredentials: true,
            })
            .then((res) => {
                setAllOrders(res.data);
            });
    }, [holdingsRefresh]);

    return (
        <div className="orders">

            {allOrders.length === 0 ? (

                <div className="no-orders">
                    <h3>No orders yet</h3>

                    <p>
                        Your orders will appear here once you place your
                        first trade.
                    </p>

                </div>

            ) : (

                <div className="order-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Mode</th>
                            </tr>
                        </thead>

                        <tbody>
                            {allOrders.map((order, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{order.name}</td>

                                        <td>
                                            {order.product || "-"}
                                        </td>

                                        <td>{order.qty}</td>

                                        <td>₹{order.price}</td>

                                        <td
                                            className={
                                                order.mode === "BUY"
                                                    ? "profit"
                                                    : "loss"
                                            }
                                        >
                                            {order.mode}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

            )}

        </div>
    );
};

export default Orders;