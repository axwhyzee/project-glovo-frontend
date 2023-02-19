import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import About from "./pages/about/About";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
