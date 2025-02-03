import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Tasks from "./pages/Tasks";
import Register from "./pages/Register"; // Importar la nueva página

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/tasks" element={<Tasks />} />
            </Routes>
        </Router>
    );
}

export default App;
