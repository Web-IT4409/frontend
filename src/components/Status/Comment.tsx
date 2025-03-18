import React from "react";
import "./Comment.css";

const Comment: React.FC = () => {
  return (
    <div className="comment-container">
        <div className="comment-part">
            <div className="status-part-upper">
            <div className="circle-container">
                <img id="avt" src="" alt="user-avatar" />
            </div>
            <div className="status-name">
                <span id="username">User Name</span>
            </div>
            </div>
            <div className="comment-part-content">
            <div className="status-part-content-title">
                <span id="status-message">User Comment</span>
            </div>
            <div className="status-part-content-img">
                <img
                id="status-img"
                src="https://bcp.cdnchinhphu.vn/334894974524682240/2023/11/17/hinh-hn-17001876455131390160930.jpeg"
                alt="status-image"
                />
            </div>
            </div>
        </div>
    </div>
  );
};

export default Comment;
