import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import mediaReducer from './slices/mediaSlice';
import recentReducer from './slices/recentSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    media: mediaReducer,
    recent: recentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;