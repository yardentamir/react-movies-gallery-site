import { configureStore } from "@reduxjs/toolkit";
import favoriteReducer from "features/favoritesSlice";
import movieReducer from "features/movieSlice";
import nowPlayingReducer from "features/nowPlayingSlice";
import popularReducer from "features/popularSlice";

const store = configureStore({
  reducer: {
    popular: popularReducer,
    favorite: favoriteReducer,
    movie: movieReducer,
    nowPlaying: nowPlayingReducer,
  },
});

export default store;
