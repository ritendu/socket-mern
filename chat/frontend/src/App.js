import Home from './components/Home'
import ChatPage from './components/ChatPage';
import './App.css';
// import { Button, ButtonGroup } from '@chakra-ui/react'
import {Route,Routes} from 'react-router-dom'
function App() {
  return (
  <>
  <Routes>
    <Route path="/" element={<div><Home/></div>}/>
    <Route path='/chats'element={<div><ChatPage/></div>}/>
    </Routes>
  </>
    
  );
}

export default App;
