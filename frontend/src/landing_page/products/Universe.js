import React, { useEffect, useState } from "react";
import "./Universe.css";
import { Link } from "react-router-dom";

function Universe() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const checkLoginStatus = async () => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_BACKEND_URL}/auth-status`,
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

    useEffect(() => {
        checkLoginStatus();

        const handleFocus = () => {
            checkLoginStatus();
        };

        window.addEventListener("focus", handleFocus);

        return () => {
            window.removeEventListener("focus", handleFocus);
        };
    }, []);

    return (
        <div className="container">
            <div className="row text-center p-5">

                <p
                    className=""
                    style={{
                        fontSize: "20.5px",
                        marginBottom: "90px",
                        marginTop: "60px",
                    }}
                >
                    Want to know more about our technology stack? Check out the{" "}
                    <Link to="#" style={{ textDecoration: "none" }}>
                        Zerodha.tech
                    </Link>{" "}
                    blog.
                </p>

                <h1 className=" fs-3">
                    The Zerodha Universe
                </h1>

                <p
                    className="mt-4 fw-semibold"
                    style={{
                        fontSize: "17px",
                        marginBottom: "60px",
                    }}
                >
                    Extend your trading and investment experience even further
                    with our partner platforms
                </p>

                <div className="col-4 universe-main-section">

                    <Link to="#" className="universe-link">
                        <img
                            src="media/images/zerodhaFundhouse.png"
                            className="universe-image"
                        />

                        <p className="text-small text-muted">
                            Our asset management venture that is creating simple
                            and transparent index funds to help you save for
                            your goals.
                        </p>
                    </Link>

                    <Link to="#" className="universe-link">
                        <img
                            src="media/images/streakLogo.png"
                            className="universe-image"
                        />

                        <p className="text-small text-muted">
                            Systematic trading platform that allows you to
                            create and backtest strategies without coding.
                        </p>
                    </Link>

                </div>

                <div className="col-4 universe-main-section">

                    <Link to="#" className="universe-link">
                        <img
                            src="media/images/sensibullLogo.svg"
                            className="universe-image"
                        />

                        <p className="text-small text-muted">
                            Options trading platform that lets you create
                            strategies, analyze positions, and examine data
                            points like open interest, FII/DII, and more.
                        </p>
                    </Link>

                    <Link to="#" className="universe-link">
                        <img
                            src="media/images/smallcaseLogo.png"
                            className="universe-image"
                        />

                        <p className="text-small text-muted">
                            Thematic investing platform that helps you invest in
                            diversified baskets of stocks on ETFs.
                        </p>
                    </Link>

                </div>

                <div className="col-4 universe-main-section mb-4">

                    <Link to="#" className="universe-link">
                        <img
                            src="media/images/tijoriLogo.PNG"
                            className="universe-image"
                            style={{ width: "45%" }}
                        />

                        <p className="text-muted">
                            Investment research platform that offers detailed
                            insights on stocks, sectors, supply chains, and
                            more.
                        </p>
                    </Link>

                    <Link to="#" className="universe-link">
                        <img
                            src="media/images/dittoLogo.png"
                            className="universe-image"
                            style={{ width: "36%" }}
                        />

                        <p className="text-small text-muted">
                            Personalized advice on life and health insurance. No
                            spam and no mis-selling.
                        </p>
                    </Link>

                </div>

                {!isLoggedIn && (
                    <button
                        className="p-2 btn btn-primary fs-5 mb-5"
                        style={{
                            width: "20%",
                            margin: "0 auto",
                            backgroundColor: "#2170d8",
                            fontWeight: "500",
                        }}
                    >
                        Sign up for free
                    </button>
                )}

            </div>
        </div>
    );
}

export default Universe;