import React, { useState } from "react";
import "./Comment.scss";

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
  imgcmt,
}) => {
  const [isImageBroken, setIsImageBroken] = useState(false);

  const handleImageError = () => {
    setIsImageBroken(true); // Hide the image if it's broken
  };

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
          {imgcmt && !isImageBroken && (
            <div className="status-part-content-img">
              <img
                id="status-img"
                src={imgcmt}
                alt="comment-image"
                onError={handleImageError} // Handle broken images
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;