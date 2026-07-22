import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Statistiche from "./pages/Statistiche.jsx";

function App(){
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/statistiche" element={<Statistiche />} />
        </Routes>

    );
}

export default App;