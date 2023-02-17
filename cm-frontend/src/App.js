import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashBoard from './Components/DashBoard';
import Login from './Components/Login';
import Signup from './Components/Signup';


function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/dashboard' element={<DashBoard/>}/>
      </Routes>
    </React.Fragment>
  );
}

export default App;
