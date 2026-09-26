import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import {
    BrowserRouter,
    Route,
    Routes,
    useLocation,
} from "react-router-dom";

import "./index.css";
import Home from "./components/Home";
import Profile from "./components/Profile";
import { GeneralContextProvider } from "./components/GeneralContext";

axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            window.location.href =
                `${process.env.REACT_APP_FRONTEND_URL}/signup`;

            return new Promise(() => {});
        }

        return Promise.reject(error);
    }
);

function ProtectedDashboard() {

    const [isCheckingAuth, setIsCheckingAuth] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const location = useLocation();

    useEffect(() => {
        checkLoginStatus();
    }, []);

    const checkLoginStatus = async () => {
        try {
            const response = await fetch(
                `${process.env.REACT_APP_BACKEND_URL}/auth-status`,
                {
                    credentials: "include",
                }
            );

            if (response.ok) {
                setIsLoggedIn(true);
            } else {
                window.location.href =
                    `${process.env.REACT_APP_FRONTEND_URL}/signup`;
            }
        } catch (error) {
            console.log(error);
            window.location.href =
                `${process.env.REACT_APP_FRONTEND_URL}/signup`;
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

    if (location.pathname === "/profile") {
        return <Profile />;
    }

    return <Home />;
}

const root = ReactDOM.createRoot(
    document.getElementById("root")
);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <GeneralContextProvider>
                <Routes>
                    <Route
                        path="/*"
                        element={<ProtectedDashboard />}
                    />
                </Routes>
            </GeneralContextProvider>
        </BrowserRouter>
    </React.StrictMode>
);