import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addNowPlayingMovies } from '../utils/moviesSlice';
import { API_OPTIONS, MOVIE_URL } from '../utils/constants';

const useNowPlayingMovies=()=>{
     const dispatch= useDispatch();

  const getMovies = async () => {
    try{
      const data= await fetch(MOVIE_URL, API_OPTIONS);
      if (!data.ok) {
        throw new Error('Network response was not ok');
      }
      const json = await data.json();
      dispatch(addNowPlayingMovies(json.results));
    }catch(error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  }

  useEffect(() => {
    getMovies();
  }, []);
}

export default useNowPlayingMovies;