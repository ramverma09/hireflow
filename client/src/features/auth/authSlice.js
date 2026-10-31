import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import * as authService from "../../services/authService";
import { getErrorMessage } from "../../utils/getErrorMessage";

// Each thunk catches errors and returns a plain string with rejectWithValue,
// so components can show it in a toast without worrying about Axios internals.

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      return await authService.getMe();
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (payload, { rejectWithValue }) => {
    try {
      return await authService.register(payload);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (payload, { rejectWithValue }) => {
    try {
      return await authService.login(payload);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

const initialState = {
  user: null,
  isInitialized: false, // becomes true once the first /me check finishes
  isSubmitting: false, // true while login/register request is running
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Session restore. A 401 here is normal for guests, not an "error".
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isInitialized = true;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.user = null;
        state.isInitialized = true;
      })
      // Even if the logout request fails, clear the user locally.
      .addMatcher(isAnyOf(logoutUser.fulfilled, logoutUser.rejected), (state) => {
        state.user = null;
      })
      .addMatcher(isAnyOf(loginUser.pending, registerUser.pending), (state) => {
        state.isSubmitting = true;
      })
      .addMatcher(isAnyOf(loginUser.rejected, registerUser.rejected), (state) => {
        state.isSubmitting = false;
      })
      .addMatcher(
        isAnyOf(loginUser.fulfilled, registerUser.fulfilled),
        (state, action) => {
          state.isSubmitting = false;
          state.user = action.payload;
        }
      );
  },
});

export default authSlice.reducer;