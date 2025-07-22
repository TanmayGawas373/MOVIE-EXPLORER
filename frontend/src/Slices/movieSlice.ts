import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Movie {
  '#TITLE': string;
  '#YEAR': number;
  '#IMDB_ID': string;
  '#IMG_POSTER': string;
}

export interface MovieState {
  movieList: Movie[];
  isLoading: boolean;
}

const initialState: MovieState = {
  isLoading: true,
  movieList: []
};

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    setMovieList: (state, action: PayloadAction<Movie[]>) => {
      state.movieList = action.payload;
    },
    decrement: (state) => {
      // reserved for other use
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      // reserved for other use
    },
  },
});

export const { setMovieList, decrement, incrementByAmount } = movieSlice.actions;

export default movieSlice.reducer;
