import React from "react";
import NavBar from "../Navbar";
import Hero from "./Hero";
import CreateTicket from "./CreateTicket";
import Footer from "../Footer";

function CreateTicket(){
    return(
        <>
            <NavBar/>
            <Hero/>
            <CreateTicket/>
            <Footer/>
        </>
    )
}

export default CreateTicket;