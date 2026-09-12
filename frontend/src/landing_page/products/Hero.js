import React from "react";
import { Link } from "react-router-dom";

function Hero() {
    return (
        <div className="container text-center p-5 mt-5 mb-4 border-bottom" style={{color:"#3b3636"}}>
            <h1 className="fw-medium fs-3 mb-3">Zerodha Products</h1>
            <h2 className="fw-normal fs-5 mb-4">Sleek, modern, and intuitive trading platforms</h2>
            <p className="fs-6" style={{ fontWeight: 500, marginBottom:"60px" }}>
                Check out our <Link to="#" className="hero-link" style={{textDecoration:"None", color:"#4762fc", fontSize:"16.5px"}}>investment offerings → </Link>
            </p>
        </div>
    );
}

export default Hero;
