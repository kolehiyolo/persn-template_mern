// import React, {useState, useEffect} from "react";
import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/navbar.component.js";
import Projects from "./components/pages/page-projects.component.js";
import Project from "./components/pages/page-project.component.js";
import ProjectEdit from "./components/pages/page-project-edit.component.js";
import ProjectNew from "./components/pages/page-project-new.component.js";
import Register from "./components/pages/page-register.component.js";
import Login from "./components/pages/page-login.component.js";
// import ListTasks from "./components/list-tasks.component.js";
// import ListUsers from "./components/list-users.component.js";

// * Stylesheets
import './App.scss';

function App() {
  // TODO Set currentUser detector
  // const [currentUser, setCurrentUser] = useState(null);
  const [currentUser, setCurrentUser] = useState('65773b179407d34564bd6ed9');

  // setCurrentUser('65773b179407d34564bd6ed9');

  return (
    <Router>
      <Navbar />
      <br />
      <div className="main-content">
      <Routes>
        <Route path="/register" element={<Register setCurrentUser={setCurrentUser} />} />
        <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
        <Route path="/" element={currentUser ? <Projects currentUser={currentUser}/> : <Navigate to="/login" />} />
        <Route path="/projects" element={currentUser ? <Projects currentUser={currentUser}/> : <Navigate to="/login" />} />
        <Route path="/project/:id" element={currentUser ? <Project currentUser={currentUser}/> : <Navigate to="/login" />} />
        <Route path="/project/edit/:id" element={currentUser ? <ProjectEdit currentUser={currentUser}/> : <Navigate to="/login" />} />
        <Route path="/projects/new" element={currentUser ? <ProjectNew currentUser={currentUser}/> : <Navigate to="/login" />} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;