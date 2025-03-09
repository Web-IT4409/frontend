import React from 'react';
import {useState} from 'react';
import './NewsFeed.scss';
import { useNavigate } from 'react-router';

interface Post {
    id: number;
    user: string;
    avatar: string;
    content: string;
    image?: string;
    timestamp: string;
    likes: number;
    comments: number;
}

const initialPosts: Post[] = [
    {
      id: 1,
      user: "John Doe",
      avatar: "",
      content: "Loving this new React project!",
      image: "",
      timestamp: "2 hours ago",
      likes: 10,
      comments: 5,
    },
  ];

const NewsFeed = () => {
    const [posts, setPosts] = useState<Post[]>(initialPosts);
  
    return (
      <div className="news-feed">
        {posts.map((post) => (
          <div key={post.id} className="post">
            <div className="post-header">
              <img src={post.avatar} alt={post.user} className="avatar" />
              <div>
                <strong>{post.user}</strong>
                <p className="timestamp">{post.timestamp}</p>
              </div>
            </div>
            <p>{post.content}</p>
            {post.image && <img src={post.image} alt="post" />}
            <div className="post-footer">
              <button>👍 {post.likes}</button>
              <button>💬 {post.comments}</button>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default NewsFeed;