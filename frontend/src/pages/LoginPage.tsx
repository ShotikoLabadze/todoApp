import React, { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import todoImg from "../img/todo.png";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/userPage");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-box">
          <h2>Welcome Back</h2>

          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && <p className="error">{error}</p>}

            <button type="submit" className="btn-login">
              Login
            </button>

            <button
              type="button"
              className="btn-register"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </form>
        </div>
      </div>

      <div className="login-right">
        <img src={todoImg} alt="Login visual" />
      </div>
    </div>
  );
};

export default LoginPage;
