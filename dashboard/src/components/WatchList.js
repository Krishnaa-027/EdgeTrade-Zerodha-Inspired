import React, { useContext, useEffect, useRef, useState } from "react";
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

import { DoughnutChart } from "./DoughnoutChart";

const STOCKS_PER_PAGE = 9;

const WatchList = () => {
    const [holdings, setHoldings] = useState([]);
    const [positions, setPositions] = useState([]);
    const [showMessage, setShowMessage] = useState(false);
    const [showMoreOptions, setShowMoreOptions] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const chartRef = useRef(null);

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

    const handleShowMoreOptions = () => {
        setShowMoreOptions(true);
    };

    const handleCloseMoreOptions = () => {
        setShowMoreOptions(false);
    };

    const totalPages = Math.ceil(
        watchlist.length / STOCKS_PER_PAGE
    );

    const startIndex =
        (currentPage - 1) * STOCKS_PER_PAGE;

    const currentStocks = watchlist.slice(
        startIndex,
        startIndex + STOCKS_PER_PAGE
    );

    const data = {
        labels: watchlist.map(
            (stock) => stock.name
        ),
        datasets: [
            {
                label: "Price",
                data: watchlist.map(
                    (stock) => stock.price
                ),
                backgroundColor: [
                    "rgba(255, 99, 132, 0.5)",
                    "rgba(54, 162, 235, 0.5)",
                    "rgba(255, 206, 86, 0.5)",
                    "rgba(75, 192, 192, 0.5)",
                    "rgba(153, 102, 255, 0.5)",
                    "rgba(255, 159, 64, 0.5)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
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

            <div className="watchlist-stock-list">

                <ul className="list">
                    {currentStocks.map((stock) => {
                        const hasHolding = holdings.some(
                            (holding) =>
                                holding.name === stock.name
                        );

                        const hasPosition = positions.some(
                            (position) =>
                                position.name === stock.name
                        );

                        const hasSellData =
                            hasHolding || hasPosition;

                        return (
                            <WatchListItem
                                stock={stock}
                                key={stock.name}
                                hasSellData={hasSellData}
                                onSellBlocked={handleShowMessage}
                                onAnalytics={chartRef}
                                onMore={handleShowMoreOptions}
                            />
                        );
                    })}
                </ul>

                {currentPage === totalPages && (
                    <div className="watchlist-more-stocks">
                        <h4>More stocks coming soon</h4>

                        <p>
                            We're working on adding more stocks to
                            your watchlist.
                        </p>
                    </div>
                )}

                {totalPages > 1 && (
                    <div className="watchlist-pagination">
                        <button
                            className={
                                currentPage === 1
                                    ? "pagination-arrow disabled"
                                    : "pagination-arrow"
                            }
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                        >
                            &lt;
                        </button>

                        <span className="pagination-page">
                            {currentPage}
                        </span>

                        <button
                            className={
                                currentPage === totalPages
                                    ? "pagination-arrow disabled"
                                    : "pagination-arrow"
                            }
                            onClick={handleNextPage}
                            disabled={
                                currentPage === totalPages
                            }
                        >
                            &gt;
                        </button>
                    </div>
                )}

            </div>

            <div
                className="watchlist-chart"
                ref={chartRef}
            >
                <DoughnutChart data={data} />
            </div>

            {showMessage && (
                <div className="watchlist-message-overlay">
                    <div className="watchlist-message">
                        <p>
                            You need to buy this stock first
                        </p>

                        <button
                            onClick={handleCloseMessage}
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}

            {showMoreOptions && (
                <div className="more-options-overlay">
                    <div className="more-options">

                        <div className="more-options-header">
                            <h3>More Options</h3>

                            <button
                                className="more-options-close"
                                onClick={handleCloseMoreOptions}
                            >
                                ×
                            </button>
                        </div>

                        <div className="more-options-list">

                            <div className="more-option">
                                <div>
                                    <h4>Set Price Alert</h4>

                                    <p>
                                        Get an alert when the stock
                                        reaches your selected price.
                                    </p>
                                </div>

                                <span>Coming Soon</span>
                            </div>

                            <div className="more-option">
                                <div>
                                    <h4>Stock Details</h4>

                                    <p>
                                        View additional information
                                        about the selected stock.
                                    </p>
                                </div>

                                <span>Coming Soon</span>
                            </div>

                            <div className="more-option">
                                <div>
                                    <h4>Market Information</h4>

                                    <p>
                                        Explore more market related
                                        information.
                                    </p>
                                </div>

                                <span>Coming Soon</span>
                            </div>

                        </div>

                        <div className="more-options-footer">
                            <button
                                onClick={handleCloseMoreOptions}
                            >
                                Close
                            </button>
                        </div>

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
    onAnalytics,
    onMore,
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
                    stock={stock}
                    hasSellData={hasSellData}
                    onSellBlocked={onSellBlocked}
                    onAnalytics={onAnalytics}
                    onMore={onMore}
                />
            )}

        </li>
    );
};

const WatchListActions = ({
    stock,
    hasSellData,
    onSellBlocked,
    onAnalytics,
    onMore,
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
        const isLoggedIn =
            await checkLoginStatus();

        if (!isLoggedIn) {
            return;
        }

        openBuyWindow(
            stock.name,
            stock.price,
            stock.percent
        );
    };

    const handleSellClick = async () => {
        const isLoggedIn =
            await checkLoginStatus();

        if (!isLoggedIn) {
            return;
        }

        if (!hasSellData) {
            onSellBlocked();
            return;
        }

        openSellWindow(
            stock.name,
            stock.price,
            stock.percent
        );
    };

    const handleAnalyticsClick = async () => {
        const isLoggedIn =
            await checkLoginStatus();

        if (!isLoggedIn) {
            return;
        }

        onAnalytics.current?.scrollIntoView({
            behavior: "smooth",
        });
    };

    const handleMoreClick = async () => {
        const isLoggedIn =
            await checkLoginStatus();

        if (!isLoggedIn) {
            return;
        }

        onMore();
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