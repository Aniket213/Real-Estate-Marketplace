import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Profile from './pages/Profile';
import Signup from './pages/Signup'
import Login from './pages/Login'
import About from './pages/About'
import Header from './components/Header';
import Privateroute from './components/Privateroute';

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/about' element={<About/>}/>
        <Route element={<Privateroute/>}>
          <Route path='/profile' element={<Profile/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
