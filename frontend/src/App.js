import Login from './pages/login'; // ou './pages/Login' si ton fichier s'appelle "Login.jsx"
import { Routes, Route } from 'react-router-dom';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
        </Routes>
    );
}

export default App;
