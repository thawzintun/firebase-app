import React from "react";

const NavBar = ({ totalNotes }) => {
    return (
        <section className="nav">
            <h1 className="logo">FireNote</h1>
            {totalNotes > 0 && (
                <p className="submit-btn">Total Notes - {totalNotes}</p>
            )}
        </section>
    );
};

export default NavBar;
