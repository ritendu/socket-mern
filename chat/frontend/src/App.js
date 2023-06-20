import logo from './logo.svg';
import './App.css';
import {Route,Routes} from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Protected from './components/Protected.route';
import Navbar from "./components/Navbar"
import Footer from './components/Footer';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
function App() {

return (
  <>
     <Navbar/>
  <Routes>
  <Route
path="/"
element={
<Protected>
<Dashboard />
</Protected>
}
/>
    <Route path="/register" element={<div><Register/></div>}/>
    <Route path='/login'element={<div><Login/></div>}/>
    </Routes>
    <Footer/>
    <ToastContainer />
  </>
)


}

export default App;
