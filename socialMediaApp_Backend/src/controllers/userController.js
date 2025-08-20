import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/userModel.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";

//because we are using clerk, soo create user login user and get user all these are written in one identifyuser = it works as if there is already a user it will give the userinfo other wise it will create new user and then give user info

const getUser = asyncHandler(async (req, res) => {
  const { userId, sessionClaims } = req.auth();

  if (!userId || !sessionClaims) {
    throw new ApiError(400, "user_id or sessionClaims unavailable");
  }

  const email = sessionClaims.email;
  const firstName = sessionClaims.first_name;
  const lastName = sessionClaims.last_name;

  const fullName = `${firstName} ${lastName}`.toLowerCase();

  let user = await User.findOne({ clerkId: userId });

  if (!user) {
    user = await User.create({
      clerkId: userId,
      email,
      fullName,
    });

    // check if user is created successfully
    if (!user) {
      throw new ApiError(403, "unable to create user");
    }

    return res
      .status(201)
      .json(new ApiResponse(user, "user created successfully"));
  }

  return res
    .status(200)
    .json(new ApiResponse(user, "user fetched successfully"));
});

export { getUser };
