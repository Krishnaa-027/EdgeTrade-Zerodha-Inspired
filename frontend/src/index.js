import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./landing_page/home/Homepage";
import SignupPage from "./landing_page/signup/SignupPage";
import AboutPage from "./landing_page/about/AboutPage";
import ProductPage from "./landing_page/products/ProductPage";
import PricingPage from "./landing_page/pricing/PricingPage";
import SupportPage from "./landing_page/support/SupportPage";
import NotFound from "./landing_page/NotFound.js";
import NavBar from "./landing_page/Navbar";
import Footer from "./landing_page/Footer";

function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(

    <BrowserRouter>
        <ScrollToTop />
        <NavBar/>
        <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/signup" element={<SignupPage/>} />
            <Route path="/about" element={<AboutPage/>} />
            <Route path="/products" element={<ProductPage/>} />
            <Route path="/pricing" element={<PricingPage/>} />
            <Route path="/support" element={<SupportPage/>} />
            <Route path="*" element={<NotFound/>} />
        </Routes>
        <Footer/>
    </BrowserRouter>
);

