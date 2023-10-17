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

export const popularSlice = createSlice({
  name: "popular",
  initialState,
  reducers: {
    pageIncrement: (state) => {
      state.page += 1;
    },
    resetCounter: (state) => {
      state.counter = 2;
    },
    resetMovies: (state) => {
      if (state.counter === 0) {
        state.movies = [];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopular.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPopular.fulfilled, (state, action) => {
        state.status = "succeeded";

        console.log("fulfilled popular");

        if (state.counter >= 2) {
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
      .addCase(fetchPopular.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const fetchPopular = createAsyncThunk(
  "popular/fetchPopular",
  async (page) => {
    try {
      const { data } = await client.get(`/movie/popular?page=${page}`);
      console.log("fetching popular...", page);
      return data.results;
    } catch (error) {
      console.log(error.message);
      throw new Error("Failed to fetch popular movies");
    }
  }
);

export const actions = popularSlice.actions;

export default popularSlice.reducer;
