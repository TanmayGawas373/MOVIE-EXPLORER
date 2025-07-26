import React from 'react';
import { useSelector } from 'react-redux';
import type { MovieList } from '../api/getMovies';
import Card from './Card';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Progress } from './ui/progress';

const SearchResults = () => {
  const isLoading = useSelector((state: { movie: { isLoading: boolean } }) => state.movie.isLoading);
  const movieList = useSelector((state: { movie: MovieList }) => state.movie.movieList);

  return (
    <div className="mt-3 flex flex-col items-center">
      {isLoading ? (
        <div className="w-full max-w-2xl mx-auto mb-6">
          <Progress value={33} className="h-2 bg-gray-200 dark:bg-gray-800" />
          <p className="text-center mt-2 text-sm text-muted-foreground">Loading search results...</p>
        </div>
      ) : (
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {movieList.map((movie, index) => (
            <div key={index}>
              <Link to={`/movie/${movie['#IMDB_ID']}`}>
                <Card title={movie['#TITLE']} image={movie['#IMG_POSTER']} year={movie['#YEAR']} />
              </Link>
              <Button className="mt-2">Hello</Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
