import React from "react";
import "./HeaderHome.css";

interface HeaderHomeProps {
  avt?: string;
}

const HeaderHome: React.FC<HeaderHomeProps> = ({
  avt = "https://i.pinimg.com/736x/8f/1c/a2/8f1ca2029e2efceebd22fa05cca423d7.jpg",
}) => {
  return (
    <div className="header-container">
      <div className="header-part">
        <div className="header-part-upper">
          <div className="circle-container">
            <img id="avt" src={avt} alt="user-avatar" />
          </div>
          <div className="header-input">
            <input id="header-input" type="text" placeholder="Bạn đang suy nghĩ gì..." />
          </div>
        </div>
        <div className="header-part-lower">
          <div className="header-part-lower-item">
            <i className="far fa-bell"></i>
          </div>
          <div className="header-part-lower-item">
            <i className="far fa-bell"></i>
          </div>
          <div className="header-part-lower-item">
            <i className="far fa-bell"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderHome;
    