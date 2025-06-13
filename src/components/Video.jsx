import useMovieTrailer from "../hooks/useMovieTrailer";
import {useSelector} from 'react-redux';

const Video = ({ movie_id }) => {
  const videokey= useSelector((state) => state.movies.movieTrailer?.key);
  useMovieTrailer(movie_id);

  return (
    <div className="  w-full h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
      {videokey && (
        <iframe
          className="w-full h-full object-cover"
          src={`https://www.youtube.com/embed/${videokey}?autoplay=1&mute=1`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
};

export default Video;