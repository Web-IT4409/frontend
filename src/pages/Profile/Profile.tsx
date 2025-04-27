import React, { useEffect, useState } from 'react';
import Menu from '@/components/Menu/Menu';
import Status from '@/components/Status/Status';
import './Profile.scss';
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle';
import { fetchUserDetails } from '@/services/userService';

interface UserDetails {
  firstName: string;
  lastName: string;
  username: string;
  email?: string; // Add other fields as needed
}

const Profile: React.FC = () => {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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

    getUserDetails();
  }, []);

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
          <img
            className="profile-avatar"
            src="https://i.pinimg.com/736x/8f/1c/a2/8f1ca2029e2efceebd22fa05cca423d7.jpg"
            alt="Avatar"
          />
          <h2 className="profile-name">
            {userDetails?.firstName} {userDetails?.lastName}
          </h2>
          <p className="profile-info">@{userDetails?.username}</p>
        </div>

        <div className="profile-statuses">
          <Status
            message="Một ngày đẹp trời để code!"
            image="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
            comments={[]}
          />
          <Status
            message="Vừa hoàn thành đồ án IoT 😎"
            image="https://images.unsplash.com/photo-1581092334603-6c06f142f846"
            comments={[]}
          />
        </div>
      </div>
      <ThemeToggle />
    </div>
  );
};

export default Profile;