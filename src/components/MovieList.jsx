import MovieCard from './MovieCard';

const MovieList = ({ title, movies = [] }) => {
  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold p-6 text-black">{title}</h1>
      </div>
      <div className="flex overflow-x-scroll justify-center">
        {movies && movies.length > 0 ? (
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <p className="text-white">No movies found.</p>
        )}
      </div>
    </div>
  );
};

export default MovieList;