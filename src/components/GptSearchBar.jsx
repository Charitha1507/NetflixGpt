import {useDispatch, useSelector} from 'react-redux';
import {languageOptions} from '../utils/Textconstants';
 import OpenAI from 'openai';
import {GPT_KEY} from "../utils/constants";
import {useRef } from 'react';

const GptSearchBar = () => {
const lang = useSelector((store) => store.lang.language);
 
const openai = new OpenAI({
  apiKey: GPT_KEY
  , dangerouslyAllowBrowser: true 
});

const searchtext=useRef(null);


const handleSearch =async()=>{
  const query="assume urself as a movie recommendation system, recommend me a movie based on the following query: "+searchtext.current.value+"give me 5 movies based on that query and give me the movie names comma separated and also give me the movie poster urls comma separated shown in the example.EX:movie1,movie2,movie3,movie4,movie5";
  await openai.chat.completions.create({
  model: 'gpt-3.5-turbo',
  messages: [
    { role: 'developer', content:query }
  ],
});
console.log(completion.choices?[0].message.content);
} 

  return (
    <div className=" flex items-center justify-center">    
        <div className="flex justify-center items-center p-4 z-10">
            <input
            type="text"
            ref={searchtext}
            placeholder={languageOptions[lang]?.GptSearchPlaceholder }
            className="w-full max-w-md p-2 border border-white-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="ml-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-blue-600" onClick={handleSearch}>
            {languageOptions[lang]?.search}
            </button>
        </div>
    </div>
  );
}

export default GptSearchBar;