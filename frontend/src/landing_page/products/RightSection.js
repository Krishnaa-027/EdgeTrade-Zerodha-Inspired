import React from "react";
import "./RightSection.css";

function RightSection({
    imageURL,
    productName,
    productDescription,
    links = [],
    sectionClass = "",
}) {
    return (
        <div className={`container mt-5 mb-5 ${sectionClass}`}>
            <div className="row">
                <div className="col-6 pt-5 mt-5 right-product-content">
                    <h1 className="fs-3 fw-normal mb-4 mt-2">{productName}</h1>

                    <p className="right-product-description">
                        {productDescription}
                    </p>

                    <div className="mb-4">
                        {links.map((link, index) => (
                            <a
                                key={index}
                                href={link.url}
                                className={`right-product-link ${link.className}`}
                            >
                                {link.name} →
                            </a>
                        ))}
                    </div>
                </div>

                <div className="col-6 right-product-image">
                    <img src={imageURL} alt={productName} />
                </div>
            </div>
        </div>
    );
}

export default RightSection;