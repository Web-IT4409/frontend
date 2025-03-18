import React, { useState } from "react";
import "./Status.css";
import Comment from "./Comment";

const Status: React.FC = () => {
  const [liked, setLiked] = useState(false); // State lưu trạng thái Like
  const [showComments, setShowComments] = useState(false); // State hiển thị bình luận

  const toggleLike = () => {
    setLiked((prev) => !prev); // Đảo trạng thái Like
  };

  const toggleComments = () => {
    setShowComments((prev) => !prev); // Hiện/ẩn phần bình luận
  };

  return (
    <div className="status-container">
      <div className="status-part">
        <div className="status-part-upper">
          <div className="circle-container">
            <img id="avt" src="" alt="user-avatar" />
          </div>
          <div className="status-name">
            <span id="username">User Name</span>
          </div>
        </div>
        <div className="status-part-content">
          <div className="status-part-content-title">
            <span id="status-message">User Status</span>
          </div>
          <div className="status-part-content-img">
            <img
              id="status-img"
              src="https://bcp.cdnchinhphu.vn/334894974524682240/2023/11/17/hinh-hn-17001876455131390160930.jpeg"
              alt="status-image"
            />
          </div>
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
            <Comment />
        </div>
        <div className="status-part-comment-upper">
                <div className="circle-container">
                <img id="avt" src="" alt="user-avatar" />
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
