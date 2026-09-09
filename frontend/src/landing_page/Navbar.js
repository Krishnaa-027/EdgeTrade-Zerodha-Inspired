import React from "react";

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
                <a className="navbar-brand ms-1 mb-1" href="#">
                    <img
                        src="media/images/logo.svg"
                        alt="logo"
                        style={{ width: "22%" }}
                    />
                </a>

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
                            <a
                                className="nav-link active"
                                aria-current="page"
                                href="#"
                                style={{
                                    color: "#3b3a3a",
                                    opacity: 0.6,
                                    fontWeight: 500,
                                    fontSize: "15px",
                                    letterSpacing: "0.2px",
                                }}
                            >
                                Signup
                            </a>
                        </li>

                        <li className="nav-item me-4">
                            <a
                                className="nav-link active"
                                href="#"
                                style={{
                                    color: "#3b3a3a",
                                    opacity: 0.6,
                                    fontWeight: 500,
                                    fontSize: "15px",
                                    letterSpacing: "0.2px",
                                }}
                            >
                                About
                            </a>
                        </li>

                        <li className="nav-item me-4">
                            <a
                                className="nav-link active"
                                href="#"
                                style={{
                                    color: "#3b3a3a",
                                    opacity: 0.6,
                                    fontWeight: 500,
                                    fontSize: "15px",
                                    letterSpacing: "0.2px",
                                }}
                            >
                                Products
                            </a>
                        </li>

                        <li className="nav-item me-4">
                            <a
                                className="nav-link active"
                                href="#"
                                style={{
                                    color: "#3b3a3a",
                                    opacity: 0.6,
                                    fontWeight: 500,
                                    fontSize: "15px",
                                    letterSpacing: "0.2px",
                                }}
                            >
                                Pricing
                            </a>
                        </li>

                        <li className="nav-item me-4">
                            <a
                                className="nav-link active"
                                href="#"
                                style={{
                                    color: "#3b3a3a",
                                    opacity: 0.6,
                                    fontWeight: 500,
                                    fontSize: "15px",
                                    letterSpacing: "0.2px",
                                }}
                            >
                                Support
                            </a>
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
