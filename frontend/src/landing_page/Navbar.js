import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./Navbar.css";

function NavBar() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [showLoginMessage, setShowLoginMessage] = useState(false);

    const location = useLocation();

    useEffect(() => {
        checkLoginStatus();
    }, []);

    useEffect(() => {
        checkLoginStatus();
        setShowMenu(false);
        setShowLoginMessage(false);
    }, [location.pathname]);

    useEffect(() => {
        if (!showLoginMessage) {
            return;
        }

        const timer = setTimeout(() => {
            setShowLoginMessage(false);
        }, 5000);

        return () => {
            clearTimeout(timer);
        };
    }, [showLoginMessage]);

    useEffect(() => {
        const handleOutsideClick = () => {
            setShowMenu(false);
            setShowLoginMessage(false);
        };

        document.addEventListener("click", handleOutsideClick);

        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, []);

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
                return true;
            } else {
                setIsLoggedIn(false);
                return false;
            }
        } catch (error) {
            console.log(error);
            setIsLoggedIn(false);
            return false;
        }
    };

    const handleMenuClick = async (event) => {
        event.stopPropagation();

        const loggedIn = await checkLoginStatus();

        setShowLoginMessage(false);

        if (loggedIn) {
            setShowMenu(!showMenu);
        } else {
            setShowMenu(false);
            setShowLoginMessage(true);
        }
    };

    const handleLogout = async () => {
        try {
            await fetch(`${process.env.REACT_APP_BACKEND_URL}/logout`, {
                method: "POST",
                credentials: "include",
            });

            setIsLoggedIn(false);
            setShowMenu(false);

            window.location.href = window.location.origin;
        } catch (error) {
            console.log(error);
        }
    };

    const handleDashboard = () => {
        setShowMenu(false);
        window.location.href = process.env.REACT_APP_DASHBOARD_URL;
    };

    const handleProfile = () => {
        setShowMenu(false);
        window.location.href = `${process.env.REACT_APP_DASHBOARD_URL}/profile`;
    };

    const handleMenuBoxClick = (event) => {
        event.stopPropagation();
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
                                    className="login-required-message"
                                    onClick={handleMenuBoxClick}
                                >
                                    <div className="login-required-icon">
                                        <i className="fa fa-lock"></i>
                                    </div>

                                    <div>
                                        <div className="login-required-title">
                                            Login required
                                        </div>

                                        <div className="login-required-text">
                                            Please sign up or login first to
                                            explore more.
                                        </div>
                                    </div>
                                </div>
                            )}

                            {showMenu && isLoggedIn && (
                                <div
                                    className="navbar-profile-menu"
                                    onClick={handleMenuBoxClick}
                                >

                                    <button onClick={handleProfile}>
                                        My Profile
                                    </button>

                                    <button onClick={handleDashboard}>
                                        My Dashboard
                                    </button>

                                    <button onClick={handleLogout}>
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