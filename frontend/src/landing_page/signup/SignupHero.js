import React, { useState } from "react";

function SignupHero() {

    const [showLogin, setShowLogin] = useState(false);

    return (
        <>
            <section className="signup-hero">

                <div className="signup-hero-content">

                    <h1>Open a free account</h1>

                    <p>
                        Start investing with a simple and easy-to-use
                        trading platform.
                    </p>

                    <div className="signup-hero-row">

                        <div className="signup-hero-image">

                            <img
                                src="/media/images/SignupHeroImg_.png"
                                alt="Open account"
                            />

                        </div>

                        <div className="signup-form-box" id="account-form">

                            <div className="signup-form-header">

                                <button
                                    className={!showLogin ? "signup-tab active" : "signup-tab"}
                                    onClick={() => setShowLogin(false)}
                                >
                                    Signup
                                </button>

                                <button
                                    className={showLogin ? "signup-tab active" : "signup-tab"}
                                    onClick={() => setShowLogin(true)}
                                >
                                    Login
                                </button>

                            </div>

                            {!showLogin ? (
                                <>
                                    <h2>Create your account</h2>

                                    <p className="signup-form-text">
                                        Enter your details to create your account.
                                    </p>

                                    <div className="signup-input-group">
                                        <label>Name</label>

                                        <input
                                            type="text"
                                            placeholder="Enter your name"
                                        />
                                    </div>

                                    <div className="signup-input-group">
                                        <label>Email</label>

                                        <input
                                            type="email"
                                            placeholder="Enter your email"
                                        />
                                    </div>

                                    <div className="signup-input-group">
                                        <label>Password</label>

                                        <input
                                            type="password"
                                            placeholder="Enter your password"
                                        />
                                    </div>

                                    <div className="signup-input-group">
                                        <label>Confirm Password</label>

                                        <input
                                            type="password"
                                            placeholder="Confirm your password"
                                        />
                                    </div>

                                    <button className="signup-main-btn">
                                        Create Account
                                    </button>

                                    <p className="signup-terms">
                                        By proceeding, you agree to our terms &
                                        privacy policy.
                                    </p>
                                </>
                            ) : (
                                <>
                                    <h2>Welcome back</h2>

                                    <p className="signup-form-text">
                                        Login to continue to your account.
                                    </p>

                                    <div className="signup-input-group">
                                        <label>Email</label>

                                        <input
                                            type="email"
                                            placeholder="Enter your email"
                                        />
                                    </div>

                                    <div className="signup-input-group">
                                        <label>Password</label>

                                        <input
                                            type="password"
                                            placeholder="Enter your password"
                                        />
                                    </div>

                                    <button className="signup-main-btn">
                                        Login
                                    </button>

                                    <p className="signup-terms">
                                        Login to access your trading dashboard.
                                    </p>
                                </>
                            )}

                        </div>

                    </div>

                </div>

            </section>

            <section className="existing-account-section">

                <h2>Already have a demat account?</h2>

                <p>
                    Move your holdings to our platform and manage your
                    investments easily,{" "}
                    <a href="/support">learn more.</a>
                </p>

            </section>
        </>
    );
}

export default SignupHero;