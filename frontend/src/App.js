import React, { useState } from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import DataLoader from './components/DataLoader';
import Navbar from './components/navbar/Navbar';

function App() {
  const [graphData, setGraphData] = useState({ nodes: [], edges: [] });
  const [postData, setPostData] = useState({});
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home graphData={graphData}/>}></Route>
          <Route path="/about" element={<About />}></Route>
        </Routes>
      </BrowserRouter>
      <DataLoader setGraphData={setGraphData} setPostData={setPostData} />
    </div>
  );
}

export default App;
