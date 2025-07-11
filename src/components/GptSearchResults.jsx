import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptSearchResults = () => {
  const { movieResults, movieNames, loading } = useSelector((store) => store.gpt);
  
  if (loading) {
    return (
      <div className="p-4 m-4 bg-black text-white bg-opacity-90">
        <div className="text-center text-xl">Searching for movies...</div>
      </div>
    );
  }

  if (!movieNames || movieNames.length === 0) {
    return (
      <div className="p-4 m-4 bg-black text-white bg-opacity-90">
        <div className="text-center text-xl">No search results yet. Try searching for a movie theme!</div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white">
      <h2 className="text-2xl font-bold mb-6 text-center py-4">GPT Movie Recommendations</h2>
      <div>
        <MovieList 
          title="Recommended Movies" 
          movies={movieResults} 
        />
      </div>
    </div>
  );
};

export default GptSearchResults;