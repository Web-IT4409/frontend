export interface BackendPost {
  id: number;
  userId: number;
  content: string;
  mediaUrl: string[];
  visibility: string;
  likesCount: number;
  status: string;
  groupId: number | null;
  createdAt: string;
  updatedAt: string;
  countComments: number;
  User: {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
  };
  hashtags: string[];
}