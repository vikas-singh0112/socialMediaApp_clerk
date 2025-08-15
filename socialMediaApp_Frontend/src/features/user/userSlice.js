import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/getuser`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.data.profileImage.secure_url);

      return {
        mongoId: response.data.data._id,
        clerkId: response.data.data.clerkId,
        name: response.data.data.name,
        email: response.data.data.email,
        followers: response.data.data.followers,
        following: response.data.data.following,
        profileImage: response.data.data.profileImage.secure_url,
      };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const initialState = {
  clerkId: null,
  mongoId: null,
  name: null,
  email: null,
  followers: [],
  following: [],
  profileImage: null,
  status: "idle", // idle | loading | succeeded | failed
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.clerkId = null;
      state.mongoId = null;
      state.name = null;
      state.email = null;
      state.followers = null;
      state.following = null;
      state.profileImage = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.clerkId = action.payload.clerkId;
        state.mongoId = action.payload.mongoId;
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.followers = action.payload.followers;
        state.following = action.payload.following;
        state.profileImage = action.payload.profileImage;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
