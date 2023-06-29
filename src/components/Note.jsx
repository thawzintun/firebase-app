import React from "react";
import Deleteicon from "../svgs/Deleteicon";

const Note = ({ note, getNotes }) => {
    const { id, note: text } = note;
    console.log(id);
    const deleteNote = async () => {
        try {
            const response = await fetch(
                `https://firenote-9bc94-default-rtdb.firebaseio.com/notes/${id}.json`,
                {
                    method: "DELETE",
                }
            );
            if (!response.ok) {
                throw new Error("Failed to delete this note.");
            }
            getNotes();
        } catch (err) {
            alert(err.message);
        }
    };
    return (
        <div className="card card-ctr">
            <h3>- {text}</h3>
            <div onClick={deleteNote}>
                <Deleteicon />
            </div>
        </div>
    );
};

export default Note;
