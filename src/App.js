import { useEffect, useState } from "react";
import AddNote from "./components/AddNote";
import NavBar from "./components/NavBar";

import Note from "./components/Note";
function App() {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = async () => {
        setLoading(true);
        setError();
        try {
            const response = await fetch(
                "https://firenote-9bc94-default-rtdb.firebaseio.com/notes.json"
            );

            if (!response.ok) {
                throw new Error("Cannot connect to the firebase");
            }
            const notes = await response.json();

            const modifiedNote = [];

            for (const key in notes) {
                modifiedNote.push(notes[key]);
            }

            setNotes(modifiedNote);
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
        console.log(loading, error);
    };
    return (
        <>
            <NavBar getNotes={getNotes} />
            <AddNote getNotes={getNotes} />
            {loading && !error && <h1 className="message">Getting Notes...</h1>}
            {error && !loading && <p className="message error">{error}</p>}
            {!loading &&
                !error &&
                notes.map((note, index) => <Note key={index} note={note} />)}
        </>
    );
}

export default App;
