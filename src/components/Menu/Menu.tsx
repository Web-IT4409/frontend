import React, { useState } from "react";
import { useNavigate } from 'react-router';
import { logout } from '@/services/authService';
import "./Menu.scss";

interface MenuProps {
  avt?: string;
}

const Menu: React.FC<MenuProps> = ({
  avt = "https://i.pinimg.com/736x/8f/1c/a2/8f1ca2029e2efceebd22fa05cca423d7.jpg",
}) => {
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem('token'); // Remove token from localStorage
      console.log('Logged out successfully');
      navigate('/'); // Redirect to login page
    } catch (error) {
      console.error('Logout Failed:', error);
    }
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <div className="menu-cont">
      <div className="left-cont">
        <ul className="menu-list">
          <div className="circle-container logo">
            <a href="/home"> <img
              id="avt"
              src="https://z-m-static.xx.fbcdn.net/rsrc.php/v4/yD/r/5D8s-GsHJlJ.png"
              alt="logo"
            />
            </a>
          </div>
          <div className="search-cont">
            <input type="text" className="search-input" placeholder="Search..." />
            <i className="fa-solid fa-search"></i>
          </div>
        </ul>
      </div>

      <div className="mid-cont">
        <ul className="menu-list">
          <li>
            <a href="/home">
              <i className="fa-solid fa-house"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa-solid fa-user-group"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa-solid fa-film"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa-solid fa-flag"></i>
            </a>
          </li>
        </ul>
      </div>

      <div className="right-cont">
        <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          <i className="fa-solid fa-bars"></i>
        </button>
        <ul className={`menu-list ${isMobileMenuOpen ? "mobile-menu-open" : ""}`}>
          <div className="circle-container">
            <li className="sli">
              <a href="#">
                <i className="fa-brands fa-facebook-messenger"></i>
              </a>
            </li>
          </div>
          <div className="circle-container">
            <li className="sli">
              <a href="#">
                <i className="fa-solid fa-bell"></i>
              </a>
            </li>
          </div>
          <div className="circle-container" onClick={handleLogout}>
            <li className="sli">
              <a href="#">
                <i className="fa-solid fa-right-from-bracket" style={{color:'red'}}></i>
              </a>
            </li>
          </div>
          <div className="circle-container">
          <a href="/profile">
            <img id="avt" src={avt} alt="user-avatar" />
          </a>

          </div>
        </ul>
      </div>
    </div>
  );
};

export default Menu;