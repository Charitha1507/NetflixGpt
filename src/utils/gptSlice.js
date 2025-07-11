import {createSlice} from '@reduxjs/toolkit';

const gptSlice=createSlice({
    name:'gpt',
    initialState:{
       showGptSearch:false,
       movieResults: [],
       movieNames: [],
       loading: false,
    },
    reducers:{
       showGptSearchOption:(state) => {
           console.log("GPT slice - toggling showGptSearch from", state.showGptSearch, "to", !state.showGptSearch);
           state.showGptSearch = !state.showGptSearch;
       },
       addGptMovieResult: (state, action) => {
           state.movieResults = action.payload;
       },
       addGptMovieNames: (state, action) => {
           state.movieNames = action.payload;
       },
       setGptLoading: (state, action) => {
           state.loading = action.payload;
       },
    }
});

export const {showGptSearchOption, addGptMovieResult, addGptMovieNames, setGptLoading}=gptSlice.actions;
export default gptSlice.reducer;