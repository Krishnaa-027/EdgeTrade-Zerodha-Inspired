import React from "react";
import SignupHero from "./SignupHero";
import SignupSteps from "./SignupSteps";
import SignupBenefits from "./SignupBenefits";
import SignupFAQ from "./SignupFAQ";
import "./SignupPage.css";
import OpenAccount from "../OpenAccount";

function SignupPage() {
    return (
        <>
            <SignupHero />
            <SignupSteps />
            <SignupBenefits />
            <SignupFAQ />
            <OpenAccount/>
        </>
    );
}

export default SignupPage;