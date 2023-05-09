import React, { useState } from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Test from "./pages/test/Test";
import DataLoader from './components/DataLoader';

function App() {
  const [graphData, setGraphData] = useState({ nodes: [], edges: [] });
  const [postData, setPostData] = useState({});
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home graphData={graphData} postData={postData} />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/test" element={<Test />}></Route>
        </Routes>
      </BrowserRouter>
      <DataLoader setGraphData={setGraphData} setPostData={setPostData} />
    </div>
  );
}

export default App;
