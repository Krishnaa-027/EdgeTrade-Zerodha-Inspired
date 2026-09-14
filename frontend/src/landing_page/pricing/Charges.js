import React from "react";
import "./Charges.css";

function Charges() {
    const charges = [
        {
            type: "Individual account",
            charges: "FREE",
        },
        {
            type: "Minor account",
            charges: "FREE",
        },
        {
            type: "NRI account",
            charges: "₹ 500",
        },
        {
            type: "HUF account",
            charges: (
                <>
                    <span className="free-badge">FREE </span> (online) / ₹ 500 (offline)
                </>
            ),
        },
        {
            type: "Partnership, LLP, and Corporate accounts (offline only)",
            charges: "₹ 500",
        },
    ];

    return (
        <div className="container charges-section ">
            <h2 className="charges-heading">Charges for account opening</h2>

            <table className="charges-table">
                <thead>
                    <tr>
                        <th>Type of account</th>
                        <th>Charges</th>
                    </tr>
                </thead>

                <tbody>
                    {charges.map((row, index) => (
                        <tr key={index}>
                            <th>{row.type}</th>
                            <td>
                                {row.charges === "FREE" ? (
                                    <span className="free-badge">FREE</span>
                                ) : (
                                    row.charges
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="amc-section">
                <h2 className="charges-heading">
                    Demat AMC (Annual Maintenance Charge)
                </h2>

                <div className="amc-note">
                    Free for first year*
                </div>

                <p className="charges-paragraph">
                    From second year onwards, for BSDA accounts:
                </p>

                <table className="charges-table">
                    <thead>
                        <tr>
                            <th>Value of holdings</th>
                            <th>AMC</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <th>Up to ₹4 lakh</th>
                            <td>
                                <span className="free-badge">FREE</span>
                            </td>
                        </tr>

                        <tr>
                            <th>₹4 lakh – ₹10 lakh</th>
                            <td>
                                ₹100 per year + 18% GST, charged quarterly
                            </td>
                        </tr>

                        <tr>
                            <th>Above ₹10 lakh</th>
                            <td>
                                ₹300 per year + 18% GST, charged quarterly
                            </td>
                        </tr>
                    </tbody>
                </table>

                <p className="charges-paragraph">
                    For a non-BSDA account, AMC is ₹300 per year + 18% GST, regardless
                    of holdings value, charged quarterly.
                </p>

                <p className="charges-paragraph">
                    To learn more about BSDA,{" "}
                    <a href="#" className="charges-link">click here</a>.
                    {" "}To learn more about AMC,{" "}
                    <a href="#" className="charges-link">click here</a>.
                </p>

                <p className="charges-footnote">
                    *Resident individual accounts only.
                </p>
            </div>

            <div className="services-section">
                <h2 className="charges-heading">
                    Charges for optional value added services
                </h2>

                <table className="charges-table">
                    <thead>
                        <tr>
                            <th>Service</th>
                            <th>Billing Frequency</th>
                            <th>Charges</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <th>Tickertape</th>
                            <td>Monthly / Quarterly / Annual</td>
                            <td>Free: 0 | Pro: 249/699/2399</td>
                        </tr>

                        <tr>
                            <th>Smallcase</th>
                            <td>Per transaction</td>
                            <td>Buy & Invest More: 100 | SIP: 10</td>
                        </tr>

                        <tr>
                            <th>Kite Connect</th>
                            <td>Monthly</td>
                            <td>Connect: 500 | Personal: Free</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Charges;