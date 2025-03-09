import React from 'react';
import './NavBar.scss';
import { useNavigate } from 'react-router';
import Button from '../Button/Button';

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
            <div className = "side">
                <img
                    src="/src/assets/facebook-logo.svg"
                    className = "icon"
                />
                
                <SearchBox />

            </div>

            <div className = "side">
                <Button>
                    Change Password
                </Button>
                <Button>
                    Log Out
                </Button>
            </div>

        </div>
    );
}


export default NavBar; 