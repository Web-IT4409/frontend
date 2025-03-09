import React from 'react';
import './NavBar.scss';
import { useNavigate } from 'react-router';

const SearchBox: React.FC = ({
}) => (
    <div className="search-box-wrapper">
        <input
            className="search-box"
        />
    </div>
);

const NavBar: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className = "bar">
            <div className = "left-side">
                <img
                    src="/src/assets/facebook-logo.svg"
                    className = "icon"
                />
                
                <SearchBox />
            </div>

            <div>
            Hi!
            </div>

        </div>
    );
}


export default NavBar; 