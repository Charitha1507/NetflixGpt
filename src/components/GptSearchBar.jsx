import { useSelector, useDispatch } from 'react-redux';
import { languageOptions } from '../utils/Textconstants';
import {  API_OPTIONS } from "../utils/constants";
const GEMINI_KEY = import.meta.env.VITE_GEMINI_KEY;
import { useRef } from 'react';
import axios from 'axios';
import { addGptMovieResult, addGptMovieNames, setGptLoading } from '../utils/gptSlice';

const GptSearchBar = () => {
  const lang = useSelector((store) => store.lang.language);
  const loading = useSelector((store) => store.gpt.loading);
  const searchtext = useRef(null);
  const dispatch = useDispatch();

  const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent";

  // Function to search for movies on TMDB
  const searchMoviesOnTMDB = async (movieName) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(movieName)}&include_adult=false&language=en-US&page=1`,
        API_OPTIONS
      );
      const data = await response.json();
      return data.results[0] || null; // Return the first (most relevant) result
    } catch (error) {
      console.error(`Error searching for ${movieName}:`, error);
      return null;
    }
  };

  const handleSearch = async () => {
    if (loading || !searchtext.current.value.trim()) return;
    
    dispatch(setGptLoading(true));
    dispatch(addGptMovieResult([]));
    dispatch(addGptMovieNames([]));

    const prompt = `You are a movie recommendation system. Based on the user's interest described as: "${searchtext.current.value}", suggest exactly 5 movie titles only in plain JSON format as follows:\n\n{\n  "movies": ["Movie1", "Movie2", "Movie3", "Movie4", "Movie5"]\n}`;

    try {
      const response = await axios.post(
        `${GEMINI_API_URL}?key=${GEMINI_KEY}`,
        {
          contents: [{ parts: [{ text: prompt }] }]
        }
      );

      const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
      let names = [];
      
      try {
        let cleanText = text.trim();
        if (cleanText.startsWith("```")) {
          cleanText = cleanText.replace(/^```[a-zA-Z]*\n?/, "").replace(/```$/, "");
        }
        const parsed = JSON.parse(cleanText);
        names = parsed.movies;
        if (!Array.isArray(names)) throw new Error();
      } catch (e) {
        alert("Failed to parse movie list from Gemini response.");
        console.error("Gemini JSON parse error:", text);
        dispatch(setGptLoading(false));
        return;
      }

      // Store movie names in Redux
      dispatch(addGptMovieNames(names));

      // Search for each movie on TMDB
      const moviePromises = names.map(searchMoviesOnTMDB);
      const movieResults = await Promise.all(moviePromises);
      
      // Filter out null results and store in Redux
      const validMovies = movieResults.filter(movie => movie !== null);
      dispatch(addGptMovieResult(validMovies));

    } catch (error) {
      alert('Something went wrong with Gemini API.');
      console.error(error);
    } finally {
      dispatch(setGptLoading(false));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full p-6 bg-gradient-to-b from-black via-gray-900 to-black min-h-screen text-white">
      {/* Search UI */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8 w-full max-w-3xl">
        <input
          type="text"
          ref={searchtext}
          placeholder={languageOptions[lang]?.GptSearchPlaceholder || "Search for a movie theme..."}
          className="w-full p-3 border border-gray-600 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
        />
        <button
          className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? 'Loading...' : (languageOptions[lang]?.search || "Search")}
        </button>
      </div>
      {/* Movie Cards Grid */}
      <div className="w-full max-w-5xl">
        {loading && (
          <div className="text-center text-white text-xl">
            Searching for movies...
          </div>
        )}
      </div>
    </div>
  )
}

export default GptSearchBar;