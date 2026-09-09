import React from "react";

function Education(){
    return(
        <div className="container pt-4">
            <div className="row">
                <div className="col-6 mt-5 mb-5">
                    <img
                        src="media/images/education.svg"
                        alt="varsity img"
                        className=""
                        style={{ width: "75%" }}
                    />
                </div>
                <div className="col-6 mt-5 mb-5">
                    <h1 className="mb-4 fs-2">Free and open market education</h1>
                    <p className="mb-3">
                        Varsity, the largest online stock market education book in the world
                        covering everything from the basics to advanced trading.
                    </p>
                    <a 
                        href=" " className="" style={{textDecoration:"none"}}> Varsity  <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
                    </a>
                    <p className="mt-5 mb-3">
                        TradingQ&A, the most active trading and investment community in
                        India for all your market related queries.
                    </p>
                    <a 
                        href=" " className="" style={{textDecoration:"none"}}> TradingQ&A  <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Education;