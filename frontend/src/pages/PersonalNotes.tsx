import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import "./PersonalNotes.css";

interface NoteProps {
  _id: string;
  title: string;
  description: string;
  status: string;
}

const PersonalNotes = () => {
  const [notes, setNotes] = useState<NoteProps[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("todo");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchNotes = useCallback(async () => {
    if (!token) return;
    try {
      const res = await API.get("/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(res.data);
    } catch (err) {
      console.error("Failed to fetch notes", err);
    }
  }, [token]);

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      fetchNotes();
    }
  }, [token, navigate, fetchNotes]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const createNote = async () => {
    if (!token) return;
    try {
      const res = await API.post(
        "/tasks",
        { title, description: content, status },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setNotes([...notes, res.data]);
      setTitle("");
      setContent("");
      setStatus("todo");
    } catch (err) {
      console.error("Failed to create note", err);
    }
  };

  const deleteNote = async (_id: string) => {
    if (!token) return;
    try {
      await API.delete(`/tasks/${_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(notes.filter((note) => note._id !== _id));
    } catch (err) {
      console.error("Failed to delete note", err);
    }
  };

  return (
    <div className="notes-container">
      <button onClick={handleLogout} className="btn-logout-top">
        Logout
      </button>

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
        {notes.length === 0 && (
          <p style={{ textAlign: "center", color: "#6b7280" }}>
            No notes found
          </p>
        )}
        {notes.map((note) => (
          <div key={note._id} className="note-item">
            <h4>{note.title}</h4>
            <p>{note.description}</p>
            <p className="note-status">
              Status: <span>{note.status}</span>
            </p>
            <button onClick={() => deleteNote(note._id)} className="btn-delete">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalNotes;
