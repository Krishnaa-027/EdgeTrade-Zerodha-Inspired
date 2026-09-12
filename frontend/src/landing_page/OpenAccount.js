import React from "react";

function OpenAccount() {
  return (
    <div className="container p-5 mb-2" >
      <div className="row text-center">
        <h1 className="mt-5 mb-3">Open a Zerodha account</h1>
        <p className="mb-4">
          Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and
          F&O trades.
        </p>
        <button
          className="p-2 btn btn-primary fs-5 mb-5"
          style={{ width: "20%", margin: "0 auto", backgroundColor:"#2e75d3", fontWeight: "500" }}
        >
          Sign up for free
        </button>
      </div>
    </div>
  );
}

export default OpenAccount;