import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Film } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { MovieList } from '../api/getMovies';
import Card from './Card';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Progress } from './ui/progress';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const isLoading = useSelector((state: { movie: { isLoading: boolean } }) => state.movie.isLoading);
  const movieList = useSelector((state: { movie: MovieList }) => state.movie.movieList);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <motion.button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors duration-200"
            whileHover={{ x: -5 }}
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Search
          </motion.button>
          
          <div className="flex items-center gap-2">
            <Film className="w-6 h-6 text-purple-400" />
            <h1 className="text-2xl font-bold text-white">
              {query ? `Results for "${query}"` : 'Search Results'}
            </h1>
          </div>
        </motion.div>

      {isLoading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center min-h-[400px]"
        >
          <div className="glass rounded-2xl p-8 max-w-md w-full text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 mx-auto mb-4"
            >
              <Film className="w-full h-full text-purple-400" />
            </motion.div>
            <h3 className="text-xl font-semibold text-white mb-2">
              {query ? `Searching for "${query}"` : 'Searching Movies'}
            </h3>
            <p className="text-slate-300 mb-4">Finding the best matches...</p>
            <Progress value={75} className="h-2" />
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {movieList.length === 0 ? (
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="glass rounded-2xl p-12 text-center max-w-md mx-auto"
            >
              <Film className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                {query ? `No results found for "${query}"` : 'No Results Found'}
              </h3>
              <p className="text-slate-300">Try searching with different keywords</p>
            </motion.div>
          ) : (
            <>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-slate-300 text-center mb-8"
              >
                Found {movieList.length} movie{movieList.length !== 1 ? 's' : ''} 
                {query && ` for "${query}"`}
              </motion.p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {movieList.map((movie, index) => (
                  <motion.div
                    key={movie['#IMDB_ID']}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <Link to={`/movie/${movie['#IMDB_ID']}?from=${encodeURIComponent(query)}`}>
                      <Card 
                        title={movie['#TITLE']} 
                        image={movie['#IMG_POSTER']} 
                        year={movie['#YEAR']} 
                      />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </motion.div>
      )}
      </div>
    </div>
  );
};

export default SearchResults;
