import React from "react";
import { Link } from "react-router-dom";

function Team() {
    return (
        <div className="container">
            <div className="row p-5 pb-4 mt-3">
                <h1
                    className="text-center"
                    style={{ color: "#4e4646", fontSize: "26px" }}
                >
                    People
                </h1>
            </div>

            <div className="row p-5 ">
                <div className="col-5 ps-5 text-center">
                    <img
                        src="media/images/my_image.jpeg"
                        style={{
                            borderRadius: "100%",
                            width: "305px",
                            height: "325px",
                            marginBottom: "25px",
                            marginRight: "5px",
                        }}
                    />

                    <h4 className="fw-normal">Krishna Sharma</h4>
                    <p className="fw-light">Founder & Developer</p>
                </div>

                <div className="col-7 p-4 pe-5 mt-2 hero-content">
                    <p>
                        This project is a learning-focused clone inspired by the
                        design and user experience of modern fintech platforms.
                        I built this project to understand how a
                        production-style financial platform can be structured
                        using React and related web technologies.
                    </p>

                    <p>
                        The People section has been personalized with my own
                        profile to represent the developer behind this project
                        rather than reproducing the original team's profiles.
                    </p>

                    <p>
                        Connect on{" "}
                        <Link to="/" className="para-link">
                            Homepage
                        </Link>{" "}
                        /{" "}
                        <a href="#" className="para-link">
                            GitHub
                        </a>{" "}
                        /{" "}
                        <a href="#" className="para-link">
                            LinkedIn
                        </a>{" "}
                        .
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Team;
