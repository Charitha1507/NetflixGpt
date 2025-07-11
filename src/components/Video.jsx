import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackground = ({ movieId }) => {
  console.log("Video component received movieId:", movieId);
  const trailerVideo = useSelector((store) => store.movies?.movieTrailer);
  console.log("Current trailer video from store:", trailerVideo);

  useMovieTrailer(movieId);

  // Don't render iframe if no trailer data
  if (!trailerVideo?.key) {
    return (
      <div className="w-screen aspect-video bg-black flex items-center justify-center">
        <div className="text-white text-xl">
          {trailerVideo === null ? "No trailer available" : "Loading trailer..."}
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen">
      <iframe
        className="w-screen aspect-video"
        src={
          "https://www.youtube.com/embed/" +
          trailerVideo.key +
          "?&autoplay=1&mute=1&controls=1"
        }
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        frameBorder="0"
      ></iframe>
    </div>
  );
};
export default VideoBackground;