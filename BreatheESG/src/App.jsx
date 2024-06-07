import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import DataEntry from './components/DataEntry';
import Tracker from './components/Tracker';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path='/dataentry' element={<DataEntry />}></Route>
        <Route path='/tracker' element={<Tracker />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
