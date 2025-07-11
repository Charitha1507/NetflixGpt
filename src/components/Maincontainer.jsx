import Video from "./Video";
import Title from "./Title";
import { useSelector } from "react-redux";

const Maincontainer = () => {
  const movies = useSelector((state) => state.movies?.nowPlayingMovies);
  if (!movies) {
    return null;
  }
  
  const mainmovie = movies[Math.floor(Math.random() * movies.length)];
  const title = mainmovie?.original_title;
  const overview = mainmovie?.overview;
  const movie_id = mainmovie?.id;
  console.log("Selected movie:", mainmovie);
  console.log("Movie ID for trailer:", movie_id);

  return (
    <div>
      <Title title={title} overview={overview} />
      <Video movieId={movie_id}/>
    </div>
  );
};

export default Maincontainer;