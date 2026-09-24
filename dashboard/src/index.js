import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./components/Home";
import { GeneralContextProvider } from "./components/GeneralContext";

function ProtectedDashboard() {

    const [isCheckingAuth, setIsCheckingAuth] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        checkLoginStatus();
    }, []);

    const checkLoginStatus = async () => {
        try {
            const response = await fetch(
                "http://localhost:3002/auth-status",
                {
                    credentials: "include",
                }
            );

            if (response.ok) {
                setIsLoggedIn(true);
            } else {
                window.location.href = "http://localhost:3000/signup";
            }
        } catch (error) {
            console.log(error);
            window.location.href = "http://localhost:3000/signup";
        } finally {
            setIsCheckingAuth(false);
        }
    };

    if (isCheckingAuth) {
        return null;
    }

    if (!isLoggedIn) {
        return null;
    }

    return <Home />;
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <GeneralContextProvider>
                <Routes>
                    <Route path="/*" element={<ProtectedDashboard />} />
                </Routes>
            </GeneralContextProvider>
        </BrowserRouter>
    </React.StrictMode>
);