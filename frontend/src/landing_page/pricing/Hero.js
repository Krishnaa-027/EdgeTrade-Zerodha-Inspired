import React from "react";

function Hero() {
    return (
        <div className="container mt-5 mb-5 " >
            <div className="p-5 mb-3 text-center">
                <h1 className="fs-3">Charges</h1>
                <p className="fs-5 text-muted">
                    {" "}
                    List of all charges and taxes
                </p>
            </div>

            <div
                className="p-3 mt-5 "
                style={{
                    display: "flex",
                    gap: "40px",
                    justifyContent: "space-between",
                    marginBottom: "100px"
                }}
            >
                <div
                    style={{
                        width: "33.33%",
                        textAlign: "center",
                    }}
                >
                    <img
                        src="media/images/pricingEquity.svg"
                        alt=""
                        style={{
                            width: "82%",
                        }}
                    />
                    <h2 className="fs-3" style={{opacity:"0.9"}}>Free equity delivery</h2>
                    <p
                        className="mt-4"
                        style={{
                            fontSize: "17px",
                            fontWeight: "400",
                            opacity: "0.7",
                            lineHeight: "1.6",
                            textShadow: "0 0 0.5px currentColor",
                        }}
                    >
                        All equity delivery investments (NSE, BSE), are
                        absolutely free — ₹ 0 brokerage.
                    </p>
                </div>

                <div
                    style={{
                        width: "33.33%",
                        textAlign: "center",
                    }}
                >
                    <img
                        src="media/images/intradayTrades.svg"
                        alt=""
                        style={{
                            width: "82%",
                        }}
                    />
                    <h2 className="fs-3" style={{opacity:"0.9"}}>Intraday and F&O trades</h2>
                    <p
                        className="mt-4"
                        style={{
                            fontSize: "17px",
                            fontWeight: "400",
                            opacity: "0.7",
                            lineHeight: "1.6",
                            textShadow: "0 0 0.5px currentColor",
                        }}
                    >
                        Flat ₹ 20 or 0.03% (whichever is lower) per executed
                        order on intraday trades across equity, currency, and
                        commodity trades. Flat ₹20 on all option trades.
                    </p>
                </div>

                <div
                    style={{
                        width: "33.33%",
                        textAlign: "center",
                    }}
                >
                    <img
                        src="media/images/pricingEquity.svg"
                        alt=""
                        style={{
                            width: "82%",
                        }}
                    />
                    <h2 className="fs-3" style={{opacity:"0.9"}}>Free direct MF</h2>
                    <p
                        className="mt-4"
                        style={{
                            fontSize: "17px",
                            fontWeight: "400",
                            opacity: "0.7",
                            lineHeight: "1.6",
                            textShadow: "0 0 0.5px currentColor",
                        }}
                    >
                        All direct mutual fund investments are absolutely free —
                        ₹ 0 commissions & DP charges.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Hero;
