// import {gptSlice} from '../utils/gptSlice';
import { useDispatch } from 'react-redux';
import GptSearchBar from './GptSearchBar';
import GptSearchResults from './GptSearchResults';
import {BG_URL} from "../utils/constants";

const GPTSearch = () => {
  return (
    <div>
         {/* <div className="absolute">
                <img src={BG_URL}></img>
         </div> */}
        <GptSearchBar />
        <GptSearchResults />
    </div>
  );
}

export default GPTSearch;