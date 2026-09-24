import React, { useEffect, useState } from "react";

function SignupHero() {

    const [showLogin, setShowLogin] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

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

    useEffect(() => {
        checkLoginStatus();
    }, []);

    useEffect(() => {
        if (!message) {
            return;
        }

        const timer = setTimeout(() => {
            setMessage("");
        }, 4000);

        return () => {
            clearTimeout(timer);
        };
    }, [message]);

    const checkLoginStatus = async () => {
        try {
            const response = await fetch(
                "http://localhost:3002/auth-status",
                {
                    credentials: "include",
                }
            );

            if (response.ok) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        } catch (error) {
            console.log(error);
            setIsLoggedIn(false);
        }
    };

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

            setSignupData({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
            });

            setMessage("");

            window.location.href = "http://localhost:3001";
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

            setLoginData({
                email: "",
                password: "",
            });

            setMessage("");

            window.location.href = "http://localhost:3001";
        } catch (error) {
            console.log(error);
            setMessage("Something went wrong. Please try again.");
        }
    };

    const handleSignupKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSignup();
        }
    };

    const handleLoginKeyDown = (e) => {
        if (e.key === "Enter") {
            handleLogin();
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

    if (isLoggedIn) {
        return (
            <>
                <section className="signup-hero">

                    <div className="signup-hero-content">

                        <h1>You're already signed in</h1>

                        <p>
                            Your account is ready. Explore your account or
                            continue exploring our platform.
                        </p>

                        <div className="signup-hero-row">

                            <div className="signup-hero-image">

                                <img
                                    src="/media/images/SignupHeroImg_.png"
                                    alt="Account"
                                />

                            </div>

                            <div className="logged-in-account-box">

                                <h2>Explore your account</h2>

                                <p>
                                    Manage your investments and view your
                                    trading dashboard.
                                </p>

                                <div className="logged-in-account-buttons">

                                    <a
                                        href="http://localhost:3001"
                                        className="signup-main-btn"
                                    >
                                        Go to Dashboard
                                    </a>

                                    <a
                                        href="/products"
                                        className="signup-outline-btn"
                                    >
                                        Explore Platform
                                    </a>

                                </div>

                            </div>

                        </div>

                    </div>

                </section>
            </>
        );
    }

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
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        handleSignup();
                                    }}
                                >

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
                                        type="submit"
                                        className="signup-main-btn"
                                    >
                                        Create Account
                                    </button>

                                    {message && (
                                        <p className="signup-error-message">
                                            {message}
                                        </p>
                                    )}

                                    <p className="signup-terms">
                                        By proceeding, you agree to our terms &
                                        privacy policy.
                                    </p>

                                </form>
                            ) : (
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        handleLogin();
                                    }}
                                >

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
                                        type="submit"
                                        className="signup-main-btn"
                                    >
                                        Login
                                    </button>

                                    {message && (
                                        <p className="signup-error-message">
                                            {message}
                                        </p>
                                    )}

                                    <p className="signup-terms">
                                        Login to access your trading dashboard.
                                    </p>

                                </form>
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