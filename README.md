# Full Stack Todo App (React + Node.js)

A **full stack task manager** built with React (TypeScript) and Node.js (Express + MySQL).  
Users can **register**, **log in**, and manage personal notes in a clean gradient UI.

---

## Screenshots

### Login Page

![Login Page](screenshots/register.png)

### Notes Page

![Notes Page](screenshots/personal.png)

---

## Features

- User registration (username, email, password)
- JWT login authentication
- Add / delete personal notes
- Protected routes for logged-in users
- Gradient pink-teal background
- Simple creamy cards design
- Clean and minimal UI

---

## Getting Started

### Prerequisites

- Node.js + npm
- MySQL database (local or hosted)

---

### Backend Setup

# 1. Install dependencies

npm install

# 2. Create a .env file in backend/

PORT=5000
JWT_SECRET=your_secret
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=todoapp

# 3. Create the database and tables in MySQL

CREATE DATABASE todoapp;

USE todoapp;

CREATE TABLE users (
id INT AUTO_INCREMENT PRIMARY KEY,
username VARCHAR(255),
email VARCHAR(255) UNIQUE,
password VARCHAR(255)
);

CREATE TABLE tasks (
id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(255),
description TEXT,
status VARCHAR(50),
user_id INT,
FOREIGN KEY (user_id) REFERENCES users(id)
);

### Frontend Setup

# 1. Navigate to the frontend folder

cd frontend

# 2. Install dependencies

npm install

# 3. Start the development server

npm start
