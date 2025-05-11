import api from '@/utils/api';

export const getPendingFriendRequests = async (): Promise<{ success: boolean, data: any }> => {
    const response = await api.get('/friends/requests/pending');
    if (response.status === 200) {
        return { success: true, data: response.data };
    } else {
        return { success: false, data: response.data.error };
    }
};

export const getSentFriendRequests = async (): Promise<{ success: boolean, data: any }> => {
    const response = await api.get('/friends/requests/sent');
    if (response.status === 200) {
        return { success: true, data: response.data };
    } else {
        return { success: false, data: response.data.error };
    }
};

export const sendFriendRequest = async (receiverId: number): Promise<{ success: boolean, data: any }> => {
    const response = await api.post('/friends/request', { receiverId });
    if (response.status === 200) {
        return { success: true, data: response.data };
    } else {
        return { success: false, data: response.data.error };
    }
};

export const respondToFriendRequest = async (senderId: number, action: 'accept' | 'decline'): Promise<{ success: boolean, data: any }> => {
    const response = await api.post('/friends/respond', { senderId, action });
    if (response.status === 200) {
        return { success: true, data: response.data };
    } else {
        return { success: false, data: response.data.error };
    }
};

export const cancelSentFriendRequest = async (receiverId: number): Promise<{ success: boolean, data: any }> => {
    const response = await api.delete(`/friends/request/${receiverId}`);
    if (response.status === 200) {
        return { success: true, data: response.data };
    } else {
        return { success: false, data: response.data.error };
    }
};

export const cancelFriendRequest = async (requestId: number): Promise<{ success: boolean, data: any }> => {
    const response = await api.post('/friend/cancel', { requestId });
    if (response.status === 200) {
        return { success: true, data: response.data };
    } else {
        return { success: false, data: response.data.error };
    }
};

export const unfriendUser = async (friendId: number): Promise<{ success: boolean, data: any }> => {
    const response = await api.delete(`/friends/unfriend/${friendId}`);
    if (response.status === 200) {
        return { success: true, data: response.data };
    } else {
        return { success: false, data: response.data.error };
    }
};
