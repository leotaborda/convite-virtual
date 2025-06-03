import { BrowserRouter, Routes, Route } from "react-router-dom";
import Convite from "./pages/Convite";
import Presentes from "./pages/Presentes";

function App() {
  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={<Convite />} />
        <Route path="/presentes" element={<Presentes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
