export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  status: string;
  hashtags: string[];
  createdAt: string;
  updatedAt: string;
  avatar?: string; // Adding avatar field
}
