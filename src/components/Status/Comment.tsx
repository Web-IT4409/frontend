import React from "react";
import "./Comment.css";

interface CommentProps {
  avt?: string;
  name?: string;
  comment?: string;
  imgcmt?: string;
}

const Comment: React.FC<CommentProps> = ({
  avt = "https://i.pinimg.com/736x/8f/1c/a2/8f1ca2029e2efceebd22fa05cca423d7.jpg",
  name = "Username",
  comment = "User comment",
  imgcmt = "https://hoangphuconline.vn/media/magefan_blog/2021/12/hinh-nen-dep-96-scaled.jpg",
}) => {
  return (
    <div className="comment-container">
      <div className="comment-part">
        <div className="status-part-upper">
          <div className="circle-container">
            <img id="avt" src={avt} alt="user-avatar" />
          </div>
          <div className="status-name">
            <span id="username">{name}</span>
          </div>
        </div>
        <div className="comment-part-content">
          <div className="status-part-content-title">
            <span id="status-message">{comment}</span>
          </div>
          <div className="status-part-content-img">
            <img id="status-img" src={imgcmt} alt="status-image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
