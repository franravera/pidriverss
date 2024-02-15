import React from 'react';
import NavBar from './components/NavBar/NavBar';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { LandingPage, HomePage, FormPage, DetailPage  } from './views/views/index' 

function NavBarRoute() {
  const location = useLocation();
  return location.pathname === "/home" ? <NavBar /> : null;
}

function App() {
  return (
    <Router>
      <div className='App'>
        <NavBarRoute />
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/detail/:id' element={<DetailPage />} />
          <Route path='/create' element={<FormPage />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;

