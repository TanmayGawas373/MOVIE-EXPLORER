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
            <img src={movie['#IMG_POSTER']||'https://www.google.com/imgres?q=movie%20camera%20drawing&imgurl=https%3A%2F%2Fwww.shutterstock.com%2Fimage-vector%2Fretro-movie-camera-film-strip-600w-2160752449.jpg&imgrefurl=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Fvintage-drawings-old-movie-camera&docid=eS-ZWDzrykkX1M&tbnid=rYjse9aIqhs8YM&vet=12ahUKEwjZgZ20k9COAxXQia8BHb8wEhEQM3oECBEQAA..i&w=600&h=583&hcb=2&ved=2ahUKEwjZgZ20k9COAxXQia8BHb8wEhEQM3oECBEQAA'} alt={`${movie['#TITLE']} poster`} className='h-50 w-50'/>
            
          </div>
        ))
      }
    </div>
  )
}

export default SearchResults
