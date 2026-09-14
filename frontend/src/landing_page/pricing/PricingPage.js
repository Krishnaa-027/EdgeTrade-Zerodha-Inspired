import React from "react";
import Hero from "./Hero";
import OpenAccount from "../OpenAccount"
import Brokerage from "./Brokerage";
import Calculator from "./Calculator";
import Charges from "./Charges";
import ChargesExplanation from "./ChargesExplanation";


function PricingPage(){
    return(
        <>
            <Hero/>
            <Calculator/>
            <Charges/>
            <ChargesExplanation/>
        </>
    )
}

export default PricingPage;