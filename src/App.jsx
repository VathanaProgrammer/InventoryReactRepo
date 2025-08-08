import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UserLogin from "./component/UserLogin.jsx";
import Inventory from './component/Inventory.jsx';
import TableInventoryAtTheFirstSection from './component/TableInvetoryAtTheFirstSection.jsx';
function App() {
  return (
        <Router>
            <Routes>
                {/* <Route path="/" element={<UserLogin />} /> */}
                <Route path="/Inventory" element={<Inventory/>}/> 
                <Route path="/" element={<TableInventoryAtTheFirstSection />} />
            </Routes>
        </Router>
    
  )
}
export default App
