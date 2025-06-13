import Header from './Header';
import useNowPlayingMovies from '../hooks/useNowPlayingMovies';
import Maincontainer from './Maincontainer';
import Secondarycontainer from "./Secondarycontainer";
import {useSelector} from 'react-redux';
import GptSearch from './GPTSearch';
const Browse = () => {
  const gptSearch = useSelector((store) => store.gpt.showGptSearch);
  useNowPlayingMovies();
  return (
    <div>
      <Header/>
      {gptSearch ? <GptSearch/> : (
        <>
          <Maincontainer/>
          <Secondarycontainer/>
        </>
      )}
    </div>
  )
}

export default Browse;