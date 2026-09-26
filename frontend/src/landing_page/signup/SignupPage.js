import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SignupHero from "./SignupHero";
import SignupSteps from "./SignupSteps";
import SignupBenefits from "./SignupBenefits";
import SignupFAQ from "./SignupFAQ";
import "./SignupPage.css";
import OpenAccount from "../OpenAccount";

function SignupPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/auth-status`, {
            credentials: "include",
        })
            .then((response) => setIsLoggedIn(response.ok))
            .catch(() => setIsLoggedIn(false));
    }, []);

    return (
        <>
            <SignupHero />
            <SignupSteps />
            <SignupBenefits />
            <SignupFAQ />

            {!isLoggedIn ? (
                <OpenAccount />
            ) : (
                <div className="signup-explore-section">
                    <h2>Want to know more?</h2>

                    <p>
                        Explore our pricing and learn more about the platform
                        before you get started.
                    </p>

                    <div className="signup-explore-buttons">
                        <Link to="/pricing" className="btn btn-primary">
                            View Pricing
                        </Link>

                        <Link to="/about" className="btn btn-outline-primary">
                            About Us
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
}

export default SignupPage;