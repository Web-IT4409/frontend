import React from 'react';
import './Home.scss';
import NavBar from '@/components/NavBar/NavBar'
import NewsFeed from '@/components/NewsFeed/NewsFeed'

const Home: React.FC = () => {
    return (
        <div className="home">
            <h1>Welcome to the Home Page</h1>
            <NavBar />
            {/* <NewsFeed />
            <Shortcuts />
            <Contacts /> */}
            <NewsFeed>
            
            </NewsFeed>

        </div>
    );
};

export default Home; 