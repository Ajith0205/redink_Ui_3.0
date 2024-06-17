import React from 'react';
import './App.css';
import { HashRouter as Router, Route, Routes, HashRouter } from 'react-router-dom';
import Login from './View/Login';
import Layout from './CommomLayout/Layout';
import Home from './CommomLayout/Home';
import User from './View/User';
import Video from './View/Video';
import CreateUser from './View/CreateUser';


function App() {

  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="" name="Layout" element={<Layout />} >
            <Route path='' element={<Home />} />
            <Route path='home' element={<Home />} />
            <Route path="user" element={<User />}/>
            <Route path='video' element={<Video />}/>
            <Route path='createuser' element={<CreateUser />}/>
            
          </Route>
        </Routes>
      </HashRouter>
    </>
  );

}

export default App;
