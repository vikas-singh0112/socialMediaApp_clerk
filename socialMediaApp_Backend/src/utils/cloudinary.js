import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadProfileImageOnCloudinary = async (localFilePath, userId) => {
  try {
    if (!localFilePath || !userId) return null;

    // upload the profile image file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "image",
      public_id: `clerkapp/profile/profileImg_${userId}`,
      overwrite: true, // Overwrites if the user uploads again
    });

    console.log("profile img uploaded on cloudinary");

    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return {
      secure_url: response.secure_url,
      public_id: response.public_id,
    };
  } catch (error) {
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    console.error("Cloudinary upload error:", error);
    return null;
  }
};

const uploadPostImageOnCloudinary = async (localFilePath, userId) => {
  try {
    if (!localFilePath || !userId) return null;

    // upload the profile image file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "image",
      public_id: `clerkapp/post/${userId}_postImg_${uuidv4()}`,
    });


    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return {
      secure_url: response.secure_url,
      public_id: response.public_id,
    };
  } catch (error) {
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    console.error("Cloudinary upload error:", error);
    return null;
  }
};

export { uploadProfileImageOnCloudinary, uploadPostImageOnCloudinary };
