
import './App.css';
import Admin from './admin';
import Movies from './movies';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Redirect, Navigate } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Movies/>} />
        <Route path="/movies" element={<Movies/>} />
        <Route path="/admin" element={<Admin/>} />
        
      </Routes>

    </div>
  );
}

export default App;
