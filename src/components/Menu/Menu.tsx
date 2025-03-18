import React from "react";
import "./Menu.css";

const Menu: React.FC = () => {
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
        <ul className="menu-list">
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
            <img
              id="avt"
              src=""
              alt="user-avatar"
            />
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Menu;
