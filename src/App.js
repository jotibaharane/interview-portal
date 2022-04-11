import { Routes, Route } from "react-router-dom";
import React,{useState} from "react";
import Home from "./Component/Home";
import Test from "./Component/Test";
import Finish from "./Component/Finish";
function App() {
  
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/test/:id" element={<Test />} />
      <Route path="/finish/:id" element={<Finish />} />
    </Routes>
  );
}

export default App;
