

import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/home";
import Detail from "./components/detail/detail";
import CreateProduct from './components/createProduct/CreateProduct';
import Login from "./components/login/Login"


export default function App() {
  return (
  <div className="container">
    <Router>
      <Routes>
      <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/createproduct" element={<CreateProduct/>}/>
        <Route exact path="/detail/:id" element={<Detail/>} />
      </Routes>
    </Router>
  </div>
  )
};
