import Login from './pages/login'; // ou './pages/Login' si ton fichier s'appelle "Login.jsx"
import VoiturePage from './pages/VoiturePage';
import { Routes, Route } from 'react-router-dom';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/voitures" element={<VoiturePage />} />
        </Routes>
    );
}

export default App;
