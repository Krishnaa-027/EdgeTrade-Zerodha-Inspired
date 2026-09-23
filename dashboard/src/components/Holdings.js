import React, { useState, useEffect, useContext } from "react";

import axios from "axios";

import GeneralContext from "./GeneralContext";

const Holdings = () => {
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
            <h3 className="title">Holdings ({allHoldings.length})</h3>

            <div className="order-table">
                <table>
                    <tr>
                        <th>Instrument</th>
                        <th>Qty.</th>
                        <th>Avg. cost</th>
                        <th>LTP</th>
                        <th>Cur. val</th>
                        <th>P&L</th>
                        <th>Net chg.</th>
                        <th>Day chg.</th>
                    </tr>

                    {allHoldings.map((stock, index) => {
                        const curValue = stock.price * stock.qty;
                        const isProfit =
                            curValue - stock.avg * stock.qty >= 0.0;
                        const profClass = isProfit ? "profit" : "loss";
                        const dayClass = stock.isLoss ? "loss" : "profit";

                        return (
                            <tr key={index}>
                                <td>{stock.name}</td>
                                <td>{stock.qty}</td>
                                <td>{stock.avg.toFixed(2)}</td>
                                <td>{stock.price.toFixed(2)}</td>
                                <td>{curValue.toFixed(2)}</td>
                                <td className={profClass}>
                                    {(curValue - stock.avg * stock.qty).toFixed(
                                        2,
                                    )}
                                </td>
                                <td className={profClass}> {stock.net}</td>
                                <td className={dayClass}> {stock.day}</td>
                            </tr>
                        );
                    })}
                </table>
            </div>

            <div className="row">
                <div className="col">
                    <h5>
                        {totalInvestment.toFixed(2)}
                    </h5>
                    <p>Total investment</p>
                </div>

                <div className="col">
                    <h5>
                        {currentValue.toFixed(2)}
                    </h5>
                    <p>Current value</p>
                </div>

                <div className="col">
                    <h5 className={totalPnLClass}>
                        {totalPnL.toFixed(2)} (
                        {totalPnLPercentage.toFixed(2)}%)
                    </h5>
                    <p>P&L</p>
                </div>
            </div>
        </>
    );
};

export default Holdings;