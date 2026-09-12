import React from "react";
import "./LeftSection.css";

function LeftSection({
    imageURL,
    productName,
    productDescription,
    links = [],
    googlePlay,
    appStore,
}) {
    return (
        <div className="container">
            <div className="row">
                <div className="col-6 p-5">
                    <img src={imageURL} alt={productName} />
                </div>

                <div className="col-6 p-5 mt-5 product-content">
                    <h1 className="fs-3 fw-normal mb-4 mt-2">{productName}</h1>

                    <p className="product-description">{productDescription}</p>

                    <div className="mb-4">
                        {links.map((link, index) => (
                            <a
                                key={index}
                                href={link.url}
                                className={`product-link ${link.className}`}
                            >
                                {link.name} →
                            </a>
                        ))}
                    </div>

                    <div className="mt-3">
                        <a href={googlePlay}>
                            <img
                                src="media/images/googlePlayBadge.svg"
                                alt="google-play"
                            />
                        </a>

                        <a href={appStore}>
                            <img
                                src="media/images/appstoreBadge.svg"
                                alt="app-store"
                                className="app-store"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LeftSection;
