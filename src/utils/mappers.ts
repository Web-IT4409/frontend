import { BackendPost } from "@/types/Post";

export const mapBackendPostToStatusProps = (backendPost: BackendPost) => {
  return {
    id: backendPost.id,
    avt: `https://i.pinimg.com/736x/8f/1c/a2/8f1ca2029e2efceebd22fa05cca423d7.jpg`, // Replace with actual avatar logic
    name: `${backendPost.User.firstName} ${backendPost.User.lastName}`, // Combine firstName and lastName
    message: backendPost.content,
    image: backendPost.mediaUrl[0], // Use the first media item as the image
    comments: [], // Populate comments if available
  };
};