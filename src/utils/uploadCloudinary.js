import { VITE_CLOUD_NAME, VITE_UPLOAD_PRESET } from "../config";

const uploadImageToCloudinary = async (file) => {
  const uploadData = new FormData();

  uploadData.append("file", file);
  uploadData.append("upload_preset", VITE_UPLOAD_PRESET);
  uploadData.append("cloud_name", VITE_CLOUD_NAME);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${VITE_CLOUD_NAME}/image/upload`,
    {
      method: "post",
      body: uploadData,
    }
  );

  const data = await response.json();
  return data;
};

export default uploadImageToCloudinary;
