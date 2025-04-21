import React from 'react';
import Menu from '@/components/Menu/Menu.tsx';
import HeaderHome from '@/components/HeaderHome/HeaderHome.tsx';
import Status from '@/components/Status/Status.tsx';
import './Home.scss';
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle';

const Home: React.FC = () => {
    return (
        <div className='home-container'>
            <Menu />
            <div className="home">
                <HeaderHome />
                <h1>Welcome to the Home Page</h1>
                <Status
                    comments={[ 
                        { 
                          name: "User 1", 
                          comment: "Hay quá!", 
                        },
                        { 
                          name: "User 2", 
                          comment: "Ảnh đẹp quá!", 
                        }
                      ]}
                      
                />
                <ThemeToggle />
            </div>
        </div>
    );
};

export default Home; 