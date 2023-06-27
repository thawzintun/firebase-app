import React from "react";

const NavBar = ({ getNotes }) => {
    return (
        <section className="nav">
            <h1 className="logo">FireNote</h1>
            <button className="submit-btn" onClick={getNotes}>
                Refresh Note
            </button>
        </section>
    );
};

export default NavBar;
