import React, { useState, useEffect, useContext } from "react";

import axios from "axios";

import GeneralContext from "./GeneralContext";

const Summary = () => {
    const [allHoldings, setAllHoldings] = useState([]);
    const [funds, setFunds] = useState(null);

    const {
        holdingsRefresh,
        fundsRefresh,
    } = useContext(GeneralContext);

    useEffect(() => {
        axios.get("http://localhost:3002/allHoldings", {
            withCredentials: true,
        }).then((res) => {
            setAllHoldings(res.data);
        });
    }, [holdingsRefresh]);

    useEffect(() => {
        axios.get("http://localhost:3002/funds", {
            withCredentials: true,
        }).then((res) => {
            setFunds(res.data);
        });
    }, [fundsRefresh]);

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
                        <h3>
                            {funds
                                ? (funds.availableCash / 1000).toFixed(2)
                                : "0.00"}
                            k
                        </h3>

                        <p>Margin available</p>
                    </div>

                    <hr />

                    <div className="second">
                        <p>
                            Margins used <span>--</span>
                        </p>

                        <p>
                            Opening balance{" "}
                            <span>
                                {funds
                                    ? (funds.initialBalance / 1000).toFixed(2)
                                    : "0.00"}
                                k
                            </span>
                        </p>
                    </div>
                </div>

                <hr className="divider" />
            </div>

            <div className="section">
                <span>
                    <p>Holdings ({allHoldings.length})</p>
                </span>

                {allHoldings.length === 0 ? (

                    <div className="summary-empty-state">
                        <p>
                            No holdings yet. Buy a stock to see your
                            portfolio performance here.
                        </p>
                    </div>

                ) : (

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
                                </span>
                            </p>

                            <p>
                                Investment{" "}
                                <span>
                                    {(totalInvestment / 1000).toFixed(2)}k
                                </span>
                            </p>
                        </div>
                    </div>

                )}

                <hr className="divider" />
            </div>
        </>
    );
};

export default Summary;