import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router';
import { logout } from '@/services/authService';
import catLogo from '@/assets/cat.svg';
import "./Menu.scss";

interface MenuProps {
  avt?: string;
}

const Menu: React.FC<MenuProps> = ({
  avt = "https://i.pinimg.com/736x/8f/1c/a2/8f1ca2029e2efceebd22fa05cca423d7.jpg",
}) => {
  const navigate = useNavigate();
  const location = useLocation(); // Get current location
  const currentPath = location.pathname;
  
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
  });

  useEffect(() => {
    const html = document.documentElement;
    if (theme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

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
            <a href="/home" style={{ display: 'flex', width: '100%', height: '100%' }}> 
              <img
                id="avt"
                src={catLogo}
                alt="logo"
                style={{ objectFit: 'cover', borderRadius: '50%', width: '100%', height: '100%' }}
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
          <li className={currentPath === "/home" ? "active" : ""}>
            <a href="/home">
              <i className="fa-solid fa-house"></i>
            </a>
          </li>
          <li className={currentPath === "/friends" ? "active" : ""}>
            <a href="/friends">
              <i className="fa-solid fa-user-group"></i>
            </a>
          </li>
          <li className={currentPath === "/watch" ? "active" : ""}>
            <a href="#">
              <i className="fa-solid fa-film"></i>
            </a>
          </li>
          <li className={currentPath === "/pages" ? "active" : ""}>
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
          <div className="circle-container" onClick={toggleTheme}>
            <li className="sli">
              <a href="#">
                <i className={theme === 'light' ? 'fa-solid fa-sun' : 'fa-solid fa-moon'}></i>
              </a>
            </li>
            <span className="tooltip">{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
          </div>
          <div className="circle-container">
            <li className="sli">
              <a href="#">
                <i className="fa-solid fa-bell"></i>
              </a>
            </li>
            <span className="tooltip">Notifications</span>
          </div>
          <div className="circle-container" onClick={handleLogout}>
            <li className="sli">
              <a href="#">
                <i className="fa-solid fa-right-from-bracket"></i>
              </a>
            </li>
            <span className="tooltip">Logout</span>
          </div>
          <div className="circle-container">
            <a href="/profile" style={{ display: 'flex', width: '100%', height: '100%' }}>
              <img id="avt" src={avt} alt="user-avatar" style={{ objectFit: 'cover', borderRadius: '50%', width: '100%', height: '100%' }} />
            </a>
            <span className="tooltip">Profile</span>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Menu;
