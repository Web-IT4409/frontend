import React, { useState } from "react";
import "./HeaderHome.scss";
import { createPost } from "@/services/postService";

export interface HeaderHomeProps {
  avt?: string;
  refreshPosts: () => Promise<void>;
}

const HeaderHome: React.FC<HeaderHomeProps> = ({
  avt = "https://i.pinimg.com/736x/8f/1c/a2/8f1ca2029e2efceebd22fa05cca423d7.jpg",
  refreshPosts,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState<string>(""); // Post content
  const [previewImages, setPreviewImages] = useState<string[]>([]); // Uploaded images
  const [visibility, setVisibility] = useState<string>("PUBLIC"); // Post visibility
  const [isSubmitting, setIsSubmitting] = useState(false); // Submission state
  const [location, setLocation] = useState<string | null>(null);
  const [emotion, setEmotion] = useState<string | null>(null);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showEmotionDropdown, setShowEmotionDropdown] = useState(false);

  const emotions = ["😊 Vui vẻ", "😢 Buồn", "😡 Tức giận", "😍 Hạnh phúc", "😴 Mệt mỏi"];
  const locations = ["Hà Nội", "TP. Hồ Chí Minh", "Đà Nẵng", "Huế", "Nha Trang"];

  const handleInputClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setContent("");
    setPreviewImages([]);
    setVisibility("PUBLIC");
    setLocation(null);
    setEmotion(null);
    setShowLocationDropdown(false);
    setShowEmotionDropdown(false);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file));
      setPreviewImages((prev) => [...prev, ...newImages]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleLocationSelect = (loc: string) => {
    setLocation(loc);
    setShowLocationDropdown(false);
  };

  const handleEmotionSelect = (emo: string) => {
    setEmotion(emo);
    setShowEmotionDropdown(false);
  };

  const toggleLocationDropdown = () => {
    setShowLocationDropdown((prev) => !prev);
    setShowEmotionDropdown(false); // Đóng dropdown cảm xúc khi mở vị trí
  };

  const toggleEmotionDropdown = () => {
    setShowEmotionDropdown((prev) => !prev);
    setShowLocationDropdown(false); // Đóng dropdown vị trí khi mở cảm xúc
  };

  const handleSubmitPost = async () => {
    if (!content.trim()) {
      alert("Nội dung bài đăng đang trống!");
      return;
    }

    setIsSubmitting(true);

    try {
      const mediaUrl = previewImages; // Use the uploaded image URLs
      const postData = { content, visibility, mediaUrl };
      await createPost(postData); // Call the createPost service
      alert("Đăng bài thành công!");
      handleCloseModal(); // Close the modal after successful submission
      refreshPosts(); // Refresh posts after creating a new post
    } catch (error) {
      console.error("Failed to create post:", error);
      alert("Đăng bài thất bại, vui lòng thử lại");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="header-container">
        <div className="header-part">
          <div className="header-part-upper">
            <div className="circle-container">
              <img id="avt" src={avt} alt="user-avatar" />
            </div>
            <div className="header-input">
              <input
                id="header-input"
                type="text"
                placeholder="Bạn đang nghĩ gì?"
                onClick={handleInputClick}
              />
            </div>
          </div>
          <div className="header-part-lower">
            <div className="header-part-lower-item">
              <i className="far fa-bell"></i>
            </div>
            <div className="header-part-lower-item">
              <i className="far fa-bell"></i>
            </div>
            <div className="header-part-lower-item">
              <i className="far fa-bell"></i>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">Tạo bài đăng mới</h2>
            <textarea
              className="modal-textarea"
              placeholder="Hãy viết gì đó..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <div className="modal-metadata">
              {location && (
                <span className="metadata-item">
                  <i className="fas fa-map-marker-alt"></i> {location}
                  <button className="remove-metadata-btn" onClick={() => setLocation(null)}>
                    <i className="fas fa-times"></i>
                  </button>
                </span>
              )}
              {emotion && (
                <span className="metadata-item">
                  <i className="fas fa-smile"></i> {emotion}
                  <button className="remove-metadata-btn" onClick={() => setEmotion(null)}>
                    <i className="fas fa-times"></i>
                  </button>
                </span>
              )}
            </div>
            {previewImages.length > 0 && (
              <div className="image-preview-list">
                {previewImages.map((image, index) => (
                  <div key={index} className="image-preview-container">
                    <img src={image} alt={`Preview ${index}`} className="image-preview" />
                    <button
                      className="remove-image-btn"
                      onClick={() => handleRemoveImage(index)}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="modal-actions">
              <div className="modal-action-buttons">
                <label className="modal-button upload">
                  <i className="fas fa-image"></i> Tải ảnh lên
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    hidden
                  />
                </label>
                <div className="dropdown-container">
                  <button
                    className="modal-button location"
                    onClick={toggleLocationDropdown}
                  >
                    <i className="fas fa-map-marker-alt"></i> Gắn vị trí
                  </button>
                  {showLocationDropdown && (
                    <div className="dropup-menu">
                      {locations.map((loc) => (
                        <div
                          key={loc}
                          className="dropup-item"
                          onClick={() => handleLocationSelect(loc)}
                        >
                          {loc}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="dropdown-container">
                  <button
                    className="modal-button emotion"
                    onClick={toggleEmotionDropdown}
                  >
                    <i className="fas fa-smile"></i> Cảm xúc
                  </button>
                  {showEmotionDropdown && (
                    <div className="dropup-menu">
                      {emotions.map((emo) => (
                        <div
                          key={emo}
                          className="dropup-item"
                          onClick={() => handleEmotionSelect(emo)}
                        >
                          {emo}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="modal-buttons">
                <button
                  className="modal-button post"
                  onClick={handleSubmitPost}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Đang tải..." : "Đăng"}
                </button>
                <button className="modal-button cancel" onClick={handleCloseModal}>
                  Huỷ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HeaderHome;