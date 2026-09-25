import React, { useContext, useEffect, useState } from "react";
import { Tooltip, Grow } from "@mui/material";
import {
    BarChartOutlined,
    KeyboardArrowDown,
    KeyboardArrowUp,
    MoreHoriz,
} from "@mui/icons-material";
import axios from "axios";

import { watchlist } from "../data/data";
import GeneralContext from "./GeneralContext";

const WatchList = () => {
    const [holdings, setHoldings] = useState([]);
    const [positions, setPositions] = useState([]);
    const [showMessage, setShowMessage] = useState(false);

    const { holdingsRefresh } = useContext(GeneralContext);

    const loadUserData = async () => {
        try {
            const holdingsResponse = await axios.get(
                "http://localhost:3002/allHoldings",
                {
                    withCredentials: true,
                }
            );

            const positionsResponse = await axios.get(
                "http://localhost:3002/allPositions",
                {
                    withCredentials: true,
                }
            );

            setHoldings(holdingsResponse.data);
            setPositions(positionsResponse.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        loadUserData();
    }, [holdingsRefresh]);

    const handleShowMessage = () => {
        setShowMessage(true);
    };

    const handleCloseMessage = () => {
        setShowMessage(false);
    };

    return (
        <div className="watchlist-container">
            <div className="search-container">
                <input
                    type="text"
                    name="search"
                    id="search"
                    placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx"
                    className="search"
                />

                <span className="counts">
                    {watchlist.length} / 50
                </span>
            </div>

            <ul className="list">
                {watchlist.map((stock, index) => {
                    const hasHolding = holdings.some(
                        (holding) => holding.name === stock.name
                    );

                    const hasPosition = positions.some(
                        (position) => position.name === stock.name
                    );

                    const hasSellData =
                        hasHolding || hasPosition;

                    return (
                        <WatchListItem
                            stock={stock}
                            key={index}
                            hasSellData={hasSellData}
                            onSellBlocked={handleShowMessage}
                        />
                    );
                })}
            </ul>

            {showMessage && (
                <div className="watchlist-message-overlay">
                    <div className="watchlist-message">
                        <p>
                            You need to buy this stock first
                        </p>

                        <button onClick={handleCloseMessage}>
                            OK
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WatchList;

const WatchListItem = ({
    stock,
    hasSellData,
    onSellBlocked,
}) => {
    const [showWatchListActions, setShowWatchListActions] =
        useState(false);

    const handleMouseEnter = () => {
        setShowWatchListActions(true);
    };

    const handleMouseLeave = () => {
        setShowWatchListActions(false);
    };

    return (
        <li
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="item">
                <p className={stock.isDown ? "down" : "up"}>
                    {stock.name}
                </p>

                <div className="itemInfo">
                    <span className="percent">
                        {stock.percent}
                    </span>

                    {stock.isDown ? (
                        <KeyboardArrowDown className="down" />
                    ) : (
                        <KeyboardArrowUp className="up" />
                    )}

                    <span className="price">
                        {stock.price}
                    </span>
                </div>
            </div>

            {showWatchListActions && (
                <WatchListActions
                    uid={stock.name}
                    hasSellData={hasSellData}
                    onSellBlocked={onSellBlocked}
                />
            )}
        </li>
    );
};

const WatchListActions = ({
    uid,
    hasSellData,
    onSellBlocked,
}) => {
    const {
        openBuyWindow,
        openSellWindow,
    } = useContext(GeneralContext);

    const checkLoginStatus = async () => {
        try {
            const response = await fetch(
                "http://localhost:3002/auth-status",
                {
                    credentials: "include",
                }
            );

            if (!response.ok) {
                window.location.href =
                    "http://localhost:3000/signup";

                return false;
            }

            return true;
        } catch (error) {
            console.log(error);

            window.location.href =
                "http://localhost:3000/signup";

            return false;
        }
    };

    const handleBuyClick = async () => {
        const isLoggedIn = await checkLoginStatus();

        if (!isLoggedIn) {
            return;
        }

        openBuyWindow(uid);
    };

    const handleSellClick = async () => {
        const isLoggedIn = await checkLoginStatus();

        if (!isLoggedIn) {
            return;
        }

        if (!hasSellData) {
            onSellBlocked();
            return;
        }

        openSellWindow(uid);
    };

    const handleAnalyticsClick = async () => {
        const isLoggedIn = await checkLoginStatus();

        if (!isLoggedIn) {
            return;
        }
    };

    const handleMoreClick = async () => {
        const isLoggedIn = await checkLoginStatus();

        if (!isLoggedIn) {
            return;
        }
    };

    return (
        <span className="actions">
            <span>
                <Tooltip
                    title="Buy (B)"
                    placement="top"
                    arrow
                    TransitionComponent={Grow}
                >
                    <button
                        className="buy"
                        onClick={handleBuyClick}
                    >
                        Buy
                    </button>
                </Tooltip>

                <Tooltip
                    title={
                        hasSellData
                            ? "Sell (S)"
                            : "Buy this stock first"
                    }
                    placement="top"
                    arrow
                    TransitionComponent={Grow}
                >
                    <button
                        className={
                            hasSellData
                                ? "sell"
                                : "sell sell-disabled"
                        }
                        onClick={handleSellClick}
                    >
                        Sell
                    </button>
                </Tooltip>

                <Tooltip
                    title="Analytics (A)"
                    placement="top"
                    arrow
                    TransitionComponent={Grow}
                >
                    <button
                        className="action"
                        onClick={handleAnalyticsClick}
                    >
                        <BarChartOutlined className="icon" />
                    </button>
                </Tooltip>

                <Tooltip
                    title="More"
                    placement="top"
                    arrow
                    TransitionComponent={Grow}
                >
                    <button
                        className="action"
                        onClick={handleMoreClick}
                    >
                        <MoreHoriz className="icon" />
                    </button>
                </Tooltip>
            </span>
        </span>
    );
};