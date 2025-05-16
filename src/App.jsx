import { Routes, Route } from "react-router-dom";
import Convite from './pages/Convite';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Convite />} />
    </Routes>
  );
}

export default App;
