const MovieCard = ({ movie }) => {
  if (!movie) return null;
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/300x450?text=No+Image";
  return (
    <div className="m-2 w-52 h-64 bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-200">
      <img
        src={posterUrl}
        alt={movie.title || movie.name}
        className="w-full h-60 object-cover"
      />
    </div>
  );
}

export default MovieCard;