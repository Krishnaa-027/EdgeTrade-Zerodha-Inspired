import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Hero.css";

function Hero() {

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
        <div className="container p-5 mb-5">
            <div className="row text-center">

                <img
                    src="media/images/homeHero.png"
                    alt="Hero Img"
                    className="hero-image"
                />

                <h1 className="hero-heading">
                    Invest in everything
                </h1>

                <p className="hero-text mt-2">
                    Online platform to invest in stocks, IPOs, derivatives, mutual funds, ETFs, bonds, and more.
                </p>

                {isLoggedIn ? (
                    <Link
                        to={process.env.REACT_APP_DASHBOARD_URL}
                        className="p-2 mt-3 btn btn-primary fs-5 mb-5 hero-button explore-dashboard-button"
                    >
                        Explore Dashboard{" "}<span className="dashboard-arrow">↗</span>
                    </Link>
                ) : (
                    <Link
                        to="/signup#account-form"
                        className="p-2 mt-2 btn btn-primary fs-5 mb-5 hero-button"
                    >
                        Sign up for free
                    </Link>
                )}

            </div>
        </div>
    );
}

export default Hero;