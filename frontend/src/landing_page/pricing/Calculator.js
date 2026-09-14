import React, { useState} from "react";
import { Link } from "react-router-dom";
import "./Calculator.css";

function Calculator() {
    const [activeTab, setActiveTab] = useState("Equity");

    const equityTable = [
        {
            charge: "Brokerage",
            delivery: "Zero Brokerage",
            intraday: "0.03% or Rs. 20/executed order whichever is lower",
            futures: "0.03% or Rs. 20/executed order whichever is lower",
            options: "Flat Rs. 20 per executed order",
        },
        {
            charge: "STT/CTT",
            delivery: "0.1% on buy & sell",
            intraday: "0.025% on the sell side",
            futures: "0.05% on the sell side",
            options: [
                "0.15% of the intrinsic value on options that are bought and exercised",
                "0.15% on sell side (on premium)",
            ],
        },
        {
            charge: "Transaction charges",
            delivery: ["NSE: 0.00307%", "BSE: 0.00375%"],
            intraday: ["NSE: 0.00307%", "BSE: 0.00375%"],
            futures: ["NSE: 0.00183%", "BSE: 0"],
            options: [
                "NSE: 0.03553% (on premium)",
                "BSE: 0.0325% (on premium)",
            ],
        },
        {
            charge: "GST",
            delivery: "18% on (brokerage + SEBI charges + transaction charges)",
            intraday: "18% on (brokerage + SEBI charges + transaction charges)",
            futures: "18% on (brokerage + SEBI charges + transaction charges)",
            options: "18% on (brokerage + SEBI charges + transaction charges)",
        },
        {
            charge: "SEBI charges",
            delivery: "₹10 / crore",
            intraday: "₹10 / crore",
            futures: "₹10 / crore",
            options: "₹10 / crore",
        },
        {
            charge: "Stamp charges",
            delivery: "0.015% or ₹1500 / crore on buy side",
            intraday: "0.003% or ₹300 / crore on buy side",
            futures: "0.002% or ₹200 / crore on buy side",
            options: "0.003% or ₹300 / crore on buy side",
        },
    ];

    const currencyTable = [
        {
            charge: "Brokerage",
            futures: "0.03% or ₹ 20/executed order whichever is lower",
            options: "₹ 20/executed order",
        },
        {
            charge: "STT/CTT",
            futures: "No STT",
            options: "No STT",
        },
        {
            charge: "Transaction charges",
            futures: ["NSE: 0.00035%", "BSE: 0.00045%"],
            options: ["NSE: 0.0311%", "BSE: 0.001%"],
        },
        {
            charge: "GST",
            futures: "18% on (brokerage + SEBI charges + transaction charges)",
            options: "18% on (brokerage + SEBI charges + transaction charges)",
        },
        {
            charge: "SEBI charges",
            futures: "₹10 / crore",
            options: "₹10 / crore",
        },
        {
            charge: "Stamp charges",
            futures: "0.0001% or ₹10 / crore on buy side",
            options: "0.0001% or ₹10 / crore on buy side",
        },
    ];

    const commodityTable = [
        {
            charge: "Brokerage",
            futures: "0.03% or Rs. 20/executed order whichever is lower",
            options: "₹ 20/executed order",
        },
        {
            charge: "STT/CTT",
            futures: "0.01% on sell side (Non-Agri)",
            options: "0.05% on sell side",
        },
        {
            charge: "Transaction charges",
            futures: ["MCX: 0.0021%", "NSE: 0.0001%"],
            options: ["MCX: 0.0418%", "NSE: 0.001%"],
        },
        {
            charge: "GST",
            futures: "18% on (brokerage + SEBI charges + transaction charges)",
            options: "18% on (brokerage + SEBI charges + transaction charges)",
        },
        {
            charge: "SEBI charges",
            futures: ["Agri:", "₹1 / crore", "Non-agri:", "₹10 / crore"],
            options: "₹10 / crore",
        },
        {
            charge: "Stamp charges",
            futures: "0.002% or ₹200 / crore on buy side",
            options: "0.003% or ₹300 / crore on buy side",
        },
    ];

    const showData = (data) => {
        if (Array.isArray(data)) {
            return (
                <>
                    {data.map((item, index) => (
                        <React.Fragment key={index}>
                            {item}
                            {index < data.length - 1 && <br />}
                        </React.Fragment>
                    ))}
                </>
            );
        }

        return data;
    };

    return (
        <div className="container mt-5" style={{ marginTop: "100px" }}>
            <div className="calculator-tabs">
                <button
                    onClick={() => setActiveTab("Equity")}
                    className={
                        activeTab === "Equity"
                            ? "calculator-tab active"
                            : "calculator-tab"
                    }
                >
                    Equity
                </button>

                <button
                    onClick={() => setActiveTab("Currency")}
                    className={
                        activeTab === "Currency"
                            ? "calculator-tab active"
                            : "calculator-tab"
                    }
                >
                    Currency
                </button>

                <button
                    onClick={() => setActiveTab("Commodity")}
                    className={
                        activeTab === "Commodity"
                            ? "calculator-tab active"
                            : "calculator-tab"
                    }
                >
                    Commodity
                </button>
            </div>

            {activeTab === "Equity" && (
                <table className="calculator-table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Equity delivery</th>
                            <th>Equity intraday</th>
                            <th>F&O - Futures</th>
                            <th>F&O - Options</th>
                        </tr>
                    </thead>

                    <tbody>
                        {equityTable.map((row, index) => (
                            <tr key={index}>
                                <th>{row.charge}</th>
                                <td>{showData(row.delivery)}</td>
                                <td>{showData(row.intraday)}</td>
                                <td>{showData(row.futures)}</td>
                                <td>
                                    {Array.isArray(row.options) &&
                                    row.charge === "STT/CTT" ? (
                                        <ul>
                                            {row.options.map((item, index) => (
                                                <li
                                                    className="mb-2"
                                                    key={index}
                                                >
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        showData(row.options)
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {activeTab === "Currency" && (
                <table className="calculator-table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Currency futures</th>
                            <th>Currency options</th>
                        </tr>
                    </thead>

                    <tbody>
                        {currencyTable.map((row, index) => (
                            <tr key={index}>
                                <th>{row.charge}</th>
                                <td>{showData(row.futures)}</td>
                                <td>{showData(row.options)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {activeTab === "Commodity" && (
                <table className="calculator-table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Commodity futures</th>
                            <th>Commodity options</th>
                        </tr>
                    </thead>

                    <tbody>
                        {commodityTable.map((row, index) => (
                            <tr key={index}>
                                <th>{row.charge}</th>
                                <td>{showData(row.futures)}</td>
                                <td>{showData(row.options)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <h2 className="calculator-bottom"> <Link to=""> Calculate your costs upfront </Link> using our brokerage calculator</h2>
        </div>
    );
}

export default Calculator;
