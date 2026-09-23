import React, { useState, useEffect, useContext } from "react";

import axios from "axios";

import GeneralContext from "./GeneralContext";

const Summary = () => {
    const [allHoldings, setAllHoldings] = useState([]);

    const { holdingsRefresh } = useContext(GeneralContext);

    useEffect(() => {
        axios.get("http://localhost:3002/allHoldings").then((res) => {
            setAllHoldings(res.data);
        });
    }, [holdingsRefresh]);

    const totalInvestment = allHoldings.reduce((total, stock) => {
        return total + stock.avg * stock.qty;
    }, 0);

    const currentValue = allHoldings.reduce((total, stock) => {
        return total + stock.price * stock.qty;
    }, 0);

    const totalPnL = currentValue - totalInvestment;

    const totalPnLPercentage =
        totalInvestment === 0
            ? 0
            : (totalPnL / totalInvestment) * 100;

    const totalPnLClass = totalPnL >= 0 ? "profit" : "loss";

    return (
        <>
            <div className="username">
                <h6>Hi, User!</h6>
                <hr className="divider" />
            </div>

            <div className="section">
                <span>
                    <p>Equity</p>
                </span>

                <div className="data">
                    <div className="first">
                        <h3>3.74k</h3>
                        <p>Margin available</p>
                    </div>
                    <hr />

                    <div className="second">
                        <p>
                            Margins used <span>0</span>{" "}
                        </p>
                        <p>
                            Opening balance <span>3.74k</span>{" "}
                        </p>
                    </div>
                </div>
                <hr className="divider" />
            </div>

            <div className="section">
                <span>
                    <p>Holdings ({allHoldings.length})</p>
                </span>

                <div className="data">
                    <div className="first">
                        <h3 className={totalPnLClass}>
                            {(totalPnL / 1000).toFixed(2)}k{" "}
                            <small>
                                {totalPnL >= 0 ? "+" : ""}
                                {totalPnLPercentage.toFixed(2)}%
                            </small>
                        </h3>
                        <p>P&L</p>
                    </div>
                    <hr />

                    <div className="second">
                        <p>
                            Current Value{" "}
                            <span>
                                {(currentValue / 1000).toFixed(2)}k
                            </span>{" "}
                        </p>

                        <p>
                            Investment{" "}
                            <span>
                                {(totalInvestment / 1000).toFixed(2)}k
                            </span>{" "}
                        </p>
                    </div>
                </div>
                <hr className="divider" />
            </div>
        </>
    );
};

export default Summary;