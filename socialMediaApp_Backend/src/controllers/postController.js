import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/userModel.js";
import { Post } from "../models/postModel.js";
import { uploadPostImageOnCloudinary } from "../utils/cloudinary.js";

const createPost = asyncHandler(async (req, res) => {
  const { content, postImage } = req.body;
  const clerkUserId = req.auth().userId;

  const user = await User.findOne({ clerkId: `${clerkUserId}` });

  if (!user) {
    throw new ApiError(404, "unable to find user in db");
  }
  // ********************************************* //
  if (!content && !postImage) {
    throw new ApiError(401, "content or image is required for post");
  }


  let postImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.postImage) &&
    req.files.postImage.length > 0
  ) {
    postImageLocalPath = req.files.postImage[0].path;
  }

  const uploadedImage = await uploadPostImageOnCloudinary(
    postImageLocalPath,
    user._id
  );

  const newPost = await Post.create({
    owner: user._id,
    content,
    image: {
      public_id: uploadedImage?.public_id,
      secure_url: uploadedImage?.secure_url,
    },
  });

  const post = await Post.findById(newPost._id);

  return res
    .status(201)
    .json(new ApiResponse(post, "post created succesfully"));
});

export { createPost };
