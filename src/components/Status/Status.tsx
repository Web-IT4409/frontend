import React, { useState } from "react";
import "./Status.scss";
import Comment from "./Comment";
import { fetchCommentsByPostId } from "@/services/postService";

export interface StatusProps {
  id: number;
  avt?: string;
  name?: string;
  message?: string;
  image?: string;
  // comments?: { avt?: string; name?: string; comment?: string; imgcmt?: string}[];
}

const Status: React.FC<StatusProps> = ({
  id,
  avt = "https://i.pinimg.com/736x/8f/1c/a2/8f1ca2029e2efceebd22fa05cca423d7.jpg",
  name = "Username",
  message = "User title",
  image,
}) => {
  const [liked, setLiked] = useState(false); // State lưu trạng thái Like
  const [showComments, setShowComments] = useState(false); // State hiển thị bình luận
  const [comments, setComments] = useState<
    { id: number; name: string; comment: string }[]
  >([]);
  const [isImageBroken, setIsImageBroken] = useState(false);

  const toggleLike = () => {
    setLiked((prev) => !prev); // Đảo trạng thái Like
  };

  const toggleComments = async () => {
    setShowComments((prev) => !prev); // Hiện/ẩn phần bình luận

    if (!showComments) {
      try {
        const data = await fetchCommentsByPostId(id); // Fetch comments by post ID
        const mappedComments = data.map((comment: { id: number; User: { username: string }; content: string }) => ({
          id: comment.id,
          name: comment.User.username,
          comment: comment.content,
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

  return (
    <div className="status-container">
      <div className="status-part">
        <div className="status-part-upper">
          <div className="circle-container">
            <img id="avt" src={avt} alt="user-avatar" />
          </div>
          <div className="status-name">
            <span id="username">{name}</span>
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
          {/* Nút Like */}
          <div 
            className={`status-part-lower-item ${liked ? "liked" : ""}`} 
            onClick={toggleLike}
          >
            <i className={liked ? "fas fa-thumbs-up" : "far fa-thumbs-up"}></i>
          </div>

          {/* Nút Comment */}
          <div 
            className="status-part-lower-item" 
            onClick={toggleComments}
          >
            <i className="far fa-comment"></i>
          </div>

          {/* Nút Share */}
          <div className="status-part-lower-item">
            <i className="far fa-share-square"></i>
          </div>
        </div>

        {/* Phần bình luận, chỉ hiển thị nếu showComments = true */}
        <div className={`status-part-comment ${showComments ? "show" : ""}`}>
          {comments.length > 0 ? (
            comments.map((cmt) => (
              <Comment key={cmt.id} name={cmt.name} comment={cmt.comment} />
            ))
          ) : (
            <p className="no-comments-text" >Chưa có bình luận</p>
          )}
        </div>


        {/* Ô nhập bình luận */}
        <div className="status-part-comment-upper">
          <div className="circle-container">
            <img id="avt" src={avt} alt="user-avatar" />
          </div>
          <div className="comment-input">
            <input id="comment-input" type="text" placeholder="Bình luận..." />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Status;