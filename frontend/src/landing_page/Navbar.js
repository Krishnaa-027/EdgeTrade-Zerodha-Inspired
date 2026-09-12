import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

function NavBar() {
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

                        <li className="nav-item me-4 mt-2">
                            <i
                                className="fa fa-bars fs-4"
                                style={{
                                    height: "0.1px",
                                    opacity: 0.7,
                                }}
                                aria-hidden="true"
                            ></i>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;