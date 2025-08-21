import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../Services/api";

interface AuthState {
  user: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    {
      name,
      username,
      email,
      password,
      phone,
      collectInfo,
    }: {
      name: string;
      username: string;
      email: string;
      password: string;
      phone: string;
      collectInfo: any;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await apiRequest<{ user: any; token: string }>(
        "/users/register",
        "POST",
        { name, username, email, password, phone, collectInfo }
      );

      if ("error" in res) {
        return rejectWithValue(res.message);
      }

      return res.user;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await apiRequest<{ user: any; token: string }>(
        "/users/login",
        "POST",
        { email, password }
      );

      if ("error" in res) {
        return rejectWithValue(res.message);
      }

      return res.user;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchUserInfo = createAsyncThunk(
  "auth/fetchUserInfo",
  async (userId: string, { rejectWithValue }) => {
    try {
      const res = await apiRequest<{ user: any }>("/users/${userId}", "GET");

      if ("error" in res) {
        return rejectWithValue(res.message);
      }

      return res.user;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async (
    { userId, data }: { userId: string; data: any },
    { rejectWithValue }
  ) => {
    try {
      const res = await apiRequest<{ user: any }>(
        `/users/${userId}`,
        "PUT",   
        data
      );

      if ("error" in res) {
        return rejectWithValue(res.message);
      }

      return res.user; 
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      .addCase(fetchUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // update redux user with latest data
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
