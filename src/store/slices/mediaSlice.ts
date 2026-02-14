import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';
import type { Movie } from '../../types/movie';

interface MovieState {
  trending: Movie[];
  popular: Movie[];
  favorites: Movie[];
  searchResult: Movie[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: MovieState = {
  trending: [],
  popular: [],
  favorites: [],
  searchResult: [],
  status: 'idle',
  error: null,
};

export const fetchTrending = createAsyncThunk('media/fetchTrending', async () => {
  const response = await api.get('/media/trending');
  return response.data; 
});

export const fetchPopular = createAsyncThunk('media/fetchPopular', async (type: string) => {
  const response = await api.get(`/media/popular/${type}`);
  return response.data;
});

export const searchMedia = createAsyncThunk('media/search', async (query: string) => {
  const response = await api.get(`/media/search?query=${query}`);
  return response.data;
});

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    resetSearch: (state) => {
      state.searchResult = [];
      state.status = 'idle';
    },
    clearSearch: (state) => {
      state.searchResult = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrending.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTrending.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.trending = action.payload;
      })
      .addCase(fetchTrending.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(fetchPopular.fulfilled, (state, action) => {
        state.popular = action.payload;
      })
      .addCase(searchMedia.fulfilled, (state, action) => {
        state.searchResult = action.payload;
      });
  },
});

export const { clearSearch,resetSearch } = movieSlice.actions;
export default movieSlice.reducer;