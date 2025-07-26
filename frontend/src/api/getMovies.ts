export interface Movie {
  '#TITLE': string;
  '#YEAR': number;
  '#IMDB_ID': string;
  '#IMG_POSTER': string;
}

export interface MovieList {
  movieList: Movie[];
}

export interface MovieDetails {
    actors?: string;
    awards?: string;
    boxoffice?: string;
    director?: string;
    language?: string;
    rated?: string;
    released?: string;
    runtime?: string;
    imdbRating?: string;
    imdbVotes?: string;
    writer?: string;
    country?: string;
    type?: string;
  title: string;
  year?: number;
  imdbId?: string;
  imgPoster?: string;
  plot?: string;
  genre?: string;
}



export async function getMoviesList2(query:string): Promise<MovieList | undefined> {
    try{
        const response = await fetch(`https://imdb.iamidiotareyoutoo.com/search?q=${query}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                const data = await response.json();
                console.log("Search Data:", data);

                const mymovie = data.description[0]["#IMDB_ID"];
                console.log("IMDb ID:", mymovie);

                let movieList: Movie[] = data.description.map((item: any) => ({
                    '#TITLE': item['#TITLE'],
                    '#YEAR': item['#YEAR'],
                    '#IMDB_ID': item['#IMDB_ID'],
                    '#IMG_POSTER': item['#IMG_POSTER']
                }));

                return { movieList };
    }
    catch (error) {
        console.error('Error fetching movies:', error);
    }
}

export async function getMovieDetails(imdbId: string): Promise<MovieDetails | undefined> {
    try {
        const response = await fetch(`https://www.omdbapi.com/?i=${imdbId}&apikey=c1dce2ce&plot=full`);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const data = await response.json();
        console.log("Movie Details Data:", data);

        return {
            title: data.Title,
            plot: data.Plot,
            genre: data.Genre,
            imgPoster: data.Poster,
            actors: data.Actors,
            awards: data.Awards,
            boxoffice: data.BoxOffice,
            director: data.Director,
            runtime: data.Runtime,
            country: data.Country,
            language: data.Language,
            rated: data.Rated,
            released: data.Released,
            imdbRating: data.imdbRating,
            imdbVotes: data.imdbVotes,
            type: data.Type,
            year: data.Year,
            imdbId: data.imdbID,
        };
    } catch (error) {
        console.error('Error fetching movie details:', error);
    }
}