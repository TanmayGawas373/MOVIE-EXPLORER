import { configureStore } from '@reduxjs/toolkit';
import movieReducer from '../Slices/movieSlice';

export const store = configureStore({
  reducer: {
    movie: movieReducer,
  },
});

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
