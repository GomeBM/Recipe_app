import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import { logout, getUser, isAuthenticated } from "../../UtilityFunctions";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isConnected, setIsConnected] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const checkUser = () => {
      const isUserAuthenticated = isAuthenticated();
      setIsConnected(isUserAuthenticated);
      if (isUserAuthenticated) {
        const user = getUser();
        setUserId(user?.id);
      } else {
        setUserId(null);
      }
    };

    checkUser();
    window.addEventListener("tokenChanged", checkUser);
    window.addEventListener("storage", checkUser);

    return () => {
      window.removeEventListener("tokenChanged", checkUser);
      window.removeEventListener("storage", checkUser);
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
    setUserId(null);
    window.dispatchEvent(new Event("tokenChanged"));
    navigate("/");
  };

  const handleUserIconClick = () => {
    if (userId) {
      navigate(`/user/${userId}`);
    }
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
            <li className="user-icon" onClick={handleUserIconClick}>
              <FaCircleUser />
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
