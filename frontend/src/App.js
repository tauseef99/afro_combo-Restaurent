import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate, 
} from "react-router-dom";
import Home from "./Pages/Home";
import Reviews from "./Pages/Reviews";
import Menu from "./Pages/Menu";
import Dailyspecials from "./Pages/Dailyspecials";
import Contact from "./Pages/Contact";
import About from "./Pages/About";
import Cart from "./Pages/Cart";
import Gallery from "./Pages/Gallery";
import Scrolltotop from "./Components/Scrolltotop";
import Loader from "./Components/Loader";
// import BackgroundAudio from "./Components/Backgroundaudio"; 

// importing admin panel 
import AdminLogin from '../src/Pages/Admin/AdminLogin'; 
import AdminDashboard from '../src/Pages/Admin/AdminDashboard'

function App() {
  const [loading, setLoading] = useState(true); 
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("adminToken"));

  useEffect(() => {
    // Show the loader on route change
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [location]);

  // Listen for storage changes (for logout or login updates)
  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem("adminToken"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);
  return (
    <>
      {loading && <Loader />} {/* Show loader if loading */}
      {/* <BackgroundAudio isPlaying={!loading} /> */}
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Dailyspecials" element={<Dailyspecials />} />
          <Route path="/Gallery" element={<Gallery />} />
          <Route path="/Menu" element={<Menu />} />
          <Route path="/Reviews" element={<Reviews />} />
          <Route path="/Cart" element={<Cart />} />
         {/* Admin Routes */}
         <Route path="/admin/login" element={<AdminLogin setAuth={setIsAuthenticated} />} />
          <Route
            path="/admin/dashboard"
            element={isAuthenticated ? <AdminDashboard /> : <Navigate to="/admin/login" />}
          />
        </Routes>
      </div>
      <Scrolltotop />
    </>
  );
}

export default function MainApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}
