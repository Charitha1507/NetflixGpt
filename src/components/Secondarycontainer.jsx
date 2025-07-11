import MovieList from './MovieList'; 
import { useEffect, useState } from 'react';
import { API_OPTIONS } from '../utils/constants';
import {GENRE_URL} from '../utils/constants';

const MOVIES_BY_GENRE_URL = (genreId) => 
  `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&page=1`;

const Secondarycontainer = () => {
  const [genre, setGenre] = useState([]);
  const [genreMovies, setGenreMovies] = useState({});

  // Fetch genres
  const movielist = async () => {
    try {
      const genreRes = await fetch(GENRE_URL, API_OPTIONS);
      const json = await genreRes.json();
      console.log("All genres from API:", json.genres);
      
      // Let's use the actual genre names from TMDB API
      const allowedGenres = [
        "Romance",
        "Action",
        "Adventure",
        "Comedy",
        "Thriller",
        "Science Fiction",
        "Drama",
        "Horror",
        "Animation",
        "Family"
      ];
      
      // First, let's see what genres are actually available
      const availableGenres = json.genres || [];
      console.log("Available genre names:", availableGenres.map(g => g.name));
      
      // Filter the genres array to only include allowed genres
      const filteredGenres = availableGenres.filter(g => allowedGenres.includes(g.name));
      console.log("Filtered genres:", filteredGenres);
      
      // If no genres match, let's use the first few available genres
      if (filteredGenres.length === 0) {
        console.log("No matching genres found, using first 6 available genres");
        const fallbackGenres = availableGenres.slice(0, 6);
        setGenre(fallbackGenres);
      } else {
        setGenre(filteredGenres);
      }
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  // Fetch movies for a genre
  const getMoviesByGenre = async (genreId) => {
    try {
      console.log(`Fetching movies for genre ID: ${genreId}`);
      const moviesRes = await fetch(MOVIES_BY_GENRE_URL(genreId), API_OPTIONS);
      const moviesJson = await moviesRes.json();
      console.log(`Movies for genre ${genreId}:`, moviesJson.results?.length || 0, "movies found");
      return moviesJson.results || [];
    } catch (error) {
      console.error(`Error fetching movies for genre ${genreId}:`, error);
      return [];
    }
  };

  // Fetch all genres and their movies
  useEffect(() => {
    movielist();
  }, []);

  useEffect(() => {
    const fetchAllGenreMovies = async () => {
      console.log("Fetching movies for all genres:", genre);
      const moviesByGenre = {};
      for (const g of genre) {
        console.log(`Fetching movies for genre: ${g.name} (ID: ${g.id})`);
        moviesByGenre[g.name] = await getMoviesByGenre(g.id);
      }
      console.log("Final genre movies object:", moviesByGenre);
      setGenreMovies(moviesByGenre);
    };
    if (genre.length > 0) {
      console.log("Genre array updated, fetching movies for", genre.length, "genres");
      fetchAllGenreMovies();
    }
  }, [genre]);

  return (
    <div>
      {console.log("Rendering Secondarycontainer with:", { genreCount: genre.length, genreMoviesKeys: Object.keys(genreMovies) })}
      {genre.map((g) => (
        <MovieList key={g.id} title={g.name} movies={genreMovies[g.name] || []} />
      ))}
    </div>
  )
}

export default Secondarycontainer;