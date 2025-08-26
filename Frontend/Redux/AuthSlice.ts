import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../Services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

const mapUser = (u: any) => ({
  id: u._id || u.id || null,
  name: u.name || "",
  username: u.username || "",
  email: u.email || "",
  phone: u.phone || "",
  dob: u.dob ? new Date(u.dob) : null,
  weight: u.weight ?? null,
  height: u.height ?? null,
  age: u.age ?? null,
  gender: u.gender ?? null,
  isProfileComplete: u.isProfileComplete ?? false,
   profileImage: u.profileImage || null,
});

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    { name, username, email, password, phone, collectInfo }: any,
    { rejectWithValue }
  ) => {
    try {
      const res = await apiRequest<{ user: any; token?: string }>(
        "/users/register",
        "POST",
        { name, username, email, password, phone, collectInfo }
      );

      if ("error" in res) return rejectWithValue(res.message);

      if (res.token) {
        await AsyncStorage.setItem("token", res.token);
      } else {
        console.warn("No token returned from API on registration");
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
      const res = await apiRequest<{ user: any; token?: string }>(
        "/users/login",
        "POST",
        { email, password }
      );

      if ("error" in res) return rejectWithValue(res.message);

      if (res.token) {
        await AsyncStorage.setItem("token", res.token);

      } else {
        console.warn("No token returned from API on login");
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
      const res = await apiRequest(`/users/${userId}`, "GET");
      if ("error" in res) return rejectWithValue(res.message);

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
