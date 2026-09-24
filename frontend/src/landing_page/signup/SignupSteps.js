import React from "react";
import "./SignupSteps.css";

function SignupSteps() {
    return (
        <section className="signup-steps-section">

            <div className="signup-steps-container">

                <div className="signup-steps-heading">

                    <h2>Steps to open an account</h2>

                </div>

                <div className="signup-steps-content">

                    <div className="signup-steps-image">

                        <img
                            src="/media/images/SignupStepsImg.png"
                            alt="Steps to open an account"
                        />

                    </div>

                    <div className="signup-steps-right">

                        <div className="signup-step">
                            <span>01</span>

                            <h3>
                                Enter the requested details
                            </h3>
                        </div>

                        <div className="signup-step">
                            <span>02</span>

                            <h3>
                                Complete e-sign & verification
                            </h3>
                        </div>

                        <div className="signup-step">
                            <span>03</span>

                            <h3>
                                Start investing!
                            </h3>
                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default SignupSteps;