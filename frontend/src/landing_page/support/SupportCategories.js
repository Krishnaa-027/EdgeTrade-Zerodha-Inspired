import React, { useState } from "react";
import "./SupportCategories.css";

function SupportCategories() {
    const [activeCategories, setActiveCategories] = useState([]);

    const categories = [
        {
            name: "Account Opening",
            image: "/media/images/supportAccountOpen.png",
            links: [
                "Resident individual",
                "Minor",
                "Non Resident Indian (NRI)",
                "Company, Partnership, HUF and LLP",
                "Glossary",
            ],
        },
        {
            name: "Your Zerodha Account",
            image: "/media/images/supportPerson.png",
            links: [
                "Your Profile",
                "Account modification",
                "Client Master Report (CMR) and Depository Participant (DP)",
                "Nomination",
                "Transfer and conversion of securities",
            ],
        },
        {
            name: "Kite",
            image: "/media/images/supportKite.png",
            links: [
                "IPO",
                "Trading FAQs",
                "Margin Trading Facility (MTF) and Margins",
                "Charts and orders",
                "Alerts and Nudges",
                "General",
            ],
        },
        {
            name: "Funds",
            image: "/media/images/supportRupees.png",
            links: [
                "Add money",
                "Withdraw money",
                "Add bank accounts",
                "eMandates",
            ],
        },
        {
            name: "Console",
            image: "/media/images/supportConsole.png",
            links: [
                "Portfolio",
                "Corporate actions",
                "Funds statement",
                "Reports",
                "Profile",
                "Segments",
            ],
        },
        {
            name: "Coin",
            image: "/media/images/supportCoin.png",
            links: [
                "Mutual funds",
                "National Pension Scheme (NPS)",
                "Fixed Deposit (FD)",
                "Features on Coin",
                "Payments and Orders",
                "General",
            ],
        },
    ];

    const quickLinks = [
        "Track account opening",
        "Track segment activation",
        "Intraday margins",
        "Kite user manual",
        "Learn how to create a ticket",
    ];

    const handleCategoryClick = (categoryName) => {
        if (activeCategories.includes(categoryName)) {
            setActiveCategories(
                activeCategories.filter(
                    (category) => category !== categoryName
                )
            );
        } else {
            setActiveCategories([...activeCategories, categoryName]);
        }
    };

    return (
        <div className="support-categories">
            <div className="row">
                <div className="col-8">
                    {categories.map((category) => (
                        <div
                            className={
                                activeCategories.includes(category.name)
                                    ? "support-category active"
                                    : "support-category"
                            }
                            key={category.name}
                        >
                            <div
                                className="support-category-header"
                                onClick={() =>
                                    handleCategoryClick(category.name)
                                }
                            >
                                <div className="support-category-title">
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className="support-category-logo"
                                    />
                                    <span>{category.name}</span>
                                </div>

                                <i
                                    className={
                                        activeCategories.includes(category.name)
                                            ? "fa fa-angle-up"
                                            : "fa fa-angle-down"
                                    }
                                ></i>
                            </div>

                            {activeCategories.includes(category.name) && (
                                <ul className="support-category-list">
                                    {category.links.map((link) => (
                                        <li key={link}>
                                            <a href="#">{link}</a>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>

                <div className="col-4">
                    <div className="quick-links">
                        <div className="quick-links-heading">
                            Quick links
                        </div>

                        <ol className="quick-links-list">
                            {quickLinks.map((link) => (
                                <li key={link}>
                                    <a href="#">{link}</a>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SupportCategories;

