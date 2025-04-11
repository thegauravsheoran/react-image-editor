import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Search from './pages/Search';
import AddCaption from './pages/AddCaption';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/edit" element={<AddCaption />} />
      </Routes>
    </Router>
  );
};

export default App;
