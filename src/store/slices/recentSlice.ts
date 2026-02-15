import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';
import type { Movie } from '../../types/movie';

// GET: Fetch the list from Laravel
export const fetchRecentList = createAsyncThunk('recent/fetchAll', async () => {
  const response = await api.get('/recentlist');
  return response.data; // Assumes Laravel returns an array of movies
});

// POST: Add to list (triggered when a user clicks a movie)
export const addToRecentServer = createAsyncThunk('recent/add', async (movie: Movie) => {
  const response = await api.post('/recentlist', {
    tmdb_id: movie.id,
    type: movie.media_type || 'movie',
    title: movie.title || movie.name,
    poster_path: movie.poster_path,
    // Add any other fields your Laravel migration requires
  });
  return response.data;
});

// DELETE: Remove specific item
export const removeFromRecent = createAsyncThunk(
  'recent/remove', 
  async ({ id, type }: { id: number; type: string }) => {
    await api.delete(`/recentlist/${type}/${id}`);
    return id;
  }
);

const recentSlice = createSlice({
  name: 'recent',
  initialState: {
    history: [] as Movie[],
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecentList.fulfilled, (state, action) => {
        state.history = action.payload;
        state.status = 'succeeded';
      })
      .addCase(addToRecentServer.fulfilled, (state, action) => {
        // Optimistically add to the front of the list
        const filtered = state.history.filter(m => m.id !== action.payload.id);
        state.history = [action.payload, ...filtered];
      })
      .addCase(removeFromRecent.fulfilled, (state, action) => {
        state.history = state.history.filter(m => m.id !== action.payload);
      });
  },
});

export default recentSlice.reducer;