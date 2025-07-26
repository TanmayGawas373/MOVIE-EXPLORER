import React from 'react'
import { motion } from 'motion/react'
import { Search, Loader2 } from 'lucide-react'
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
        if (!searchText.trim()) return;
        dispatch(setLoading(true));
        let query:string=searchText.replace(/\s/g, '');
        const movieList = await getMoviesList2(query);
        if (movieList) {
          dispatch(setMovieList(movieList.movieList));
          setFetched(true);
          dispatch(setLoading(false));
        }
      }

      const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
          handleGetMovies();
        }
      };
    
      React.useEffect(() => {
        if (fetched) {
          console.log("🎬 Updated Movie List from Redux:", movieList);
          navigate('/search');
        }
      }, [movieList, fetched]);
    
    return (
        <div className="w-full max-w-md mx-auto">
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="relative"
          >
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <motion.input
                type="text"
                name="searchText"
                id="searchText"
                placeholder="Search for movies..."
                className='w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400/50 transition-all duration-300'
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                whileFocus={{ scale: 1.02 }}
            />
          </motion.div>
          
          <motion.button
            onClick={handleGetMovies}
            disabled={isLoading || !searchText.trim()}
            className="w-full mt-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                Search Movies
              </>
            )}
          </motion.button>
        </div>
    )
}

export default Searchbar
