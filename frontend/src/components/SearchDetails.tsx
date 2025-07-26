import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Globe,
  Star,
  Award,
  DollarSign,
  Users,
  Film,
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetails } from '../api/getMovies';
import type { MovieDetails } from '../api/getMovies';

const SearchDetails = () => {
  const { id } = useParams<{ id: string | undefined }>();
  const navigate = useNavigate();
  const [movieDetails, setMovieDetails] = React.useState<MovieDetails>();
  const [loading, setLoading] = React.useState(true);

  async function fetchMovieDetails(movieId: string) {
    if (!movieId) {
      console.error('No movie ID provided.');
      return;
    }
    setLoading(true);
    const details = await getMovieDetails(movieId);
    console.log('Movie Details:', details);
    setMovieDetails(details);
    setLoading(false);
  }

  React.useEffect(() => {
    if (id) {
      fetchMovieDetails(id);
    }
  }, [id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {loading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-center min-h-screen"
        >
          <div className="glass rounded-2xl p-8 text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="w-16 h-16 mx-auto mb-4"
            >
              <Film className="w-full h-full text-purple-400" />
            </motion.div>
            <p className="text-white text-lg">Loading movie details...</p>
          </div>
        </motion.div>
      ) : movieDetails ? (
        <div className="container mx-auto px-4 py-8">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors duration-200 mb-8"
            whileHover={{ x: -5 }}
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Results
          </motion.button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Poster */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1"
            >
              <div className="glass rounded-2xl p-6 sticky top-8">
                <motion.img
                  src={
                    movieDetails.imgPoster ||
                    'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=600'
                  }
                  alt={movieDetails.title + ' poster'}
                  className="w-full rounded-xl shadow-2xl"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />

                {movieDetails.imdbRating && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: 'spring' }}
                    className="flex items-center justify-center gap-2 mt-4 bg-yellow-500/20 rounded-xl p-3"
                  >
                    <Star className="w-6 h-6 text-yellow-400 fill-current" />
                    <span className="text-2xl font-bold text-white">
                      {movieDetails.imdbRating}
                    </span>
                    <span className="text-slate-300">/10</span>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2 space-y-6"
            >
              <motion.div className="glass rounded-2xl p-8">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl md:text-5xl font-bold text-white mb-4 gradient-text"
                >
                  {movieDetails.title}
                </motion.h1>

                <motion.div className="flex flex-wrap items-center gap-4 text-slate-300">
                  {movieDetails.year && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      <span>{movieDetails.year}</span>
                    </div>
                  )}
                  {movieDetails.runtime && (
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      <span>{movieDetails.runtime}</span>
                    </div>
                  )}
                  {movieDetails.rated && (
                    <span className="bg-purple-600/30 px-3 py-1 rounded-full text-sm">
                      {movieDetails.rated}
                    </span>
                  )}
                </motion.div>
              </motion.div>

              {movieDetails.plot && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="glass rounded-2xl p-8"
                >
                  <h2 className="text-2xl font-bold text-white mb-4">Plot</h2>
                  <p className="text-slate-300 leading-relaxed text-lg">
                    {movieDetails.plot}
                  </p>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="glass rounded-2xl p-8"
              >
                <h2 className="text-2xl font-bold text-white mb-6">
                  Movie Information
                </h2>
                <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { icon: Film, label: 'Genre', value: movieDetails.genre },
                    { icon: Users, label: 'Director', value: movieDetails.director },
                    { icon: Users, label: 'Actors', value: movieDetails.actors },
                    { icon: Globe, label: 'Language', value: movieDetails.language },
                    { icon: Globe, label: 'Country', value: movieDetails.country },
                    { icon: Calendar, label: 'Released', value: movieDetails.released },
                    { icon: Award, label: 'Awards', value: movieDetails.awards },
                    {
                      icon: DollarSign,
                      label: 'Box Office',
                      value: movieDetails.boxoffice,
                    },
                  ].map(
                    (item, index) =>
                      item.value && (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.7 + index * 0.1 }}
                          className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/10"
                        >
                          <item.icon className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-slate-400 text-sm font-medium">
                              {item.label}
                            </p>
                            <p className="text-white">{item.value}</p>
                          </div>
                        </motion.div>
                      )
                  )}
                </motion.div>
              </motion.div>

              {(movieDetails.imdbRating || movieDetails.imdbVotes) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="glass rounded-2xl p-8"
                >
                  <h2 className="text-2xl font-bold text-white mb-6">
                    IMDb Statistics
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {movieDetails.imdbRating && (
                      <div className="flex items-center gap-4 p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
                        <Star className="w-8 h-8 text-yellow-400 fill-current" />
                        <div>
                          <p className="text-slate-400 text-sm">IMDb Rating</p>
                          <p className="text-2xl font-bold text-white">
                            {movieDetails.imdbRating}/10
                          </p>
                        </div>
                      </div>
                    )}
                    {movieDetails.imdbVotes && (
                      <div className="flex items-center gap-4 p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                        <Users className="w-8 h-8 text-blue-400" />
                        <div>
                          <p className="text-slate-400 text-sm">Total Votes</p>
                          <p className="text-2xl font-bold text-white">
                            {movieDetails.imdbVotes}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-center min-h-screen"
        >
          <div className="glass rounded-2xl p-8 text-center max-w-md">
            <Film className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Movie Not Found</h2>
            <p className="text-slate-300 mb-4">
              Sorry, we couldn't find the details for this movie.
            </p>
            <motion.button
              onClick={() => navigate(-1)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-xl transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Go Back
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SearchDetails;
