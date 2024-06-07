import { BrowserRouter , Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard.jsx";
import { useState } from "react";
import Home from "./components/Home.jsx"
import Login from "./components/Login.jsx"
import Signup from "./components/Signup.jsx";

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
  return (
     <BrowserRouter>
     <Routes>
     <Route path='/' element={<Login />}></Route>
     <Route path='/signup' element={<Signup/>}></Route>
     <Route path='/dashboard' element={<Dashboard mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />}>
     <Route path='' element={<Home />}></Route>
        
      </Route>
     
     </Routes>
     </BrowserRouter>
     
     
    
  );
}

export default App;
