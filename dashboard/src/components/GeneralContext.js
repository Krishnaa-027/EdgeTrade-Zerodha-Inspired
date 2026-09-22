import React, { useState } from "react";

import BuyActionWindow from "./BuyActionWindow";

const GeneralContext = React.createContext({
    openBuyWindow: (uid) => {},
    closeBuyWindow: () => {},
    refreshHoldings: () => {},
    holdingsRefresh: 0,
});

export const GeneralContextProvider = (props) => {
    const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
    const [selectedStockUID, setSelectedStockUID] = useState("");
    const [holdingsRefresh, setHoldingsRefresh] = useState(0);

    const handleOpenBuyWindow = (uid) => {
        setIsBuyWindowOpen(true);
        setSelectedStockUID(uid);
    };

    const handleCloseBuyWindow = () => {
        setIsBuyWindowOpen(false);
        setSelectedStockUID("");
    };

    const handleRefreshHoldings = () => {
        setHoldingsRefresh((prev) => prev + 1);
    };

    return (
        <GeneralContext.Provider
            value={{
                openBuyWindow: handleOpenBuyWindow,
                closeBuyWindow: handleCloseBuyWindow,
                refreshHoldings: handleRefreshHoldings,
                holdingsRefresh: holdingsRefresh,
            }}
        >
            {props.children}

            {isBuyWindowOpen && (
                <>
                    <div className="buy-window-overlay"></div>

                    <BuyActionWindow uid={selectedStockUID} />
                </>
            )}
        </GeneralContext.Provider>
    );
};

export default GeneralContext;

