import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
    return (
        <nav
            className="navbar navbar-expand-lg navbar-light sticky-top"
            style={{
                backgroundColor: "#ffffff",
                borderBottom: "2px solid #f3f2f1",
            }}
        >
            <div className="container p-2">
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
                        <li className="nav-item me-4 ">
                            <Link
                                className="nav-link active"
                                aria-current="page"
                                to="/signup"
                                style={{
                                    color: "#3b3a3a",
                                    opacity: 0.6,
                                    fontWeight: 500,
                                    fontSize: "15px",
                                    letterSpacing: "0.2px",
                                }}
                            >
                                Signup
                            </Link>
                        </li>

                        <li className="nav-item me-4">
                            <Link
                                className="nav-link active"
                                to="/about"
                                style={{
                                    color: "#3b3a3a",
                                    opacity: 0.6,
                                    fontWeight: 500,
                                    fontSize: "15px",
                                    letterSpacing: "0.2px",
                                }}
                            >
                                About
                            </Link>
                        </li>

                        <li className="nav-item me-4">
                            <Link
                                className="nav-link active"
                                to="/products"
                                style={{
                                    color: "#3b3a3a",
                                    opacity: 0.6,
                                    fontWeight: 500,
                                    fontSize: "15px",
                                    letterSpacing: "0.2px",
                                }}
                            >
                                Products
                            </Link>
                        </li>

                        <li className="nav-item me-4">
                            <Link
                                className="nav-link active"
                                to="/pricing"
                                style={{
                                    color: "#3b3a3a",
                                    opacity: 0.6,
                                    fontWeight: 500,
                                    fontSize: "15px",
                                    letterSpacing: "0.2px",
                                }}
                            >
                                Pricing
                            </Link>
                        </li>

                        <li className="nav-item me-4">
                            <Link
                                className="nav-link active"
                                to="/support"
                                style={{
                                    color: "#3b3a3a",
                                    opacity: 0.6,
                                    fontWeight: 500,
                                    fontSize: "15px",
                                    letterSpacing: "0.2px",
                                }}
                            >
                                Support
                            </Link>
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
