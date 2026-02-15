import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';



// 1. Register Thunk
export const registerUser = createAsyncThunk('auth/register', async (userData: any, { rejectWithValue }) => {
  try {
    const response = await api.post(`/register`, userData);
    return response.data; // Success triggers the OTP Modal
  } catch (err: any) {
    return rejectWithValue(err.response.data);
  }
});

export const verifyOTP = createAsyncThunk('auth/verify', async (otpData: { email: string, code: string }, { rejectWithValue }) => {
  try {
    const response = await api.post(`/verify-code`, otpData);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err.response.data);
  }
});

export const loginUser = createAsyncThunk('auth/login', async (credentials: any, { rejectWithValue }) => {
  try {
    const response = await api.post(`/login`, credentials);
    return response.data;
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
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.access_token;
        state.user = action.payload.user;
        localStorage.setItem('token', action.payload.access_token);
      })
      .addCase(loginUser.rejected, (state, action: any) => {
        state.loading = false;
        // This ensures your Alert component in LoginPage gets the message
        state.error = action.payload?.message || 'Invalid credentials'; 
      })
      .addCase(registerUser.rejected, (state, action: any) => {
        state.error = action.payload.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;