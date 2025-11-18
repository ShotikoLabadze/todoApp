import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import "./RegisterPage.css";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async () => {
    try {
      await API.post("auth/register", { username, email, password });
      navigate("/");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Register</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn-register" onClick={registerUser}>
          Register
        </button>

        <button className="btn-back" onClick={() => navigate("/")}>
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
