export const isEditable = (commentCreatedAt) => {
    const createdAt = new Date(commentCreatedAt); 
    const currentTime = new Date(); 
    const timeDifference = (currentTime - createdAt) / (1000 * 60); 
    return timeDifference <= 30;
  };