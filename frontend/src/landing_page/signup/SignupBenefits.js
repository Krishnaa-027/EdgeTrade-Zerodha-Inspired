import React from "react";
import "./SignupBenefits.css";

function SignupBenefits() {
    return (
        <section className="signup-benefits-section">

            <div className="signup-benefits-container">

                <div className="signup-benefits-left">

                    <div className="signup-benefits-image">

                        <img
                            src="/media/images/SignupBenefitImg.png"
                            alt="Benefits of opening an account"
                        />

                    </div>

                    <div className="signup-benefits-heading">

                        <h2>
                            Benefits of opening a Zerodha demat account
                        </h2>

                    </div>

                </div>

                <div className="signup-benefits-right">

                    <div className="signup-benefit">

                        <h3>Unbeatable pricing</h3>

                        <p>
                            Zero charges for equity and mutual fund
                            investments. Flat fees for intraday and F&O
                            trades.
                        </p>

                    </div>

                    <div className="signup-benefit">

                        <h3>Best investing experience</h3>

                        <p>
                            Simple and intuitive trading platform with an
                            easy-to-understand user interface.
                        </p>

                    </div>

                    <div className="signup-benefit">

                        <h3>No spam or gimmicks</h3>

                        <p>
                            Committed to transparency with a simple and
                            straightforward investing experience.
                        </p>

                    </div>

                    <div className="signup-benefit">

                        <h3>The investing universe</h3>

                        <p>
                            Get access to a range of tools and products
                            designed to make investing easier.
                        </p>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default SignupBenefits;