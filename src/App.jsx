import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import MovieDetail from './pages/MovieDetail';
import './App.css';

function App() {
  return (
    <div className="app-main-container">
      <NavBar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/movie/:imdbID" element={<MovieDetail />} />
      </Routes>
    </div>
  );
}

export default App;