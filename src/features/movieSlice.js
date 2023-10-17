import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import client from "../services/client";

const initialState = {
  movie: {},
  status: "idle",
  error: null,
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovie.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovie.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movie = action.payload;
      })
      .addCase(fetchMovie.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const fetchMovie = createAsyncThunk("movie/fetchMovie", async (id) => {
  try {
    console.log("id", id);
    const { data } = await client.get(`/movie/${id}`);
    console.log("data", data);
    // throw new Error("Failed to fetch movie");
    return data;
  } catch (error) {
    throw new Error("Failed to fetch movie");
  }
});

export const selectMovie = (state) => state.movie;

export default movieSlice.reducer;
