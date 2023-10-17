import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import client from "services/client";

const initialState = {
  movies: [],
  status: "idle",
  error: null,
  page: 1,
  hasMore: true,
  counter: 0,
};

export const nowPlayingSlice = createSlice({
  name: "nowPlaying",
  initialState,
  reducers: {
    pageIncrement: (state) => {
      state.page += 1;
      console.log("increment");
    },
    resetCounter: (state) => {
      state.counter = 1;
    },
    resetMovies: (state) => {
      if (state.counter === 0) {
        state.movies = [];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNowPlaying.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNowPlaying.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log("fulfilled Now Playing");

        if (state.counter >= 1) {
          console.log("full");
          state.movies = [...state.movies, ...action.payload];
        } else {
          console.log("empty");
          state.movies = action.payload;
        }

        state.counter++;

        if (action?.payload?.length === 0) {
          state.hasMore = false;
        }
      })
      .addCase(fetchNowPlaying.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const fetchNowPlaying = createAsyncThunk(
  "nowPlaying/fetchNowPlaying",
  async (page) => {
    try {
      const { data } = await client.get(`/movie/now_playing?page=${page}`);
      console.log("fetching now playing", page, data.results);
      return data.results;
    } catch (error) {
      console.log(error.message);
      throw new Error("Failed to fetch now playing movies");
    }
  }
);

export const actions = nowPlayingSlice.actions;

export default nowPlayingSlice.reducer;
