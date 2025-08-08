import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UserLogin from "./component/UserLogin.jsx";
import Inventory from './component/Inventory.jsx';
function App() {
  return (
        <Router>
            <Routes>
                <Route path="/" element={<UserLogin />} />
                <Route path="/Inventory" element={<Inventory/>}/> 
            </Routes>
        </Router>
    
  )
}
export default App
