import React from 'react';
import { useSelector } from 'react-redux';
import type { MovieList } from '../api/getMovies';

const SearchResults = () => {
    const isLoading = useSelector((state: { movie: { isLoading: boolean } }) => state.movie.isLoading);
    const movieList = useSelector((state: { movie: MovieList }) => state.movie.movieList);
  return (
    <div  className="grid grid-cols-3 mt-3 gap-5">
      {
        movieList.map((movie, index) => (
          <div key={index}>
            
                <h3>{movie['#TITLE']} ({movie['#YEAR']})</h3>
            <p>IMDb ID: {movie['#IMDB_ID']}</p>
            <img src={movie['#IMG_POSTER']} alt={`${movie['#TITLE']} poster`} className='h-50 w-50'/>
            
          </div>
        ))
      }
    </div>
  )
}

export default SearchResults
