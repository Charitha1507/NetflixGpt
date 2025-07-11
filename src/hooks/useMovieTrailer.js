import { useEffect, useState } from "react";
import { API_OPTIONS } from '../utils/constants';
import {addMovieTrailer} from '../utils/moviesSlice';
import { useDispatch } from 'react-redux';

const useMovieTrailer=(movie_id)=>{
    const dispatch = useDispatch();
    
    console.log("useMovieTrailer hook called with movie_id:", movie_id);
    
  const getVideo = async () => {
    try {
      console.log("Fetching trailer for movie ID:", movie_id);
      const data = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/videos?language=en-US`, API_OPTIONS);
      
      if (!data.ok) {
        throw new Error(`HTTP error! status: ${data.status}`);
      }
      
      const json = await data.json();
      console.log("Trailer API response:", json);
      
      const videos = json.results.filter((video) => video.type === "Trailer" && video.site === "YouTube");
      const trailer = videos.length ? videos[0] : json.results[0];
      
      console.log("Selected trailer:", trailer);
      dispatch(addMovieTrailer(trailer));
    } catch (error) {
      console.error("Error fetching trailer:", error);
      dispatch(addMovieTrailer(null));
    }
  };

  useEffect(() => {
    console.log("useEffect triggered with movie_id:", movie_id);
    if (movie_id) {
      getVideo();
    } else {
      console.log("No movie_id provided, skipping trailer fetch");
    }
  }, [movie_id]);
}

export default useMovieTrailer;