import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Status.scss";
import Comment from "./Comment";
import { fetchCommentsByPostId } from "@/services/postService";
import { addEmotion, updateEmotion, removeEmotion } from "@/services/emotionService";
import { EMOTIONS, EMOTION_ICONS, EMOTION_COLORS } from "@/utils/constants";

import { BackendPost } from '@/types/Post';

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

export interface StatusProps {
  id: number;
  avt?: string;
  name?: string;
  message?: string;
  image?: string;
  emotion?: string | null; // Emotion type from API
  originalPost?: BackendPost; // Original post data from the API
}

const Status: React.FC<StatusProps> = ({
  id,
  avt = "https://i.pinimg.com/736x/8f/1c/a2/8f1ca2029e2efceebd22fa05cca423d7.jpg",
  name = "Username",
  message = "User title",
  image,
  emotion = null,
  originalPost,
}) => {
  const navigate = useNavigate();
  const [currentEmotion, setCurrentEmotion] = useState<string | null>(emotion);
  const [showEmotionPicker, setShowEmotionPicker] = useState(false);
  const emotionPickerTimerRef = useRef<NodeJS.Timeout | null>(null);
  const likeButtonRef = useRef<HTMLDivElement>(null);
  const [emotionId, setEmotionId] = useState<number | null>(originalPost?.emotion?.id || null);
  const [isProcessing, setIsProcessing] = useState(false); // To prevent multiple API calls
  
  const [liked, setLiked] = useState(!!emotion); // Set liked to true if emotion exists
  const [showComments, setShowComments] = useState(false); // State hiển thị bình luận
  const [comments, setComments] = useState<
    { id: number; name: string; comment: string; avt?: string }[]
  >([]);
  const [isImageBroken, setIsImageBroken] = useState(false);

  // Handle mouse events for emotion picker
  const handleMouseEnter = () => {
    // Start a timer to show the emotion picker after a delay
    emotionPickerTimerRef.current = setTimeout(() => {
      setShowEmotionPicker(true);
    }, 500); // Show after 500ms of hover
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    // Make sure we're not moving to the emotion picker
    const relatedTarget = e.relatedTarget as Node;
    const emotionPicker = document.querySelector('.emotion-picker');
    
    if (emotionPicker && (emotionPicker.contains(relatedTarget) || emotionPicker === relatedTarget)) {
      return; // Don't hide if moving to the emotion picker
    }
    
    // Clear the timer if mouse leaves before the delay
    if (emotionPickerTimerRef.current) {
      clearTimeout(emotionPickerTimerRef.current);
      emotionPickerTimerRef.current = null;
    }
    
    // Hide the emotion picker with a small delay
    // This gives time for the mouse to move to the emotion picker
    setTimeout(() => {
      const activeElement = document.activeElement;
      const emotionPickerElement = document.querySelector('.emotion-picker');
      
      if (!emotionPickerElement || 
         (emotionPickerElement && !emotionPickerElement.contains(activeElement as Node))) {
        setShowEmotionPicker(false);
      }
    }, 100);
  };

  // Select an emotion
  const selectEmotion = async (emotion: string) => {
    if (isProcessing) return; // Prevent multiple API calls
    
    setIsProcessing(true);
    try {
      if (emotionId) {
        // Update existing emotion
        const result = await updateEmotion(emotionId, emotion);
        setEmotionId(result.id);
      } else {
        // Add new emotion
        const result = await addEmotion(id, emotion);
        setEmotionId(result.id);
      }
      
      setCurrentEmotion(emotion);
      setLiked(true);
      setShowEmotionPicker(false);
      
      // Update originalPost if it exists
      if (originalPost && originalPost.likesCount !== undefined) {
        if (!liked) {
          // Increment like count if this is a new like
          originalPost.likesCount += 1;
        }
      }
    } catch (error) {
      console.error("Failed to update emotion:", error);
      // Optionally show error message to user
    } finally {
      setIsProcessing(false);
    }
  };

  // Quick like function (default to LIKE emotion)
  const toggleLike = async () => {
    if (isProcessing) return; // Prevent multiple API calls
    
    setIsProcessing(true);
    try {
      if (liked && emotionId) {
        // Unlike if already liked
        await removeEmotion(emotionId);
        setLiked(false);
        setCurrentEmotion(null);
        setEmotionId(null);
        
        // Update originalPost if it exists
        if (originalPost && originalPost.likesCount !== undefined && originalPost.likesCount > 0) {
          originalPost.likesCount -= 1;
        }
      } else {
        // Like with default LIKE emotion
        const result = await addEmotion(id, EMOTIONS.LIKE);
        setLiked(true);
        setCurrentEmotion(EMOTIONS.LIKE);
        setEmotionId(result.id);
        
        // Update originalPost if it exists
        if (originalPost && originalPost.likesCount !== undefined) {
          originalPost.likesCount += 1;
        }
      }
    } catch (error) {
      console.error("Failed to toggle like:", error);
      // Optionally show error message to user
    } finally {
      setIsProcessing(false);
    }
  };

  // Get the current emotion's icon
  const getCurrentEmotionIcon = () => {
    if (!liked || !currentEmotion) {
      return "far fa-thumbs-up"; // Default unlike icon
    }
    return EMOTION_ICONS[currentEmotion as keyof typeof EMOTION_ICONS] || "far fa-thumbs-up";
  };
  
  // Get the current emotion's color
  const getCurrentEmotionColor = () => {
    if (!liked || !currentEmotion) {
      return ""; // Default color
    }
    return EMOTION_COLORS[currentEmotion as keyof typeof EMOTION_COLORS] || "";
  };

  // Close emotion picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (likeButtonRef.current && !likeButtonRef.current.contains(event.target as Node)) {
        setShowEmotionPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleComments = async () => {
    setShowComments((prev) => !prev); // Hiện/ẩn phần bình luận

    if (!showComments) {
      try {
        const data = await fetchCommentsByPostId(id); // Fetch comments by post ID
        const mappedComments = data.map((comment: { id: number; User: { username: string; avatar?: string }; content: string }) => ({
          id: comment.id,
          name: comment.User.username,
          comment: comment.content,
          avt: comment.User.avatar,
        }));
        setComments(mappedComments);
      } catch (error) {
        console.error("Failed to fetch comments:", error);
      }
    }

    console.log("showComments:", !showComments); // Kiểm tra giá trị mới
  };
  console.log("Comments:", comments);

  const handleImageError = () => {
    setIsImageBroken(true); // Hide the image if it's broken
  };

  const viewPostDetail = () => {
    // If we have the original post data, use that
    const post = originalPost || {
      id,
      userId: 0,
      content: message || "",
      mediaUrl: image ? [image] : [],
      visibility: "PUBLIC" as const,
      likesCount: liked ? 1 : 0,
      status: "ACTIVE" as const,
      groupId: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      countComments: comments.length,
      User: {
        id: 0,
        firstName: name?.split(" ")[0] || "",
        lastName: name?.split(" ").slice(1).join(" ") || "",
        username: name || "",
      },
      hashtags: [],
    };

    navigate(`/post/${id}`, {
      state: { 
        post,
        comments: comments.map(cmt => ({
          id: cmt.id,
          userId: 0,
          postId: id,
          content: cmt.comment,
          User: {
            username: cmt.name,
            avatar: cmt.avt
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }))
      }
    });
  };

  return (
    <div className="status-container">
      <div className="status-part">
        <div className="status-part-upper">
          <div className="circle-container">
            <img id="avt" src={avt} alt="user-avatar" />
          </div>
          <div className="status-name">
            <span id="username">{name}</span>
            {originalPost && originalPost.createdAt && (
              <span className="post-time">{formatTimeAgo(originalPost.createdAt)}</span>
            )}
          </div>
        </div>
        <div className="status-part-content">
          <div className="status-part-content-title">
            <span id="status-message">{message}</span>
          </div>
          {image && !isImageBroken && (
            <div className="status-part-content-img">
              <img
                id="status-img"
                src={image}
                alt="status-image"
                onError={handleImageError} // Handle broken images
              />
            </div>
          )}
        </div>
        <div className="status-part-lower">
          {/* Nút Like với Emotion Picker */}
          <div
            ref={likeButtonRef}
            className={`status-part-lower-item ${liked ? "liked" : ""} ${isProcessing ? "disabled" : ""}`}
            onClick={isProcessing ? undefined : toggleLike}
            onMouseEnter={isProcessing ? undefined : handleMouseEnter}
            onMouseLeave={isProcessing ? undefined : handleMouseLeave}
          >
            <i 
              className={getCurrentEmotionIcon()} 
              style={{ color: getCurrentEmotionColor() }}
            ></i>
            <span className="count-text">{originalPost?.likesCount || 0}</span>
            
            {/* Invisible hover area for maintaining hover */}
            {showEmotionPicker && <div className="emotion-hover-area" onMouseEnter={() => setShowEmotionPicker(true)}></div>}
            
            {/* Emotion Picker */}
            {showEmotionPicker && (
              <div 
                className="emotion-picker"
                onMouseEnter={() => setShowEmotionPicker(true)}
                onMouseLeave={() => setShowEmotionPicker(false)}
              >
                {Object.entries(EMOTIONS).map(([key, value]) => (
                  <div 
                    key={key} 
                    className={`emotion-item ${key} ${isProcessing ? 'disabled' : ''}`} 
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering the parent onClick
                      if (!isProcessing) {
                        selectEmotion(value);
                      }
                    }}
                    title={key}
                  >
                    <i 
                      className={EMOTION_ICONS[key as keyof typeof EMOTION_ICONS]} 
                      style={{ color: EMOTION_COLORS[key as keyof typeof EMOTION_COLORS] }}
                    ></i>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Nút Comment */}
          <div
            className="status-part-lower-item"
            onClick={toggleComments}
          >
            <i className="far fa-comment"></i>
            <span className="count-text">{originalPost?.countComments || 0}</span>
          </div>

          {/* Nút View Details (previously Share) */}
          <div
            className="status-part-lower-item view-details"
            onClick={viewPostDetail}
            title="View post details"
          >
            <i className="far fa-eye"></i>
          </div>
        </div>

        {/* Phần bình luận, chỉ hiển thị nếu showComments = true */}
        <div className={`status-part-comment ${showComments ? "show" : ""}`}>
          {comments.length > 0 && comments.slice(0, 2).map((cmt) => (
            <Comment key={cmt.id} name={cmt.name} comment={cmt.comment} avt={cmt.avt} />
          ))}
          {comments.length === 0 && (
            <p className="no-comments-text">Chưa có bình luận</p>
          )}
          <div className="view-more-link" onClick={viewPostDetail}>
            Xem chi tiết bài viết
          </div>
        </div>


      </div>
    </div>
  );
};

export default Status;
