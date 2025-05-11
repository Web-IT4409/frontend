import React, { useEffect, useState } from 'react';
import Menu from '@/components/Menu/Menu';
import { User } from '@/types/User';
import { fetchFriends, fetchFriendSuggestions } from '@/services/userService';
import { 
  sendFriendRequest, 
  getSentFriendRequests, 
  cancelSentFriendRequest,
  getPendingFriendRequests,
  respondToFriendRequest,
  unfriendUser
} from '@/services/friendService';
import './Friends.scss';

const Friends: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'friends' | 'suggestions' | 'sent' | 'pending'>('friends');
  const [friends, setFriends] = useState<User[]>([]);
  const [suggestions, setSuggestions] = useState<User[]>([]);
  const [sentRequests, setSentRequests] = useState<any[]>([]);
  const [pendingRequests, setPendingRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadPendingRequests = async () => {
    setLoading(true);
    try {
      const { success, data } = await getPendingFriendRequests();
      if (success) {
        setPendingRequests(data);
      }
    } catch (err) {
      console.error('Failed to fetch pending requests:', err);
      setError('Failed to load pending friend requests.');
    } finally {
      setLoading(false);
    }
  };

  const loadSentRequests = async () => {
    setLoading(true);
    try {
      const { success, data } = await getSentFriendRequests();
      if (success) {
        setSentRequests(data);
      }
    } catch (err) {
      console.error('Failed to fetch sent requests:', err);
      setError('Failed to load sent friend requests.');
    } finally {
      setLoading(false);
    }
  };

  const loadFriends = async () => {
    setLoading(true);
    try {
      const friendsData = await fetchFriends();
      setFriends(friendsData);
    } catch (err) {
      console.error('Failed to fetch friends:', err);
      setError('Failed to load friends.');
    } finally {
      setLoading(false);
    }
  };

  const loadSuggestions = async () => {
    setLoading(true);
    try {
      const suggestionsData = await fetchFriendSuggestions();
      setSuggestions(suggestionsData);
    } catch (err) {
      console.error('Failed to fetch friend suggestions:', err);
      setError('Failed to load friend suggestions.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'friends') {
      loadFriends();
    } else if (activeTab === 'suggestions') {
      loadSuggestions();
    } else if (activeTab === 'pending') {
      loadPendingRequests();
    } else {
      loadSentRequests();
    }
  }, [activeTab]);

  const getRandomAvatar = (userId: number) => {
    return `https://i.pravatar.cc/150?img=${(userId + 10) % 70}`;
  };

  const renderUserCard = (user: User | any, isFriend: boolean, isSentRequest = false, requestData?: any) => (
    <div className="user-card" key={user.id}>
      <div className="user-header">
        <img
          className="user-avatar"
          src={getRandomAvatar(user.id)}
          alt={`${user.firstName} ${user.lastName}`}
        />
        <div className="user-info">
          <h3 className="user-name">{user.firstName} {user.lastName}</h3>
          <p className="username">@{user.username}</p>
        </div>
      </div>

      {user.hashtags && user.hashtags.length > 0 && (
        <div className="hashtags">
          {user.hashtags.map((tag: string, index: number) => (
            <span className="hashtag" key={index}>#{tag}</span>
          ))}
        </div>
      )}

      <div className="action-buttons">
        {isSentRequest ? (
          <button
            className="cancel-request"
            onClick={() => handleCancelRequest(requestData.receiver_id)}
          >
            <i className="fa-solid fa-user-xmark"></i> Hủy
          </button>
        ) : isFriend ? (
          <button 
            className="remove-friend"
            onClick={() => handleUnfriend(user.id)}
          >
            <i className="fa-solid fa-user-minus"></i> Hủy kết bạn
          </button>
        ) : (
          <button
            className="add-friend"
            onClick={() => handleSendRequest(user.id)}
          >
            <i className="fa-solid fa-user-plus"></i> Thêm bạn
          </button>
        )}
        <button className="view-profile">
          <i className="fa-solid fa-user"></i> Trang cá nhân
        </button>
      </div>
    </div>
  );

  const handleCancelRequest = async (receiverId: number) => {
    try {
      const { success } = await cancelSentFriendRequest(receiverId);
      if (success) {
        loadSentRequests(); // Reload the sent requests list
      }
    } catch (err) {
      console.error('Failed to cancel request:', err);
      setError('Failed to cancel friend request.');
    }
  };

  const handleSendRequest = async (receiverId: number) => {
    await sendFriendRequest(receiverId);
    loadSuggestions(); // Reload suggestions after sending request
  };

  const handleAcceptRequest = async (senderId: number) => {
    try {
      const { success } = await respondToFriendRequest(senderId, 'accept');
      if (success) {
        loadPendingRequests(); // Reload the pending requests list
      }
    } catch (err) {
      console.error('Failed to accept request:', err);
      setError('Failed to accept friend request.');
    }
  };

  const handleRejectRequest = async (senderId: number) => {
    try {
      const { success } = await respondToFriendRequest(senderId, 'decline');
      if (success) {
        loadPendingRequests(); // Reload the pending requests list
      }
    } catch (err) {
      console.error('Failed to reject request:', err);
      setError('Failed to reject friend request.');
    }
  };

  const handleUnfriend = async (friendId: number) => {
    try {
      const { success } = await unfriendUser(friendId);
      if (success) {
        loadFriends(); // Reload the friends list after unfriending
      }
    } catch (err) {
      console.error('Failed to unfriend user:', err);
      setError('Failed to unfriend user.');
    }
  };

  const renderPendingRequestCard = (request: any) => (
    <div className="user-card" key={request.id}>
      <div className="user-header">
        <img
          className="user-avatar"
          src={getRandomAvatar(request.sender.id)}
          alt={`${request.sender.firstName} ${request.sender.lastName}`}
        />
        <div className="user-info">
          <h3 className="user-name">{request.sender.firstName} {request.sender.lastName}</h3>
          <p className="username">@{request.sender.username}</p>
        </div>
      </div>

      <div className="action-buttons">
        <button
          className="accept-request"
          onClick={() => handleAcceptRequest(request.sender_id)}
        >
          <i className="fa-solid fa-check"></i> Đồng ý
        </button>
        <button
          className="reject-request"
          onClick={() => handleRejectRequest(request.sender_id)}
        >
          <i className="fa-solid fa-times"></i> Từ chối
        </button>
        <button className="view-profile">
          <i className="fa-solid fa-user"></i> Trang cá nhân
        </button>
      </div>
    </div>
  );

  const renderContent = () => {
    if (loading) {
      return <p className="loading">Đang tải...</p>;
    }

    if (error) {
      return <p className="error">{error}</p>;
    }

    if (activeTab === 'sent') {
      return sentRequests.length > 0 ? (
        <div className="users-list">
          {sentRequests.map(request => renderUserCard(request.receiver, false, true, request))}
        </div>
      ) : (
        <div className="empty-state">
          <i className="fa-solid fa-paper-plane"></i>
          <p>Chưa có yêu cầu kết bạn nào được gửi</p>
        </div>
      );
    } else if (activeTab === 'pending') {
      return pendingRequests.length > 0 ? (
        <div className="users-list">
          {pendingRequests.map(request => renderPendingRequestCard(request))}
        </div>
      ) : (
        <div className="empty-state">
          <i className="fa-solid fa-user-clock"></i>
          <p>Không có lời mời kết bạn nào</p>
        </div>
      );
    } else if (activeTab === 'friends') {
      return friends.length > 0 ? (
        <div className="users-list">
          {friends.map(friend => renderUserCard(friend, true))}
        </div>
      ) : (
        <div className="empty-state">
          <i className="fa-solid fa-user-group"></i>
          <p>Chưa có bạn bè</p>
        </div>
      );
    } else {
      return suggestions.length > 0 ? (
        <div className="users-list">
          {suggestions.map(suggestion => renderUserCard(suggestion, false))}
        </div>
      ) : (
        <div className="empty-state">
          <i className="fa-solid fa-user-plus"></i>
          <p>Hiện tại chưa có gợi ý mới</p>
        </div>
      );
    }
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case 'friends':
        return 'Danh sách bạn bè';
      case 'suggestions':
        return 'Gợi ý kết bạn';
      case 'sent':
        return 'Yêu cầu đã gửi';
      case 'pending':
        return 'Lời mời đang chờ';
      default:
        return '';
    }
  };

  return (
    <div className="friends-container">
      <Menu />
      <div className="friends">
        {/* Left sidebar with tabs */}
        <div className="sidebar">
          <div className="sidebar-header">
            <h2>Bạn bè</h2>
          </div>

          <ul className="sidebar-nav">
            <li>
              <button
                className={activeTab === 'friends' ? 'active' : ''}
                onClick={() => setActiveTab('friends')}
              >
                <i className="fa-solid fa-user-group"></i>
                Danh sách bạn bè
              </button>
            </li>
            <li>
              <button
                className={activeTab === 'suggestions' ? 'active' : ''}
                onClick={() => setActiveTab('suggestions')}
              >
                <i className="fa-solid fa-user-plus"></i>
                Gợi ý kết bạn
              </button>
            </li>
            <li>
              <button
                className={activeTab === 'sent' ? 'active' : ''}
                onClick={() => setActiveTab('sent')}
              >
                <i className="fa-solid fa-paper-plane"></i>
                Yêu cầu đã gửi
              </button>
            </li>
            <li>
              <button
                className={activeTab === 'pending' ? 'active' : ''}
                onClick={() => setActiveTab('pending')}
              >
                <i className="fa-solid fa-user-clock"></i>
                Lời mời đang chờ
              </button>
            </li>
          </ul>
        </div>

        <div className="content">
          <div className="content-header">
            <h2>{getTabTitle()}</h2>
          </div>

          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Friends;
