import React, { useEffect, useState } from "react";
import Hero from "./Hero";
import Awards from "./Awards";
import Stats from "./Stats";
import Pricing from "./Pricing";
import Education from "./Education";
import OpenAccount from "../OpenAccount";

function HomePage() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/auth-status`, {
            credentials: "include",
        })
            .then((response) => setIsLoggedIn(response.ok))
            .catch(() => setIsLoggedIn(false));
    }, []);

    return (
        <>
            <Hero />
            <Awards />
            <Stats />
            <Pricing />
            <Education />
            {!isLoggedIn && <OpenAccount />}
            {isLoggedIn && <div style={{ height: "80px" }}></div>}
        </>
    );
}

export default HomePage;