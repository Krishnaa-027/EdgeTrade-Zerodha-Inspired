import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Menu.css";

const Menu = () => {
    const [selectedMenu, setSelectedMenu] = useState(0);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [profileName, setProfileName] = useState("");

    const profileRef = useRef(null);
    const location = useLocation();

    const handleMenuClick = (index) => {
        setSelectedMenu(index);
    };

    const handleProfileClick = () => {
        setIsProfileDropdownOpen(!isProfileDropdownOpen);
    };

    const handleLogout = async () => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_BACKEND_URL}/logout`,
                {
                    method: "POST",
                    credentials: "include",
                }
            );

            if (response.ok) {
                window.location.href =
                    process.env.REACT_APP_FRONTEND_URL;
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const response = await fetch(
                    `${process.env.REACT_APP_BACKEND_URL}/profile`,
                    {
                        credentials: "include",
                    }
                );

                if (!response.ok) {
                    window.location.href =
                        `${process.env.REACT_APP_FRONTEND_URL}/signup`;

                    return;
                }

                const data = await response.json();

                setProfileName(data.name);
            } catch (error) {
                console.log(error);

                window.location.href =
                    `${process.env.REACT_APP_FRONTEND_URL}/signup`;
            }
        };

        loadProfile();
    }, [location.pathname]);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (
                profileRef.current &&
                !profileRef.current.contains(event.target)
            ) {
                setIsProfileDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleOutsideClick
            );
        };
    }, []);

    const getInitials = (name) => {
        if (!name) {
            return "";
        }

        const nameParts = name.trim().split(" ");

        if (nameParts.length === 1) {
            return nameParts[0].charAt(0).toUpperCase();
        }

        return (
            nameParts[0].charAt(0) +
            nameParts[nameParts.length - 1].charAt(0)
        ).toUpperCase();
    };

    const menuClass = "menu";
    const activeMenuClass = "menu selected";

    return (
        <div className="menu-container">

            <div className="menu-left">

                <img
                    src="logo.png"
                    alt="menu-logo"
                    className="dashboard-logo"
                />

                <div className="menus">
                    <ul>

                        <li>
                            <Link
                                style={{ textDecoration: "none" }}
                                to="/"
                                onClick={() => handleMenuClick(0)}
                            >
                                <p
                                    className={
                                        selectedMenu === 0
                                            ? activeMenuClass
                                            : menuClass
                                    }
                                >
                                    Dashboard
                                </p>
                            </Link>
                        </li>

                        <li>
                            <Link
                                style={{ textDecoration: "none" }}
                                to="/orders"
                                onClick={() => handleMenuClick(1)}
                            >
                                <p
                                    className={
                                        selectedMenu === 1
                                            ? activeMenuClass
                                            : menuClass
                                    }
                                >
                                    Orders
                                </p>
                            </Link>
                        </li>

                        <li>
                            <Link
                                style={{ textDecoration: "none" }}
                                to="/holdings"
                                onClick={() => handleMenuClick(2)}
                            >
                                <p
                                    className={
                                        selectedMenu === 2
                                            ? activeMenuClass
                                            : menuClass
                                    }
                                >
                                    Holdings
                                </p>
                            </Link>
                        </li>

                        <li>
                            <Link
                                style={{ textDecoration: "none" }}
                                to="/positions"
                                onClick={() => handleMenuClick(3)}
                            >
                                <p
                                    className={
                                        selectedMenu === 3
                                            ? activeMenuClass
                                            : menuClass
                                    }
                                >
                                    Positions
                                </p>
                            </Link>
                        </li>

                        <li>
                            <Link
                                style={{ textDecoration: "none" }}
                                to="/funds"
                                onClick={() => handleMenuClick(4)}
                            >
                                <p
                                    className={
                                        selectedMenu === 4
                                            ? activeMenuClass
                                            : menuClass
                                    }
                                >
                                    Funds
                                </p>
                            </Link>
                        </li>

                        <li>
                            <Link
                                style={{ textDecoration: "none" }}
                                to="/apps"
                                onClick={() => handleMenuClick(5)}
                            >
                                <p
                                    className={
                                        selectedMenu === 5
                                            ? activeMenuClass
                                            : menuClass
                                    }
                                >
                                    Apps
                                </p>
                            </Link>
                        </li>

                    </ul>
                </div>

            </div>

            <div className="profile-section">

                <Link
                    to={process.env.REACT_APP_FRONTEND_URL}
                    className="back-home"
                >
                    <span className="back-arrow">←</span>
                    <span>Back to Home</span>
                </Link>

                <div className="profile-divider"></div>

                <div
                    className="profile-wrapper"
                    ref={profileRef}
                >

                    <div
                        className="profile"
                        onClick={handleProfileClick}
                    >
                        <div className="avatar">
                            {getInitials(profileName)}
                        </div>

                        <span className="profile-arrow">
                            {isProfileDropdownOpen
                                ? "▴"
                                : "▾"}
                        </span>
                    </div>

                    {isProfileDropdownOpen && (
                        <div className="profile-dropdown">

                            <Link
                                to="/profile"
                                className="profile-dropdown-item"
                                onClick={() =>
                                    setIsProfileDropdownOpen(false)
                                }
                                style={{
                                    textDecoration: "none",
                                }}
                            >
                                My Profile
                            </Link>

                            <div
                                className="profile-dropdown-item"
                                onClick={handleLogout}
                            >
                                Logout
                            </div>

                        </div>
                    )}

                </div>

            </div>

        </div>
    );
};

export default Menu;