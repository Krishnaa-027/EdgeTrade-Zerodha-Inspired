import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

function NavBar() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [showLoginMessage, setShowLoginMessage] = useState(false);

    useEffect(() => {
        checkLoginStatus();
    }, []);

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

    const handleMenuClick = () => {
        setShowLoginMessage(false);

        if (isLoggedIn) {
            setShowMenu(!showMenu);
        } else {
            setShowMenu(false);
            setShowLoginMessage(true);
        }
    };

    const handleLogout = async () => {
        try {
            await fetch("http://localhost:3002/logout", {
                method: "POST",
                credentials: "include",
            });

            setIsLoggedIn(false);
            setShowMenu(false);
            window.location.href = "http://localhost:3000";
        } catch (error) {
            console.log(error);
        }
    };

    const handleDashboard = () => {
        setShowMenu(false);
        window.location.href = "http://localhost:3001";
    };

    const handleProfile = () => {
        setShowMenu(false);
    };

    return (
        <nav
            className="navbar navbar-expand-lg navbar-light sticky-top"
            style={{
                backgroundColor: "#ffffff",
                borderBottom: "2px solid #f3f2f1",
            }}
        >
            <div className="container p-1">

                <Link className="navbar-brand ms-1 mb-1" to="/">
                    <img
                        src="media/images/logo.svg"
                        alt="logo"
                        style={{ width: "22%" }}
                    />
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >

                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                        <li className="nav-item me-4">
                            <NavLink
                                className={({ isActive }) =>
                                    isActive
                                        ? "nav-link active-page"
                                        : "nav-link"
                                }
                                to="/signup"
                            >
                                Signup
                            </NavLink>
                        </li>

                        <li className="nav-item me-4">
                            <NavLink
                                className={({ isActive }) =>
                                    isActive
                                        ? "nav-link active-page"
                                        : "nav-link"
                                }
                                to="/about"
                            >
                                About
                            </NavLink>
                        </li>

                        <li className="nav-item me-4">
                            <NavLink
                                className={({ isActive }) =>
                                    isActive
                                        ? "nav-link active-page"
                                        : "nav-link"
                                }
                                to="/products"
                            >
                                Products
                            </NavLink>
                        </li>

                        <li className="nav-item me-4">
                            <NavLink
                                className={({ isActive }) =>
                                    isActive
                                        ? "nav-link active-page"
                                        : "nav-link"
                                }
                                to="/pricing"
                            >
                                Pricing
                            </NavLink>
                        </li>

                        <li className="nav-item me-4">
                            <NavLink
                                className={({ isActive }) =>
                                    isActive
                                        ? "nav-link active-page"
                                        : "nav-link"
                                }
                                to="/support"
                            >
                                Support
                            </NavLink>
                        </li>

                        <li
                            className="nav-item me-4 mt-2"
                            style={{ position: "relative" }}
                        >
                            <i
                                className="fa fa-bars fs-4"
                                style={{
                                    height: "0.1px",
                                    opacity: 0.7,
                                    cursor: "pointer",
                                }}
                                onClick={handleMenuClick}
                                aria-hidden="true"
                            ></i>

                            {showLoginMessage && (
                                <div
                                    style={{
                                        position: "absolute",
                                        top: "35px",
                                        right: "0",
                                        width: "260px",
                                        padding: "12px",
                                        backgroundColor: "#ffffff",
                                        border: "1px solid #e5e5e5",
                                        borderRadius: "6px",
                                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                                        fontSize: "13px",
                                        color: "#555",
                                        zIndex: 1000,
                                    }}
                                >
                                    You need to sign up / login first to
                                    explore more.
                                </div>
                            )}

                            {showMenu && isLoggedIn && (
                                <div
                                    style={{
                                        position: "absolute",
                                        top: "35px",
                                        right: "0",
                                        width: "170px",
                                        backgroundColor: "#ffffff",
                                        border: "1px solid #e5e5e5",
                                        borderRadius: "6px",
                                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                                        overflow: "hidden",
                                        zIndex: 1000,
                                    }}
                                >
                                    <button
                                        onClick={handleProfile}
                                        style={{
                                            width: "100%",
                                            padding: "10px 14px",
                                            border: "none",
                                            backgroundColor: "#ffffff",
                                            textAlign: "left",
                                            cursor: "pointer",
                                        }}
                                    >
                                        My Profile
                                    </button>

                                    <button
                                        onClick={handleDashboard}
                                        style={{
                                            width: "100%",
                                            padding: "10px 14px",
                                            border: "none",
                                            backgroundColor: "#ffffff",
                                            textAlign: "left",
                                            cursor: "pointer",
                                        }}
                                    >
                                        My Dashboard
                                    </button>

                                    <button
                                        onClick={handleLogout}
                                        style={{
                                            width: "100%",
                                            padding: "10px 14px",
                                            border: "none",
                                            backgroundColor: "#ffffff",
                                            textAlign: "left",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}

                        </li>

                    </ul>

                </div>

            </div>
        </nav>
    );
}

export default NavBar;