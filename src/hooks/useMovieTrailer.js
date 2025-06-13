import { useEffect, useState } from "react";
import { API_OPTIONS } from '../utils/constants';
import {addMovieTrailer} from '../utils/moviesSlice';
import { useDispatch } from 'react-redux';

const useMovieTrailer=(movie_id)=>{
    const dispatch = useDispatch();
  const getVideo = async () => {
    const data = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/videos?language=en-US`, API_OPTIONS);
    const json = await data.json();
    const videos = json.results.filter((video) => video.type === "Trailer" && video.site === "YouTube");
    const trailer = videos.length ? videos[0] : json.results[0];
    dispatch(addMovieTrailer(trailer));
  };

  useEffect(() => {
    if (movie_id) {
      getVideo();
    }
  }, [movie_id]);
}

export default useMovieTrailer;