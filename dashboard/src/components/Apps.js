import React from "react";

const Apps = () => {
    return (
        <div className="apps-page">

            <div className="apps-header">
                <h1>Tools & Extensions</h1>
                <p>
                    Explore additional tools designed to enhance your trading experience.
                </p>
            </div>

            <div className="apps-list">

                <div className="apps-item">
                    <div className="apps-item-content">
                        <h3>Market Insights</h3>
                        <p>
                            Get useful market information and insights to understand
                            stocks and market movements.
                        </p>
                    </div>

                    <span className="apps-status">
                        Coming Soon
                    </span>
                </div>

                <div className="apps-item">
                    <div className="apps-item-content">
                        <h3>Strategy Lab</h3>
                        <p>
                            Explore and test different trading strategies with
                            useful analysis tools.
                        </p>
                    </div>

                    <span className="apps-status">
                        In Development
                    </span>
                </div>

                <div className="apps-item">
                    <div className="apps-item-content">
                        <h3>Price Alerts</h3>
                        <p>
                            Set alerts for selected stocks and stay updated when
                            important price levels are reached.
                        </p>
                    </div>

                    <span className="apps-status">
                        Coming Soon
                    </span>
                </div>

                <div className="apps-item">
                    <div className="apps-item-content">
                        <h3>Portfolio Analytics</h3>
                        <p>
                            Analyze portfolio performance and understand your
                            investments with detailed insights.
                        </p>
                    </div>

                    <span className="apps-status">
                        In Development
                    </span>
                </div>

            </div>

            <div className="apps-footer">
                <p>More tools are on the way.</p>
            </div>

        </div>
    );
};

export default Apps;