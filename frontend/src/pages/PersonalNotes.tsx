import { useEffect, useState } from "react";
import API from "../api/api";
import "./PersonalNotes.css";

interface NoteProps {
  id: number;
  title: string;
  content: string;
  status: string;
}

const PersonalNotes = () => {
  const [notes, setNotes] = useState<NoteProps[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("todo");

  const token = localStorage.getItem("token");

  const fetchNotes = async () => {
    if (!token) return;
    try {
      const res = await API.get("/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(res.data);
    } catch (err) {
      console.error("Failed to fetch notes", err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const createNote = async () => {
    if (!token) return;
    try {
      const res = await API.post(
        "/tasks",
        { title, description: content, status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotes([...notes, res.data]);
      setTitle("");
      setContent("");
      setStatus("todo");
    } catch (err) {
      console.error("Failed to create note", err);
    }
  };

  const deleteNote = async (id: number) => {
    if (!token) return;
    try {
      await API.delete(`/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(notes.filter((note) => note.id !== id));
    } catch (err) {
      console.error("Failed to delete note", err);
    }
  };

  return (
    <div className="notes-container">
      <div className="notes-card">
        <h2>Personal Notes</h2>

        <h3>Add New Note</h3>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <button onClick={createNote} className="btn-add">
          Add Note
        </button>
      </div>

      <div className="notes-card">
        <h3>Your Notes</h3>
        {notes.length === 0 && <p>No notes found</p>}

        {notes.map((note) => (
          <div key={note.id} className="note-item">
            <h4>{note.title}</h4>
            <p>{note.content}</p>
            <p>Status: {note.status}</p>
            <button onClick={() => deleteNote(note.id)} className="btn-delete">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalNotes;
