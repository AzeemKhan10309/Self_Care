import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../Services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
  id: string | null;
  name: string;
  username: string;
  email: string;
  phone: string;
  dob: Date | null;
  weight: number | null;
  height: number | null;
  age: number | null;
  gender: string | null;
  isProfileComplete: boolean;
  profileImage: string | null;
  role: "user" | "doctor" | "trainer" | "admin" | null;
  approved?: boolean; 
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

const mapUser = (u: any): User => ({
  id: u?._id || u?.id || null,
  name: u?.name || "",
  username: u?.username || "",
  email: u?.email || "",
  phone: u?.phone || "",
  dob: u?.dob ? new Date(u.dob) : null,
  weight: u?.weight ?? null,
  height: u?.height ?? null,
  age: u?.age ?? null,
  gender: u?.gender ?? null,
  isProfileComplete: u?.isProfileComplete ?? false,
  profileImage: u?.profileImage || null,
  role: u?.role ?? null,
  approved: u?.approved ?? false,
});

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    { name, username, email, password, phone, role, collectInfo }: any,
    { rejectWithValue }
  ) => {
    try {
      const res = await apiRequest<{
        user: any;
        token?: string;
        error?: boolean;
        message?: string;
      }>("/users/register", "POST", {
        name,
        username,
        email,
        password,
        phone,
        role,
        collectInfo,
      });

      if (res.error === true) return rejectWithValue(res.message);

      if (res.token) {
        await AsyncStorage.setItem("token", res.token);
      }

      return res.user;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }: any, { rejectWithValue }) => {
    try {
      const res = await apiRequest<{
        user: any;
        token?: string;
        error?: boolean;
        message?: string;
      }>("/users/login", "POST", { email, password });

      if (res.error === true) return rejectWithValue(res.message);

      if (res.token) {
        await AsyncStorage.setItem("token", res.token);
      } else {
        console.warn("⚠️ No token returned from API on login");
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
      const res = await apiRequest<{
        user: any;
        error?: boolean;
        message?: string;
      }>(`/users/${userId}`, "GET");

      if (res.error === true) return rejectWithValue(res.message);

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
      AsyncStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = mapUser(action.payload);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = mapUser(action.payload);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch User Info
      .addCase(fetchUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.user = mapUser(action.payload);
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
