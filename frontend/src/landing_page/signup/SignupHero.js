import React, { useState } from "react";

function SignupHero() {

    const [showLogin, setShowLogin] = useState(false);

    const [signupData, setSignupData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const [message, setMessage] = useState("");

    const handleSignupChange = (e) => {
        setSignupData({
            ...signupData,
            [e.target.name]: e.target.value,
        });
    };

    const handleLoginChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSignup = async () => {
        const { name, email, password, confirmPassword } = signupData;

        if (!name || !email || !password || !confirmPassword) {
            setMessage("Please fill all the fields");
            return;
        }

        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
            return;
        }

        try {
            const response = await fetch("http://localhost:3002/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    name,
                    email,
                    password,
                }),
            });

            const data = await response.text();

            if (!response.ok) {
                setMessage(data);
                return;
            }

            setMessage("Signup successful! You are now logged in.");
        } catch (error) {
            console.log(error);
            setMessage("Something went wrong. Please try again.");
        }
    };

    const handleLogin = async () => {
        const { email, password } = loginData;

        if (!email || !password) {
            setMessage("Please enter email and password");
            return;
        }

        try {
            const response = await fetch("http://localhost:3002/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await response.text();

            if (!response.ok) {
                setMessage(data);
                return;
            }

            setMessage("Login successful!");
        } catch (error) {
            console.log(error);
            setMessage("Something went wrong. Please try again.");
        }
    };

    const switchToSignup = () => {
        setShowLogin(false);
        setMessage("");
    };

    const switchToLogin = () => {
        setShowLogin(true);
        setMessage("");
    };

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
                                    className={
                                        !showLogin
                                            ? "signup-tab active"
                                            : "signup-tab"
                                    }
                                    onClick={switchToSignup}
                                >
                                    Signup
                                </button>

                                <button
                                    className={
                                        showLogin
                                            ? "signup-tab active"
                                            : "signup-tab"
                                    }
                                    onClick={switchToLogin}
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
                                            name="name"
                                            placeholder="Enter your name"
                                            value={signupData.name}
                                            onChange={handleSignupChange}
                                        />
                                    </div>

                                    <div className="signup-input-group">
                                        <label>Email</label>

                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Enter your email"
                                            value={signupData.email}
                                            onChange={handleSignupChange}
                                        />
                                    </div>

                                    <div className="signup-input-group">
                                        <label>Password</label>

                                        <input
                                            type="password"
                                            name="password"
                                            placeholder="Enter your password"
                                            value={signupData.password}
                                            onChange={handleSignupChange}
                                        />
                                    </div>

                                    <div className="signup-input-group">
                                        <label>Confirm Password</label>

                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            placeholder="Confirm your password"
                                            value={signupData.confirmPassword}
                                            onChange={handleSignupChange}
                                        />
                                    </div>

                                    <button
                                        className="signup-main-btn"
                                        onClick={handleSignup}
                                    >
                                        Create Account
                                    </button>

                                    {message && (
                                        <p className="signup-form-text">
                                            {message}
                                        </p>
                                    )}

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
                                            name="email"
                                            placeholder="Enter your email"
                                            value={loginData.email}
                                            onChange={handleLoginChange}
                                        />
                                    </div>

                                    <div className="signup-input-group">
                                        <label>Password</label>

                                        <input
                                            type="password"
                                            name="password"
                                            placeholder="Enter your password"
                                            value={loginData.password}
                                            onChange={handleLoginChange}
                                        />
                                    </div>

                                    <button
                                        className="signup-main-btn"
                                        onClick={handleLogin}
                                    >
                                        Login
                                    </button>

                                    {message && (
                                        <p className="signup-form-text">
                                            {message}
                                        </p>
                                    )}

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