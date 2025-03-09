import React from 'react';
import './Home.scss';
import NavBar from '@/components/NavBar/NavBar'

const Home: React.FC = () => {
    return (
        <div className="home">
            <h1>Welcome to the Home Page</h1>
            <NavBar />
            {/* <NewsFeed />
            <Shortcuts />
            <Contacts /> */}
            
        </div>
    );
};

export default Home; 