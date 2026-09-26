import React, { useState } from "react";

import BuyActionWindow from "./BuyActionWindow";
import SellActionWindow from "./SellActionWindow";

const GeneralContext = React.createContext({
    openBuyWindow: (uid, price, day) => {},
    closeBuyWindow: () => {},
    openSellWindow: (uid, price, day) => {},
    closeSellWindow: () => {},
    refreshHoldings: () => {},
    holdingsRefresh: 0,
    refreshFunds: () => {},
    fundsRefresh: 0,
    showSuccessMessage: (message) => {},
});

export const GeneralContextProvider = (props) => {
    const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
    const [isSellWindowOpen, setIsSellWindowOpen] = useState(false);

    const [selectedStockUID, setSelectedStockUID] = useState("");
    const [selectedStockPrice, setSelectedStockPrice] = useState(0);
    const [selectedStockDay, setSelectedStockDay] = useState("0.00%");

    const [holdingsRefresh, setHoldingsRefresh] = useState(0);
    const [fundsRefresh, setFundsRefresh] = useState(0);

    const [successMessage, setSuccessMessage] = useState("");

    const handleOpenBuyWindow = (uid, price, day) => {
        setIsBuyWindowOpen(true);
        setSelectedStockUID(uid);
        setSelectedStockPrice(Number(price));
        setSelectedStockDay(day || "0.00%");
    };

    const handleCloseBuyWindow = () => {
        setIsBuyWindowOpen(false);
        setSelectedStockUID("");
        setSelectedStockPrice(0);
        setSelectedStockDay("0.00%");
    };

    const handleOpenSellWindow = (uid, price, day) => {
        setIsSellWindowOpen(true);
        setSelectedStockUID(uid);
        setSelectedStockPrice(Number(price));
        setSelectedStockDay(day || "0.00%");
    };

    const handleCloseSellWindow = () => {
        setIsSellWindowOpen(false);
        setSelectedStockUID("");
        setSelectedStockPrice(0);
        setSelectedStockDay("0.00%");
    };

    const handleRefreshHoldings = () => {
        setHoldingsRefresh((prev) => prev + 1);
    };

    const handleRefreshFunds = () => {
        setFundsRefresh((prev) => prev + 1);
    };

    const handleShowSuccessMessage = (message) => {
        setSuccessMessage(message);

        setTimeout(() => {
            setSuccessMessage("");
        }, 4000);
    };

    return (
        <GeneralContext.Provider
            value={{
                openBuyWindow: handleOpenBuyWindow,
                closeBuyWindow: handleCloseBuyWindow,

                openSellWindow: handleOpenSellWindow,
                closeSellWindow: handleCloseSellWindow,

                refreshHoldings: handleRefreshHoldings,
                holdingsRefresh: holdingsRefresh,

                refreshFunds: handleRefreshFunds,
                fundsRefresh: fundsRefresh,

                showSuccessMessage: handleShowSuccessMessage,
            }}
        >
            {props.children}

            {isBuyWindowOpen && (
                <>
                    <div className="buy-window-overlay"></div>

                    <BuyActionWindow
                        uid={selectedStockUID}
                        marketPrice={selectedStockPrice}
                        dayChange={selectedStockDay}
                    />
                </>
            )}

            {isSellWindowOpen && (
                <>
                    <div className="buy-window-overlay"></div>

                    <SellActionWindow
                        uid={selectedStockUID}
                        marketPrice={selectedStockPrice}
                        dayChange={selectedStockDay}
                    />
                </>
            )}

            {successMessage && (
                <div className="success-popup">
                    <i className="fa fa-check-circle"></i>
                    <span>{successMessage}</span>
                </div>
            )}
        </GeneralContext.Provider>
    );
};

export default GeneralContext;