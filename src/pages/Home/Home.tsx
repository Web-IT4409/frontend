import React, { useEffect, useState } from 'react';
import Menu from '@/components/Menu/Menu';
import HeaderHome from '@/components/HeaderHome/HeaderHome';
import Status, { StatusProps } from '@/components/Status/Status'; // Import StatusProps
import { fetchPosts } from '@/services/postService';
import { fetchUserDetails } from '@/services/userService';
import { mapBackendPostToStatusProps } from '@/utils/mappers';
import { BackendPost } from '@/types/Post';
import './Home.scss';

interface UserData {
  username: string;
  avatar?: string;
}

const Home: React.FC = () => {
  const [posts, setPosts] = useState<StatusProps[]>([]); // Use imported StatusProps
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);

  const loadPosts = async () => {
    setLoading(true);
    try {
      const data: BackendPost[] = await fetchPosts(); // Fetch posts from the backend
      const mappedPosts: StatusProps[] = data.map(mapBackendPostToStatusProps); // Map backend response to Status props
      setPosts(mappedPosts);
    } catch (err) {
      console.error('Failed to fetch posts:', err);
      setError('Failed to load posts.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
    loadUserData();
  }, []);
  
  const loadUserData = async () => {
    try {
      const data = await fetchUserDetails();
      setUserData(data);
    } catch (err) {
      console.error('Failed to fetch user details:', err);
    }
  };

  if (loading) {
    return <p>Loading posts...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="home-container">
      <Menu avt={userData?.avatar} />
      <div className="home">
        <HeaderHome 
          refreshPosts={loadPosts} 
          avt={userData?.avatar}
          username={userData?.username}
        />
        <div className="home-posts">
          {posts.map((post) => (
            <Status key={post.id} {...post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
