export interface Movie {
  '#TITLE': string;
  '#YEAR': number;
  '#IMDB_ID': string;
  '#IMG_POSTER': string;
}

export interface MovieList {
  movieList: Movie[];
}

export async function getMoviesList(): Promise<MovieList | undefined> {
    try{
        const response = await fetch('https://imdb.iamidiotareyoutoo.com/search?q=attackontitan');
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