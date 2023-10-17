import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import client from "../services/client";

const initialState = {
  movies: [],
  ids: [],
  status: "idle",
  error: null,
  hasMore: true,
  counter: 0,
};

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    resetCounter: (state) => {
      console.log("resting counter");
      state.counter = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.status = "succeeded";

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
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const fetchFavorites = createAsyncThunk(
  "popular/fetchFavorites",
  async ({ favoritesIds, newIds }, { getState }) => {
    const state = getState().favorite;
    if (favoritesIds?.length <= 0 || !favoritesIds) return null;
    const containsAllValues = newIds?.every((value) =>
      favoritesIds.includes(value)
    );
    if (containsAllValues && state.counter > 1) return state.movies;

    console.log("new ids", newIds);
    const res = await Promise.all(
      newIds.map(async (id) => {
        try {
          const response = await client.get(`/movie/${id}`);
          return response.data;
        } catch (error) {
          console.error(`Error fetching movie with ID ${id}:`, error);
        }
      })
    );
    return res;
  }
);

export const actions = favoriteSlice.actions;

export default favoriteSlice.reducer;
