import React from "react";

import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import PersonalNotes from "./pages/PersonalNotes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/userPage" element={<PersonalNotes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
