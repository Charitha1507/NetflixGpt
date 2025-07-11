import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  console.log(`MovieList - ${title}:`, { title, moviesCount: movies?.length || 0, movies });
  
  return (
    <div className="px-6 ">
      <h1 className="text-lg md:text-3xl py-4 text-white">{title}</h1>
      <div className="flex overflow-x-scroll">
        <div className="flex flex-col">
          <h1 className="text-lg md:text-3xl py-4 text-black-500 font-bold">{title}</h1>
         <div className="flex">
           {movies?.map((movie) => (
            <MovieCard key={movie.id} posterPath={movie.poster_path} />
          ))}
         </div>
        </div>
      </div>
    </div>
  );
};
export default MovieList;