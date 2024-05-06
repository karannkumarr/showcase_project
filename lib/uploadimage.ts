// uploadImage.ts

export const uploadImage = async (file: File): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append("image", file);
  
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("Failed to upload image.");
      }
  
      const data = await response.json();
      return data.url; // Return the URL of the uploaded image
    } catch (error) {
      throw error;
    }
  };
  