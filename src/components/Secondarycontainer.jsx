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
    const genreRes = await fetch(GENRE_URL, API_OPTIONS);
    const json = await genreRes.json();
    console.log(json);
    const allowedGenres = [
      "Romance",
      "Popular",
      "Action",
      "Adventure",
      "Comedy",
      "Thriller",
      "Science Fiction"
    ];
    // Filter the genres array to only include allowed genres
    const filteredGenres = (json.genres || []).filter(g => allowedGenres.includes(g.name));
    setGenre(filteredGenres);
  };

  // Fetch movies for a genre
  const getMoviesByGenre = async (genreId) => {
    const moviesRes = await fetch(MOVIES_BY_GENRE_URL(genreId), API_OPTIONS);
    const moviesJson = await moviesRes.json();
    return moviesJson.results || [];
  };

  // Fetch all genres and their movies
  useEffect(() => {
    movielist();
  }, []);

  useEffect(() => {
    const fetchAllGenreMovies = async () => {
       const moviesByGenre = {};
      for (const g of genre) {
        moviesByGenre[g.name] = await getMoviesByGenre(g.id);
      }
      setGenreMovies(moviesByGenre);
    };
    if (genre.length > 0) fetchAllGenreMovies();
  }, [genre]);

  return (
    <div>
      {genre.map((g) => (
        <MovieList key={g.id} title={g.name} movies={genreMovies[g.name] || []} />
      ))}
    </div>
  )
}

export default Secondarycontainer;