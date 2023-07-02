import React, { useState } from "react";

const AddNote = ({ getNotes }) => {
    // define note
    const [note, setNote] = useState("");

    //add new note
    const addNote = async (e) => {
        e.preventDefault();
        try {
            await fetch(
                "https://firenote-9bc94-default-rtdb.firebaseio.com/notes.json",
                {
                    method: "POST",
                    body: JSON.stringify(note),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            setNote("");
            getNotes();
        } catch (err) {
            alert("Something went wrong. Please try again.");
        }
    };
    return (
        <section>
            <form className="card" onSubmit={addNote}>
                <input
                    type="text"
                    placeholder="Add Note Here"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    autoFocus
                />
                <button
                    className="submit-btn"
                    hidden={note.trim() !== 0 ? false : true}
                >
                    Add Note
                </button>
            </form>
        </section>
    );
};

export default AddNote;
