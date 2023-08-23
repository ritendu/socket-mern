import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/register';
import Login from './pages/login';
import Error from './pages/Error';
import Dashboard from './pages/dashboard';
import Rooms from "./pages/rooms"
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
 
        <Route path='register' element={<Register />} />
        <Route path='login' element={<Login />} />
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='rooms' element={<Rooms />} />
        <Route path='*' element={<Error />} />
      </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
