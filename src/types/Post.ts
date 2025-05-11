export interface Emotion {
  id: number;
  type: string;
}

export interface BackendPost {
  id: number;
  userId: number;
  content: string;
  mediaUrl: string[];
  visibility: 'PUBLIC' | 'PRIVATE' | 'FRIENDS'; // Using literal types
  likesCount: number;
  status: 'ACTIVE' | 'DELETED' | 'HIDDEN'; // Using literal types
  groupId: number | null;
  createdAt: string;
  updatedAt: string;
  countComments: number;
  User: {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    avatar?: string; // Add avatar field
  };
  hashtags: string[];
  emotion: Emotion | null; // Updated to use the Emotion interface
}

// Full post data that can be used in post detail view
export interface PostDetail extends BackendPost {
  // Add any additional fields that might be needed for the detail view
}
