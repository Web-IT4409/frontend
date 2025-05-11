import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Menu from '@/components/Menu/Menu';
import { BackendPost } from '@/types/Post';
import Comment from '@/components/Status/Comment';
import { fetchCommentsByPostId } from '@/services/postService';
import { createComment } from '@/services/commentService';
import { EMOTION_ICONS, EMOTION_COLORS } from '@/utils/constants';
import './PostDetail.scss';

interface CommentType {
  id: number;
  userId: number;
  postId: number;
  content: string;
  mediaUrl?: string;
  User: {
    username: string;
    avatar?: string;
  };
  createdAt: string;
  updatedAt: string;
}

// Function to format time ago or date
const formatTimeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  
  const diffInMs = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
  // Within an hour: show minutes
  if (diffInMinutes < 60) {
    return `${diffInMinutes} phút trước`;
  }
  
  // Within a day: show hours
  if (diffInHours < 24) {
    return `${diffInHours} giờ trước`;
  }
  
  // Within a week: show days
  if (diffInDays < 7) {
    return `${diffInDays} ngày trước`;
  }
  
  // Otherwise: show dd-mm format
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
  
  return `${day}-${month}`;
};

// Helper function to translate visibility
const translateVisibility = (visibility: string): string => {
  switch (visibility) {
    case 'PUBLIC':
      return 'Công khai';
    case 'PRIVATE':
      return 'Chỉ mình tôi';
    default:
      return visibility;
  }
};

const PostDetail: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const post = location.state?.post as BackendPost;
  const [comments, setComments] = useState<CommentType[]>(location.state?.comments || []);
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    // Fetch comments when component mounts
    const loadComments = async () => {
      try {
        if (post?.id) {
          const fetchedComments = await fetchCommentsByPostId(post.id);
          setComments(fetchedComments || []);
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    
    loadComments();
  }, [post?.id]);

  if (!post) {
    // Redirect to home if no post data was provided
    // Use useEffect for redirection
    React.useEffect(() => {
      const timer = setTimeout(() => {
        navigate('/home');
      }, 2000);
      
      return () => clearTimeout(timer);
    }, [navigate]);

    return (
      <div className="post-detail-error">
        <p>Post not found. Redirecting...</p>
      </div>
    );
  }

  const handleBack = () => {
    navigate('/home');
  };

  return (
    <div className="post-detail-container">
      <Menu />
      <div className="post-detail">
        <div className="post-detail-header">
          <button className="back-button" onClick={handleBack}>
            <i className="fas fa-arrow-left"></i> Back to Home
          </button>
          <h2>Post Detail</h2>
        </div>
        
        <div className="post-detail-content">
          <div className="post-user-info">
            <div className="post-avatar">
              <img 
                src={post.User.avatar || "https://i.pinimg.com/736x/8f/1c/a2/8f1ca2029e2efceebd22fa05cca423d7.jpg"} 
                alt={`${post.User.firstName} ${post.User.lastName}'s avatar`} 
              />
            </div>
            <div className="post-user-details">
              <h3>{post.User.firstName} {post.User.lastName}</h3>
              <p className="post-username">@{post.User.username}</p>
            </div>
          </div>
          
          <div className="post-main-content">
            <p className="post-text">{post.content}</p>
            
            {post.mediaUrl && post.mediaUrl.length > 0 && (
              <div className="post-media">
                {post.mediaUrl.map((url, index) => (
                  <img key={index} src={url} alt={`Post media ${index + 1}`} />
                ))}
              </div>
            )}
          </div>
          
          <div className="post-meta">
            <div className="post-stats">
              <p>
                {post.emotion && post.emotion.type ? (
                  <i 
                    className={EMOTION_ICONS[post.emotion.type as keyof typeof EMOTION_ICONS] || "far fa-thumbs-up"} 
                    style={{ 
                      color: EMOTION_COLORS[post.emotion.type as keyof typeof EMOTION_COLORS] || "" 
                    }}
                  ></i>
                ) : (
                  <i className="far fa-thumbs-up"></i>
                )} {post.likesCount} Likes
              </p>
              <p><i className="far fa-comment"></i> {post.countComments} Comments</p>
            </div>
            
            <div className="post-tags">
              {post.hashtags && post.hashtags.map((tag, index) => (
                <span className="hashtag" key={index}>#{tag}</span>
              ))}
            </div>
            
            <div className="post-details">
              <p>Chế độ xem: {translateVisibility(post.visibility)}</p>
              <p>Thời gian đăng: {formatTimeAgo(post.createdAt)}</p>
              {post.updatedAt !== post.createdAt && (
                <p>Updated: {new Date(post.updatedAt).toLocaleString()}</p>
              )}
            </div>
          </div>
          
          {/* Comments Section */}
          <div className="post-comments">
            <h3>Comments ({comments.length})</h3>
            <div className="comments-list">
              {[...comments].sort((a, b) => 
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
              ).map((comment) => (
                <Comment
                  key={comment.id}
                  name={`${comment.User.username}`}
                  comment={comment.content}
                  imgcmt={comment.mediaUrl}
                  avt={comment.User.avatar}
                  timestamp={formatTimeAgo(comment.createdAt)}
                />
              ))}
              {comments.length === 0 && (
                <p className="no-comments">Chưa có bình luận nào.</p>
              )}
            </div>
          </div>

          {/* Sticky Comment Input */}
          <div className="comment-input-container">
            <div className="comment-input-wrapper">
              <div className="circle-container">
                <img src="https://i.pinimg.com/736x/8f/1c/a2/8f1ca2029e2efceebd22fa05cca423d7.jpg" alt="user-avatar" />
              </div>
              <div className="comment-input">
                <input 
                  type="text" 
                  placeholder="Viết bình luận..." 
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  disabled={isSubmitting}
                />
                <button 
                  className="send-button" 
                  onClick={async () => {
                    if (!commentText.trim() || isSubmitting || !post?.id) return;
                    
                    try {
                      setIsSubmitting(true);
                      const result = await createComment(post.id, commentText);
                      
                      if (result.success) {
                        // Clear input first
                        setCommentText('');
                        
                        // Reload all comments to get fresh data
                        const refreshedComments = await fetchCommentsByPostId(post.id);
                        setComments(refreshedComments || []);
                      }
                    } catch (error) {
                      console.error('Error creating comment:', error);
                    } finally {
                      setIsSubmitting(false);
                    }
                  }}
                  disabled={!commentText.trim() || isSubmitting}
                >
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
