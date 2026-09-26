import React from "react";
import "./Hero.css";

function Hero() {
    return (
        <div className="support-hero-bg">
            <div className="support-hero">
                <div className="support-hero-top">
                    <h1>Support Portal</h1>

                    <a href="#" className="my-tickets-btn">
                        My tickets
                    </a>
                </div>

                <div className="support-search">
                    <i className="fa fa-search" aria-hidden="true"></i>

                    <input
                        type="text"
                        placeholder="Eg: How do I open my account, How do i activate F&O..."
                    />
                </div>
            </div>
        </div>
    );
}

export default Hero;
