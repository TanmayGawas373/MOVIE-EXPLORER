import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { getMoviesList2 } from '../api/getMovies';
import type { MovieList } from '../api/getMovies';
import { useDispatch, useSelector } from 'react-redux';
import { setMovieList } from '../Slices/movieSlice';

const Searchbar = () => {
    const [searchText, setSearchText] = React.useState<string>('');
    const dispatch = useDispatch();
      const movieList = useSelector((state: { movie: MovieList }) => state.movie.movieList);
      const [fetched, setFetched] = React.useState(false);
    
      async function handleGetMovies() {
        let query:string=searchText.replace(/\s/g, '');
        const movieList = await getMoviesList2(query);
        if (movieList) {
          dispatch(setMovieList(movieList.movieList));
          setFetched(true);
        }
      }
    
      React.useEffect(() => {
        if (fetched) {
          console.log("🎬 Updated Movie List from Redux:", movieList);
        }
      }, [movieList, fetched]);
    
    return (
        <div>
            <input
                type="text"
                name="searchText"
                id="searchText"
                className='border-b-black'
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
            />
            <button onClick={handleGetMovies}>click me</button>
        </div>
    )
}

export default Searchbar
