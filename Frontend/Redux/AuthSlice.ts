import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiRequest } from "../Services/api";

interface AuthState {
  user: any | null;
  loading: boolean;
  error: string | null;
  usernameAvailable: boolean | null;
  suggestions?: string[];
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  usernameAvailable: null,
  suggestions: [],
};

// ==================== REGISTER ====================
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

      if ("error" in res) return rejectWithValue(res.message);

      // ✅ Store token
      await AsyncStorage.setItem("token", res.token);

      return res.user;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// ==================== LOGIN ====================
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

      if ("error" in res) return rejectWithValue(res.message);

      // ✅ Store token
      await AsyncStorage.setItem("token", res.token);

      return res.user;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// ==================== FETCH USER INFO ====================
export const fetchUserInfo = createAsyncThunk(
  "auth/fetchUserInfo",
  async (userId: string, { rejectWithValue }) => {
    try {
      const res = await apiRequest<{ user: any }>(`/users/${userId}`, "GET");

      if ("error" in res) return rejectWithValue(res.message);

      return res.user;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// ==================== CHECK USERNAME ====================
// Public endpoint, token not required
export const checkUsername = createAsyncThunk(
  "auth/checkUsername",
  async (username: string, { rejectWithValue }) => {
    try {
      const res = await apiRequest<{ available: boolean; suggestions?: string[] }>(
        `/users/check-username?username=${username}`,
        "GET",
        null,
        true
      );

      if ("error" in res) return rejectWithValue(res.message);

      return res; // { available, suggestions? }
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
      state.usernameAvailable = null;
      state.suggestions = [];
      AsyncStorage.removeItem("token"); // ✅ remove token on logout
    },
  },
  extraReducers: (builder) => {
    builder
      // REGISTER
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

      // LOGIN
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

      // FETCH USER INFO
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

      // CHECK USERNAME
      .addCase(checkUsername.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.usernameAvailable = null;
        state.suggestions = [];
      })
      .addCase(checkUsername.fulfilled, (state, action) => {
        state.loading = false;
        state.usernameAvailable = action.payload.available;
        state.suggestions = action.payload.suggestions || [];
      })
      .addCase(checkUsername.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.usernameAvailable = null;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
