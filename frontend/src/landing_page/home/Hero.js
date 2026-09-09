import React from "react";
import "./Hero.css";

function Hero() {
    return (
        <div className="container p-5 mb-5">
            <div className="row text-center">
                <img src="media/images/homeHero.png" alt="Hero Img" className="hero-image" />

                <h1 className="hero-heading">Invest in everything</h1>
                <p className="hero-text mt-2">
                    Online platform to invest in stocks, IPOs, derivatives, mutual funds, ETFs, bonds, and more.
                </p>

                <button className="p-2 mt-2 btn btn-primary fs-5 mb-5  hero-button"> Sign up for free </button>
            </div>
        </div>
    );
}

export default Hero;