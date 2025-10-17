import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css"




function Home(){

    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = () => {
        api
        .get("/api/notes/")
        .then((res) => res.data)
        .then((data) => {
            setNotes(data); 
            console.log(data);
        })
        .catch((err) => alert(err));
    };

    const deleteNote = (id) => {
        api
            .delete(`/api/notes/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) 
                    alert("Note deleted successfully");
                else 
                    alert("Failed to delete note");
                
            })
            .catch((err) => alert(err));
        getNotes();

    };

    const createNote = (e) => {
        e.preventDefault();
        api
            .post("/api/notes/", { title, content })
            .then((res) => {
                if (res.status === 201) 
                    alert("Note created successfully");

                 else 
                    alert("Failed to create note");
                getNotes();
                
            })
            .catch((err) => alert(err));
        
    };

    return (
    <div>
        <div>
            <h2>Notes App</h2>
            <p>"Capture your ideas before they slip away."</p>
            {notes.map((note) => <Note note={note} onDelete={deleteNote} key={note.id}/>)}
            
        </div>
        <h2>Create Note:</h2>
        <p> "Fill in the title and content, then hit Submit."</p>

        <form onSubmit={createNote}>
            <label htmlFor="title">Title:</label>
            <br/>
            <input
                id="title"
                name="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
               />
               
            <label htmlFor="content">Content:</label>
            <br/>
            <textarea 
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
            ></textarea>
            <br/>

            <input type="submit" value="Submit"/>

        </form>

    </div>
    );
}

export default Home 