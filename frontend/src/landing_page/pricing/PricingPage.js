import React from "react";
import NavBar from "../Navbar";
import Hero from "./Hero";
import Brokerage from "./Brokerage";
import Footer from "../Footer";


function PricingPage(){
    return(
        <>
            <NavBar/>
            <Hero/>
            <Brokerage/>
            <Footer/>
        </>
    )
}

export default PricingPage;