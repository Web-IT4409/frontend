import React, { useEffect, useState, useRef } from 'react';
import Menu from '@/components/Menu/Menu';
import Status from '@/components/Status/Status';
import './Profile.scss';
import { fetchUserDetails, updateUserAvatar } from '@/services/userService';
import { uploadImage } from '@/utils/upload';
import { fetchPosts, fetchUserPosts } from '@/services/postService';
import { BackendPost } from '@/types/Post';
import { mapBackendPostToStatusProps } from '@/utils/mappers';

interface UserDetails {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email?: string;
  avatar?: string;
}

const Profile: React.FC = () => {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [posts, setPosts] = useState<BackendPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getUserDetails = async () => {
    try {
      const data = await fetchUserDetails(); // Call the service function
      setUserDetails(data);
    } catch (err: any) {
      console.error('Failed to fetch user details:', err);
      setError('Failed to load user details.');
    } finally {
      setLoading(false);
    }
  };

  const getUserPosts = async () => {
    if (!userDetails?.id) return;
    
    try {
      const postsData = await fetchUserPosts(userDetails.id);
      setPosts(postsData);
    } catch (err) {
      console.error('Failed to fetch user posts:', err);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);
  
  // Fetch user posts after user details are loaded
  useEffect(() => {
    if (userDetails?.id) {
      getUserPosts();
    }
  }, [userDetails?.id]);

  const handleAvatarClick = () => {
    setIsAvatarModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAvatarModalOpen(false);
    setUploadError(null);
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError(null);

    try {
      // Upload image to storage
      const avatarUrl = await uploadImage(file);
      
      if (avatarUrl) {
        // Update user avatar in the database
        await updateUserAvatar(avatarUrl);
        // Refresh user details to get the updated avatar
        await getUserDetails();
        handleCloseModal();
      } else {
        setUploadError('Failed to upload image. Please try again.');
      }
    } catch (err) {
      console.error('Error uploading avatar:', err);
      setUploadError('Error updating avatar. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="profile-container">
      <Menu />
      <div className="profile-main">
        <div className="profile-header">
          <div className="profile-avatar-container">
            <img
              className="profile-avatar"
              src={userDetails?.avatar || "https://i.pinimg.com/736x/8f/1c/a2/8f1ca2029e2efceebd22fa05cca423d7.jpg"}
              alt="Avatar"
              onClick={handleAvatarClick}
            />
            <div className="avatar-overlay" onClick={handleAvatarClick}>
              <i className="fas fa-camera"></i>
              <span>Change Avatar</span>
            </div>
          </div>
          <h2 className="profile-name">
            {userDetails?.firstName} {userDetails?.lastName}
          </h2>
          <p className="profile-info">@{userDetails?.username}</p>
        </div>

        <div className="profile-statuses">
          {posts.length > 0 ? (
            posts.map((post) => {
              const statusProps = mapBackendPostToStatusProps(post);
              // Ensure avatar shows the current user's avatar
              statusProps.avt = userDetails?.avatar || "https://i.pinimg.com/736x/8f/1c/a2/8f1ca2029e2efceebd22fa05cca423d7.jpg";
              // Use firstName + lastName for the name
              statusProps.name = `${userDetails?.firstName} ${userDetails?.lastName}`;
              
              return <Status key={post.id} {...statusProps} />;
            })
          ) : (
            <p>No posts yet.</p>
          )}
        </div>
      </div>

      {/* Avatar Upload Modal */}
      {isAvatarModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-card avatar-modal" onClick={(e) => e.stopPropagation()}>
            <h2>Update Profile Picture</h2>
            
            {uploadError && <p className="error-message">{uploadError}</p>}
            
            <div className="avatar-preview">
              <img 
                src={userDetails?.avatar || "https://i.pinimg.com/736x/8f/1c/a2/8f1ca2029e2efceebd22fa05cca423d7.jpg"} 
                alt="Current Avatar" 
              />
            </div>
            
            <div className="modal-buttons">
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                hidden
              />
              <button 
                className="modal-button upload"
                onClick={handleFileSelect}
                disabled={isUploading}
              >
                {isUploading ? "Uploading..." : "Choose Image"}
              </button>
              <button 
                className="modal-button cancel"
                onClick={handleCloseModal}
                disabled={isUploading}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
