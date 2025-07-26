import React from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails } from '../api/getMovies';
import type { MovieDetails } from '../api/getMovies';

const SearchDetails = () => {
    const { id } = useParams<{ id: string|undefined }>();
    const [movieDetails, setMovieDetails] = React.useState<MovieDetails>();
    async function fetchMovieDetails(movieId: string) {
        if (!movieId) {
            console.error("No movie ID provided.");
            return;
        }
        const details = await getMovieDetails(movieId);
        console.log("Movie Details:", details);
        setMovieDetails(details);
    }
    React.useEffect(() => {
        if (id) {
            fetchMovieDetails(id);
        }
    }, [id]);
  return (
    <div>
        {movieDetails ? (
            <div className='flex flex-col items-center p-4'>
                <img src={movieDetails.imgPoster} alt={movieDetails.title+' poster'} />
            <h1 className='text-3xl font-bold'>{movieDetails.title}</h1>
            <p className='text-lg'>{movieDetails.year}</p>
            
            <p>Genre: {movieDetails.genre}</p>
            <p>IMDb ID: {id}</p>
            <p>Director: {movieDetails.director}</p>
            <p>Actors: {movieDetails.actors}</p>
            <p>Runtime: {movieDetails.runtime}</p>
            <p>Language: {movieDetails.language}</p>
            <p>Country: {movieDetails.country}</p>
            <p>Rated: {movieDetails.rated}</p>
            <p>Released: {movieDetails.released}</p>
            <p>Awards: {movieDetails.awards}</p>
            <p>Box Office: {movieDetails.boxoffice}</p>
            <p>IMDb Rating: {movieDetails.imdbRating}</p>
            <p>IMDb Votes: {movieDetails.imdbVotes}</p>
            <p>Type: {movieDetails.type}</p>
            <p>{movieDetails.plot}</p>
            </div>
        ) : (
            <p>Loading...</p>
        )}
    </div>
  )
}

export default SearchDetails
