import { BackendPost } from "@/types/Post";

export const mapBackendPostToStatusProps = (backendPost: BackendPost) => {
  // Pass the original data as well as map to the StatusProps format
  const userName = `${backendPost.User.firstName} ${backendPost.User.lastName}`;
  
  // Extract emotion type if it exists
  const emotionType = backendPost.emotion ? backendPost.emotion.type : null;
  
  return {
    id: backendPost.id,
    avt: backendPost.User.avatar || `https://i.pinimg.com/736x/8f/1c/a2/8f1ca2029e2efceebd22fa05cca423d7.jpg`, // Use avatar if available
    name: userName, // Always use firstName + lastName as the name
    message: backendPost.content,
    image: backendPost.mediaUrl && backendPost.mediaUrl.length > 0 ? backendPost.mediaUrl[0] : undefined, // Use the first media item as the image
    originalPost: backendPost, // Keep the original post data for use in the detail view
    emotion: emotionType, // Include just the emotion type string
  };
};
