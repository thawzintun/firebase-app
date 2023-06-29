import { useEffect, useState } from "react";
import AddNote from "./components/AddNote";
import NavBar from "./components/NavBar";

import Note from "./components/Note";
function App() {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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
            const data = await response.json();

            const modifiedNote = [];

            for (const key in data) {
                modifiedNote.push({
                    id: key,
                    note: data[key],
                });
            }

            setNotes(modifiedNote);
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    };

    useEffect(() => {
        getNotes();
    }, []);

    return (
        <>
            <NavBar totalNotes={notes.length} />
            {loading && !error && <h1 className="message">Getting Notes...</h1>}
            {error && !loading && <p className="message error">{error}</p>}
            {!loading && !error && (
                <>
                    <AddNote getNotes={getNotes} />
                    {notes.map((note) => (
                        <Note key={note.id} note={note} getNotes={getNotes} />
                    ))}
                </>
            )}
        </>
    );
}

export default App;
