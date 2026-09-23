import React, { useState } from "react";

import BuyActionWindow from "./BuyActionWindow";
import SellActionWindow from "./SellActionWindow";

const GeneralContext = React.createContext({
    openBuyWindow: (uid) => {},
    closeBuyWindow: () => {},
    openSellWindow: (uid) => {},
    closeSellWindow: () => {},
    refreshHoldings: () => {},
    holdingsRefresh: 0,
    showSuccessMessage: (message) => {},
});

export const GeneralContextProvider = (props) => {
    const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
    const [isSellWindowOpen, setIsSellWindowOpen] = useState(false);

    const [selectedStockUID, setSelectedStockUID] = useState("");
    const [holdingsRefresh, setHoldingsRefresh] = useState(0);

    const [successMessage, setSuccessMessage] = useState("");

    const handleOpenBuyWindow = (uid) => {
        setIsBuyWindowOpen(true);
        setSelectedStockUID(uid);
    };

    const handleCloseBuyWindow = () => {
        setIsBuyWindowOpen(false);
        setSelectedStockUID("");
    };

    const handleOpenSellWindow = (uid) => {
        setIsSellWindowOpen(true);
        setSelectedStockUID(uid);
    };

    const handleCloseSellWindow = () => {
        setIsSellWindowOpen(false);
        setSelectedStockUID("");
    };

    const handleRefreshHoldings = () => {
        setHoldingsRefresh((prev) => prev + 1);
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

                showSuccessMessage: handleShowSuccessMessage,
            }}
        >
            {props.children}

            {isBuyWindowOpen && (
                <>
                    <div className="buy-window-overlay"></div>

                    <BuyActionWindow uid={selectedStockUID} />
                </>
            )}

            {isSellWindowOpen && (
                <>
                    <div className="buy-window-overlay"></div>

                    <SellActionWindow uid={selectedStockUID} />
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
