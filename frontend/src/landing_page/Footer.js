import React from "react";
import "./Footer.css";

function Footer() {
    return (
        <footer className="bg-light border-top"> 
            <div className="container">
                <div className="row mt-5 ">
                    <div className="col footer-social-column">
                        <div className="mb-4">
                            <img
                                src="media/images/logo.svg"
                                alt="logo" 
                                style={{ width: "72%" }}
                                className="pb-3 pt-1"
                            />
                            <p
                                style={{
                                    fontSize: "13px",
                                    lineHeight: "1.8",
                                    width: "110%",
                                    marginBottom: "18px"
                                }}
                            >
                                &copy; 2010 - 2026, Zerodha Broking Ltd. All rights
                                reserved.
                            </p>
                            <a href=" " target="_blank" rel="noreferrer">
                                <img
                                    src="https://cdn.simpleicons.org/x/494646"
                                    alt="X"
                                    width="18"
                                    height="18"
                                    className="footer-X-icon"
                                />
                            </a>
                            <a href=" "><i className="fa fa-facebook-official" aria-hidden="true"></i></a>
                            <a href=" "><i className="fa fa-instagram" aria-hidden="true"></i></a>
                            <a href=" "><i className="fa fa-linkedin" aria-hidden="true"></i></a>
                        </div>
                        <div className="border-top mb-4">
                            <a><i className="fa fa-youtube-play mt-4" aria-hidden="true"></i></a>
                            <a><i className="fa fa-whatsapp" aria-hidden="true"></i></a>
                            <a><i className="fa fa-telegram" aria-hidden="true"></i></a>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <img
                                src="media/images/googlePlayBadge.svg"
                                alt="googlePlay"
                                style={{
                                    height: "33px",
                                    width: "auto",
                                    backgroundColor: "white"
                                }}
                            />

                            <img
                                src="media/images/appstoreBadge.svg"
                                alt="appStore"
                                style={{
                                    height: "34px",
                                    width: "auto",
                                    backgroundColor: "white"
                                }}
                            />
                        </div>
                    </div>

                    <div className="col ms-5">
                        <p className="footer-column-heading" >Account</p>
                        <div className="footer-column-links">
                            <a href="">Open demat account</a>
                            <br />
                            <a href="">Minor demat account</a>
                            <br />
                            <a href="">NRI demat account</a>
                            <br />
                            <a href="">HUF demat account</a>
                            <br />
                            <a href="">Commodity</a>
                            <br />
                            <a href="">Dematerialisation</a>
                            <br />
                            <a href="">Fund transfer</a>
                            <br />
                            <a href="">MTF</a>
                            <br />
                        </div>
                    </div>
                    <div className="col">
                        <p className="footer-column-heading" >Support</p>
                        <div className="footer-column-links">
                            <a href=" ">Contact us</a>
                            <br />
                            <a href=" ">Support portal</a>
                            <br />
                            <a href=" ">How to file a complaint?</a>
                            <br />
                            <a href=" ">Status of your complaints</a>
                            <br />
                            <a href=" ">Bulletin</a>
                            <br />
                            <a href=" ">Circular</a>
                            <br />
                            <a href=" ">Z-Connect blog</a>
                            <br />
                            <a href=" ">Downloads</a>
                            <br />
                        </div>
                    </div>
                    <div className="col">
                        <p className="footer-column-heading" >Company</p>
                        <div className="footer-column-links">
                            <a href=" ">About</a>
                            <br />
                            <a href=" ">Philosophy</a>
                            <br />
                            <a href=" ">Press & media</a>
                            <br />
                            <a href=" ">Careers</a>
                            <br />
                            <a href=" ">Zerodha Cares (CSR)</a>
                            <br />
                            <a href=" ">Zerodha.tech</a>
                            <br />
                            <a href=" ">Open source</a>
                            <br />
                            <a href=" ">Referral program</a>
                            <br />
                        </div>
                    </div>
                    <div className="col">
                        <p className="footer-column-heading" >Quick links</p>
                        <div className="footer-column-links">
                            <a href=" ">Upcoming IPOs</a>
                            <br />
                            <a href=" ">Brokerage charges</a>
                            <br />
                            <a href=" ">Market holidays</a>
                            <br />
                            <a href=" ">Economic calendar</a>
                            <br />
                            <a href=" ">Calculators</a>
                            <br />
                            <a href=" ">Markets</a>
                            <br />
                            <a href=" ">Sectors</a>
                            <br />
                            <a href=" ">Gift Nifty</a>
                            <br />
                        </div>
                    </div>
                </div>
                <div className="mt-5 footer-para" style={{ fontSize: "11.3px"}}>
                    <p>
                        Zerodha Broking Ltd.: Member of NSE, BSE, MCX & MSEI –
                        SEBI Registration no.: INZ000031633 CDSL/NSDL:
                        Depository services through Zerodha Broking Ltd. – SEBI
                        Registration no.: IN-DP-431-2019 Registered Address:
                        Zerodha Broking Ltd., #153/154, 4th Cross, Dollars
                        Colony, Opp. Clarence Public School, J.P Nagar 4th
                        Phase, Bengaluru - 560078, Karnataka, India. For any
                        complaints pertaining to securities broking please write
                        to    <a href="" className="footer-para-link">complaints@zerodha.com</a>,   for DP related to
                        <a href="" className="footer-para-link">dp@zerodha.com.</a>.   Please ensure you carefully read the
                        Risk Disclosure Document as prescribed by SEBI |
                        ICF{" "}
                    </p>

                    <p>
                        Procedure to file a complaint on    <a href="" className="footer-para-link">SEBI SCORES</a>
                        / <a href="" className="footer-para-link">SMARTODR</a>  
                        : Register on SCORES portal & SMARTODR. Mandatory details
                        for filing complaints on SCORES: Name, PAN, Address,
                        Mobile Number, E-mail ID. Benefits: Effective
                        Communication, Speedy redressal of grievances
                    </p>

                    <p>
                        <a href="" className="footer-para-link">Smart Online Dispute Resolution </a> 
                        | <a href="" className="footer-para-link">Grievances Redressal Mechanism </a>
                    </p>

                    <p>
                        Investments in securities market are subject to market
                        risks; read all the related documents carefully before
                        investing.
                    </p>

                    <p>
                        {" "}
                        Attention investors: 1) Stock brokers can accept
                        securities as margins from clients only by way of pledge
                        in the depository system w.e.f September 01, 2020. 2)
                        Update your e-mail and phone number with your stock
                        broker / depository participant and receive OTP directly
                        from depository on your e-mail and/or mobile number to
                        create pledge. 3) Check your securities / MF / bonds in
                        the consolidated account statement issued by NSDL/CDSL
                        every month.
                    </p>

                    <p>
                        India's largest broker based on networth as per NSE. 
                        <a href="" className="footer-para-link"> NSE broker factsheet</a>
                    </p>

                    <p>
                        "Prevent unauthorised transactions in your account.
                        Update your mobile numbers/email IDs with your stock
                        brokers/depository participants. Receive information of
                        your transactions directly from Exchange/Depositories on
                        your mobile/email at the end of the day. Issued in the
                        interest of investors. KYC is one time exercise while
                        dealing in securities markets - once KYC is done through
                        a SEBI registered intermediary (broker, DP, Mutual Fund
                        etc.), you need not undergo the same process again when
                        you approach another intermediary." Dear Investor, if
                        you are subscribing to an IPO, there is no need to issue
                        a cheque. Please write the Bank account number and sign
                        the IPO application form to authorize your bank to make
                        payment in case of allotment. In case of non allotment
                        the funds will remain in your bank account. As a
                        business we don't give stock tips, and have not
                        authorized anyone to trade on behalf of others. If you
                        find anyone claiming to be part of Zerodha and offering
                        such services, please <a href="" className="footer-para-link">create a ticket here</a> .
                    </p>

                    <p>
                        *Customers availing insurance advisory services offered
                        by Ditto (Tacterial Consulting Private Limited | IRDAI
                        Registered Corporate Agent (Composite) License No
                        CA0738) will not have access to the exchange investor
                        grievance redressal forum, SEBI SCORES/ODR, or
                        arbitration mechanism for such products.
                    </p>

                    <p>
                        Fixed deposit products offered on this platform are
                        third-party products (TPP) and are not Exchange traded
                        products. These are offered through Blostem Fintech
                        Private Limited. Zerodha Broking Limited (SEBI
                        Registration No.: INZ000031633) is acting solely as a
                        distributor for these products. Any disputes arising
                        with respect to such distribution activity will not have
                        access to SEBI SCORES/ODR, Exchange Investor Grievance
                        Redressal Forum, or Arbitration mechanism. Fixed
                        deposits are regulated by the Reserve Bank of India
                        (RBI).
                    </p>
                </div>
                <div className="d-flex gap-4 justify-content-center mt-4 mb-3 footer-links">
                        <a href="">NSE</a>
                        <a href="">BSE</a>
                        <a href="">MCX</a>
                        <a href="">MSEI</a>
                        <a href="">Terms & conditions</a>
                        <a href="">Policies & procedures</a>
                        <a href="">Privacy policy</a>
                        <a href="">Disclosure</a>
                        <a href="">For investor's attention</a>
                        <a href="">Investor charter</a>
                        <a href="">Sitemap</a>
                </div>
           </div>
        </footer>
    );
}

export default Footer;
