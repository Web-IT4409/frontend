import React from 'react';
import Menu from '@/components/Menu/Menu';
import Status from '@/components/Status/Status';
import './Profile.scss';

const Profile: React.FC = () => {
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
          <h2 className="profile-name">Trần Quốc Hoàn</h2>
          <p className="profile-info">Sinh viên ngành Kỹ thuật Máy tính - ĐHBK Hà Nội</p>
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
    </div>
  );
};

export default Profile;