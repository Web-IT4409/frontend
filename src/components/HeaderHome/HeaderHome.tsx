import React from "react";
import "./HeaderHome.css";

const HeaderHome: React.FC = () => {
  return (
    <div className="header-container">
        <div className="header-part">
            <div className="header-part-upper">
                <div className="circle-container">
                    <img id="avt" src="" alt="user-avatar"/>
                </div>
                <div className="header-input">
                    <input id="header-input" type="text" placeholder="Bạn đang suy nghĩ gì..."/>
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
