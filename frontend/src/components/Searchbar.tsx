import React from 'react'
import { motion } from 'motion/react'
import { Search, Loader2, X } from 'lucide-react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getMoviesList2 } from '../api/getMovies';
import type { MovieList } from '../api/getMovies';
import { useDispatch, useSelector } from 'react-redux';
import { setMovieList,setLoading } from '../Slices/movieSlice';

const Searchbar = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const queryFromUrl = searchParams.get('q') || '';
    const [searchText, setSearchText] = React.useState<string>(queryFromUrl);
    const [suggestions, setSuggestions] = React.useState<any[]>([]);
    const [showSuggestions, setShowSuggestions] = React.useState(false);
    const [suggestionLoading, setSuggestionLoading] = React.useState(false);
    const dispatch = useDispatch();
    const navigate=useNavigate();
      const movieList = useSelector((state: { movie: MovieList }) => state.movie.movieList);
      const isLoading = useSelector((state: { movie: { isLoading: boolean } }) => state.movie.isLoading);
      const [fetched, setFetched] = React.useState(false);
    
      async function handleGetMovies() {
        if (!searchText.trim()) return;
        dispatch(setLoading(true));
        setShowSuggestions(false);
        let query:string=searchText.replace(/\s/g, '');
        
        // Update URL with search query
        setSearchParams({ q: searchText.trim() });
        
        const movieList = await getMoviesList2(query);
        if (movieList) {
          dispatch(setMovieList(movieList.movieList));
          setFetched(true);
          dispatch(setLoading(false));
        }
      }

      async function fetchSuggestions(query: string) {
        if (!query.trim() || query.length < 2) {
          setSuggestions([]);
          setShowSuggestions(false);
          return;
        }
        
        setSuggestionLoading(true);
        try {
          const cleanQuery = query.replace(/\s/g, '');
          const movieList = await getMoviesList2(cleanQuery);
          if (movieList && movieList.movieList) {
            setSuggestions(movieList.movieList.slice(0, 5)); // Show only first 5 suggestions
            setShowSuggestions(true);
          }
        } catch (error) {
          console.error('Error fetching suggestions:', error);
        } finally {
          setSuggestionLoading(false);
        }
      }

      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchText(value);
        
        // Debounce suggestions
        const timeoutId = setTimeout(() => {
          fetchSuggestions(value);
        }, 300);
        
        return () => clearTimeout(timeoutId);
      };

      const handleSuggestionClick = (suggestion: any) => {
        setSearchText(suggestion['#TITLE']);
        setShowSuggestions(false);
        // Trigger search with selected suggestion
        setTimeout(() => {
          handleGetMovies();
        }, 100);
      };

      const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
          handleGetMovies();
        } else if (e.key === 'Escape') {
          setShowSuggestions(false);
        }
      };
    
      React.useEffect(() => {
        if (fetched) {
          console.log("🎬 Updated Movie List from Redux:", movieList);
          navigate(`/search?q=${encodeURIComponent(searchText.trim())}`);
        }
      }, [movieList, fetched]);

      // Load search results if URL has query parameter
      React.useEffect(() => {
        if (queryFromUrl && queryFromUrl !== searchText) {
          setSearchText(queryFromUrl);
          // Auto-search if we're on search page with query
          if (window.location.pathname === '/search') {
            const timeoutId = setTimeout(() => {
              handleGetMovies();
            }, 100);
            return () => clearTimeout(timeoutId);
          }
        }
      }, [queryFromUrl]);
    
    return (
        <div className="w-full max-w-md mx-auto relative">
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
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                onFocus={() => {
                  if (suggestions.length > 0) {
                    setShowSuggestions(true);
                  }
                }}
                disabled={isLoading}
                whileFocus={{ scale: 1.02 }}
            />
            
            {/* Clear button */}
            {searchText && (
              <button
                onClick={() => {
                  setSearchText('');
                  setSuggestions([]);
                  setShowSuggestions(false);
                  setSearchParams({});
                }}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </motion.div>

          {/* Suggestions dropdown */}
          {showSuggestions && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 mt-2 glass rounded-2xl border border-white/20 overflow-hidden z-50"
            >
              {suggestionLoading ? (
                <div className="p-4 text-center">
                  <Loader2 className="w-5 h-5 animate-spin mx-auto text-purple-400" />
                  <p className="text-slate-300 text-sm mt-2">Loading suggestions...</p>
                </div>
              ) : suggestions.length > 0 ? (
                <div className="max-h-80 overflow-y-auto">
                  {suggestions.map((suggestion, index) => (
                    <motion.div
                      key={suggestion['#IMDB_ID']}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="flex items-center gap-3 p-4 hover:bg-white/10 cursor-pointer transition-colors border-b border-white/10 last:border-b-0"
                    >
                      <img
                        src={suggestion['#IMG_POSTER'] || 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=100'}
                        alt={suggestion['#TITLE']}
                        className="w-12 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-medium truncate">
                          {suggestion['#TITLE']}
                        </h4>
                        <p className="text-slate-400 text-sm">
                          {suggestion['#YEAR']}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center">
                  <p className="text-slate-300 text-sm">No suggestions found</p>
                </div>
              )}
            </motion.div>
          )}
          
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
          
          {/* Click outside to close suggestions */}
          {showSuggestions && (
            <div
              className="fixed inset-0 z-40"
              onClick={() => setShowSuggestions(false)}
            />
          )}
        </div>
    )
}

export default Searchbar