import React, { useState } from "react";
import "./SignupFAQ.css";

function SignupFAQ() {

    const [openFAQ, setOpenFAQ] = useState(null);

    const handleFAQ = (index) => {
        if (openFAQ === index) {
            setOpenFAQ(null);
        } else {
            setOpenFAQ(index);
        }
    };

    return (
        <section className="signup-faq-section">

            <div className="signup-faq-container">

                <h2>FAQs</h2>

                <div className="signup-faq-list">

                    <div className="signup-faq-item">

                        <button onClick={() => handleFAQ(0)}>

                            <span>
                                What is a demat account?
                            </span>

                            <i
                                className={`faq-arrow fa ${
                                    openFAQ === 0
                                        ? "fa-angle-up"
                                        : "fa-angle-down"
                                }`}
                            ></i>

                        </button>

                        {openFAQ === 0 && (
                            <p>
                                A demat account allows investors to buy,
                                sell, and hold securities digitally.
                            </p>
                        )}

                    </div>

                    <div className="signup-faq-item">

                        <button onClick={() => handleFAQ(1)}>

                            <span>
                                What documents are required to open a demat
                                account?
                            </span>

                            <i
                                className={`faq-arrow fa ${
                                    openFAQ === 1
                                        ? "fa-angle-up"
                                        : "fa-angle-down"
                                }`}
                            ></i>

                        </button>

                        {openFAQ === 1 && (
                            <p>
                                The following documents may be required:
                                PAN number, Aadhaar Card linked with a phone
                                number, cancelled cheque or bank account
                                statement, and income proof for F&O trading.
                            </p>
                        )}

                    </div>

                    <div className="signup-faq-item">

                        <button onClick={() => handleFAQ(2)}>

                            <span>
                                Is account opening free?
                            </span>

                            <i
                                className={`faq-arrow fa ${
                                    openFAQ === 2
                                        ? "fa-angle-up"
                                        : "fa-angle-down"
                                }`}
                            ></i>

                        </button>

                        {openFAQ === 2 && (
                            <p>
                                Yes, account opening is completely free.
                            </p>
                        )}

                    </div>

                    <div className="signup-faq-item">

                        <button onClick={() => handleFAQ(3)}>

                            <span>
                                Can I open a demat and trading account using
                                the mobile app?
                            </span>

                            <i
                                className={`faq-arrow fa ${
                                    openFAQ === 3
                                        ? "fa-angle-up"
                                        : "fa-angle-down"
                                }`}
                            ></i>

                        </button>

                        {openFAQ === 3 && (
                            <p>
                                Yes, you can open a demat and trading account
                                completely online using the mobile app.
                            </p>
                        )}

                    </div>

                </div>

            </div>

        </section>
    );
}

export default SignupFAQ;