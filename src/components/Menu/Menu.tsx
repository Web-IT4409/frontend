import React, { useState } from "react";
import "./Menu.scss";

interface MenuProps {
  avt?: string;
}

const Menu: React.FC<MenuProps> = ({
  avt = "https://i.pinimg.com/736x/8f/1c/a2/8f1ca2029e2efceebd22fa05cca423d7.jpg",
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <div className="menu-cont">
      <div className="left-cont">
        <ul className="menu-list">
          <div className="circle-container logo">
            <img
              id="avt"
              src="https://z-m-static.xx.fbcdn.net/rsrc.php/v4/yD/r/5D8s-GsHJlJ.png"
              alt="logo"
            />
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
            <a href="#">
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
          <div className="circle-container">
            <li className="sli">
              <a href="#">
                <i className="fa-solid fa-circle-user"></i>
              </a>
            </li>
          </div>
          <div className="circle-container">
            <img id="avt" src={avt} alt="user-avatar" />
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Menu;