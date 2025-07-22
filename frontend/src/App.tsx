import React, { useEffect, useState } from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { getMoviesList } from './api/getMovies';
import type { MovieList } from './api/getMovies';
import { useDispatch, useSelector } from 'react-redux';
import { setMovieList } from './Slices/movieSlice';
import Searchbar from './components/Searchbar';
import SearchResults from './components/SearchResults';

function App() {
  const dispatch = useDispatch();
  const movieList = useSelector((state: { movie: MovieList }) => state.movie.movieList);
  const [fetched, setFetched] = useState(false);

  async function handleGetMovies() {
    const movieList = await getMoviesList();
    if (movieList) {
      dispatch(setMovieList(movieList.movieList));
      setFetched(true); // set flag so useEffect knows update happened
    }
  }

  // Log the updated movieList once fetched
  useEffect(() => {
    if (fetched) {
      console.log("🎬 Updated Movie List from Redux:", movieList);
    }
  }, [movieList, fetched]);

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <button
          className='p-100 border-amber-50'
          onClick={handleGetMovies}
        >
          hello
        </button>
      ),
    },
    {
      path:'/search',
      element:(
        <>
          <Searchbar/>
          <SearchResults/>
        </>
      )
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
