import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://your-laravel-api.test/api';

// 1. Register Thunk
export const registerUser = createAsyncThunk('auth/register', async (userData: any, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data; // Success triggers the OTP Modal
  } catch (err: any) {
    return rejectWithValue(err.response.data);
  }
});

// 2. OTP Verification Thunk
export const verifyOTP = createAsyncThunk('auth/verify', async (otpData: { email: string, code: string }, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/verify-code`, otpData);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response.data);
  }
});

// 3. Login Thunk
export const loginUser = createAsyncThunk('auth/login', async (credentials: any, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data; // Contains 'access_token'
  } catch (err: any) {
    return rejectWithValue(err.response.data);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token'),
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.token = action.payload.access_token;
        state.user = action.payload.user;
        localStorage.setItem('token', action.payload.access_token);
      })
      .addCase(registerUser.rejected, (state, action: any) => {
        state.error = action.payload.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;