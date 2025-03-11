import React from 'react';
import Menu from '@/components/Menu/Menu.tsx';
import './Home.scss';

const Home: React.FC = () => {
    return (
        <div className='home-container'>
            <Menu />
            <div className="home">
                <h1>Welcome to the Home Page</h1>
            </div>
        </div>
    );
};

export default Home; 