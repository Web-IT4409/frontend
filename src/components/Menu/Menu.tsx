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
              src="https://scontent.fhan2-4.fna.fbcdn.net/v/t39.30808-6/457155527_1160386718406533_7963986829018704570_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGxb0Lxv5lfKBHyy_xa3m0qEPNuLENc3iEQ824sQ1zeIV1MiGN4dyIkSFj_lsiqwHfGqqwvOPNm1VDIMiZDdoFE&_nc_ohc=E_oaqV8n98YQ7kNvgGAoCiJ&_nc_oc=Adg7VuahbkkUWrMkyFI1hfi-2K1YBzdxulYZnCnX3RHfQbPIrNjYV5iep3j2ggRNCec&_nc_zt=23&_nc_ht=scontent.fhan2-4.fna&_nc_gid=Ar3vxqnUdgrOyA0DPf9miSB&oh=00_AYBVs2lXkEShftfEEKArKDi0EaTq03ei14sVjpbauLcH1A&oe=67C12D74"
              alt="user-avatar"
            />
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Menu;
