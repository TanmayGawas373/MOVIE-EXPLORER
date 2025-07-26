import React from 'react'
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom';
import { getMoviesList2 } from '../api/getMovies';
import type { MovieList } from '../api/getMovies';
import { useDispatch, useSelector } from 'react-redux';
import { setMovieList,setLoading } from '../Slices/movieSlice';

const Searchbar = () => {
    const [searchText, setSearchText] = React.useState<string>('');
    const dispatch = useDispatch();
    const navigate=useNavigate();
      const movieList = useSelector((state: { movie: MovieList }) => state.movie.movieList);
      const isLoading = useSelector((state: { movie: { isLoading: boolean } }) => state.movie.isLoading);
      const [fetched, setFetched] = React.useState(false);
    
      async function handleGetMovies() {
        dispatch(setLoading(true));
        let query:string=searchText.replace(/\s/g, '');
        const movieList = await getMoviesList2(query);
        if (movieList) {
          dispatch(setMovieList(movieList.movieList));
          setFetched(true);
          dispatch(setLoading(false));
        }
      }
    
      React.useEffect(() => {
        if (fetched) {
          console.log("🎬 Updated Movie List from Redux:", movieList);
          navigate('/search');
        }
      }, [movieList, fetched]);
    
    return (
        <div>
            <input
                type="text"
                name="searchText"
                id="searchText"
                className='border-black box-border border-1 rounded-3xl p-3'
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
            />
            <button onClick={handleGetMovies}>click me</button>
        </div>
    )
}

export default Searchbar
