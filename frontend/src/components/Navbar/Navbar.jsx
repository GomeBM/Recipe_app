import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import { logout } from "../../UtilityFunctions";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const checkToken = () => {
      const token = window.localStorage.getItem("token");
      setIsConnected(!!token);
    };

    checkToken();
    window.addEventListener("tokenChanged", checkToken);
    window.addEventListener("storage", checkToken);

    return () => {
      window.removeEventListener("tokenChanged", checkToken);
      window.removeEventListener("storage", checkToken);
    };
  }, []);

  const handleLogoClick = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  const handleHomeClick = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  const handleLogout = () => {
    logout();
    setIsConnected(false);
    window.localStorage.removeItem("token");
    window.dispatchEvent(new Event("tokenChanged"));
    navigate("/"); // Add this line to navigate to the home page after logout
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo" onClick={handleLogoClick}>
          RecipeHub
        </div>
        <ul className="navbar-links">
          <li onClick={handleHomeClick}>Home</li>
          {!isConnected && <li onClick={() => navigate("/login")}>Login</li>}
          {!isConnected && (
            <li onClick={() => navigate("/register")}>Register</li>
          )}
          {isConnected && <li onClick={handleLogout}>Logout</li>}
          {isConnected && (
            <li className="user-icon">
              <FaCircleUser />
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
