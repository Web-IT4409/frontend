import api from '@/utils/api';
import { Emotion } from '@/types/Post';

// Add a new emotion (like) to a post
export const addEmotion = async (postId: number, emotion: string): Promise<Emotion> => {
  try {
    const response = await api.post('/emotions', { 
      postId, 
      emotion 
    });
    return response.data;
  } catch (error) {
    console.error('Error adding emotion:', error);
    throw error;
  }
};

// Update an existing emotion
export const updateEmotion = async (emotionId: number, newEmotion: string): Promise<Emotion> => {
  try {
    const response = await api.patch(`/emotions/${emotionId}`, { 
      emotion: newEmotion 
    });
    return response.data;
  } catch (error) {
    console.error('Error updating emotion:', error);
    throw error;
  }
};

// Remove an emotion (unlike)
export const removeEmotion = async (emotionId: number): Promise<void> => {
  try {
    await api.delete(`/emotions/${emotionId}`);
  } catch (error) {
    console.error('Error removing emotion:', error);
    throw error;
  }
};
