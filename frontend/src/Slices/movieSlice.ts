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
  isLoading: false,
  movieList: []
};

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    setMovieList: (state, action: PayloadAction<Movie[]>) => {
      state.movieList = action.payload;
    },
    setLoading: (state,action: PayloadAction<boolean>) => {
      // reserved for other use
      state.isLoading = action.payload;
    },
  },
});

export const { setMovieList,setLoading } = movieSlice.actions;

export default movieSlice.reducer;
