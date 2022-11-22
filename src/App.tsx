import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './features/dashboard/pages/Dashboard';
import About from './features/about/pages/About';
import Header from './features/components/Header';

function App() {
  return (
    <Router>
      <div className='mainContainer'>
        <Header />
        <Routes>
          <Route path='/' element={<Dashboard />}/>
          <Route path='/about' element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
