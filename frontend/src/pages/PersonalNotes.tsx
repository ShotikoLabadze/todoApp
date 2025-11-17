import { useEffect, useState } from "react";
import API from "../api/api";

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
    <div style={{ maxWidth: 800, margin: "50px auto" }}>
      <h2>Personal Notes</h2>

      <div style={{ marginBottom: 20 }}>
        <h3>Add New Note</h3>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: 8, width: "100%", marginBottom: 8 }}
        />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ padding: 8, width: "100%", marginBottom: 8 }}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{ padding: 8, marginBottom: 8 }}
        >
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <button onClick={createNote} style={{ padding: 10, width: "100%" }}>
          Add Note
        </button>
      </div>

      <div>
        <h3>Your Notes</h3>
        {notes.length === 0 && <p>No notes found</p>}

        {notes.map((note) => (
          <div
            key={note.id}
            style={{
              border: "1px solid #ccc",
              padding: 10,
              marginBottom: 8,
              borderRadius: 5,
            }}
          >
            <h4>{note.title}</h4>
            <p>{note.content}</p>
            <p>Status: {note.status}</p>

            <button
              onClick={() => deleteNote(note.id)}
              style={{ padding: 5, background: "red", color: "white" }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalNotes;
