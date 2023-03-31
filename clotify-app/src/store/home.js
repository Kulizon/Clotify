import { createSlice } from "@reduxjs/toolkit";

const homeInitialState = {
  propositions: [],
  usedAuthors: [],
  currentSong: {},
  currentPlaylist: {},
  searchResult: {},
  isSearched: false,
  isSearching: false,
};

const home = createSlice({
  name: "home",
  initialState: homeInitialState,
  reducers: {
    addProposition(state, action) {
      state.propositions = [...state.propositions, action.payload];
    },
    addUsedAuthor(state, action) {
      state.usedAuthors = [...state.usedAuthors, action.payload];
    },
    resetData(state) {
      state.propositions = [];
      state.usedAuthors = [];
      state.currentSong = {};
      state.currentPlaylist = {};
      state.searchResult = {};
    },
    playSong(state, action) {
      state.currentSong = { ...action.payload };
      state.currentPlaylist = {};
    },
    playPlaylist(state, action) {
      state.currentPlaylist = { ...action.payload };
      state.currentSong = {};
    },
    setSearchResult(state, action) {
      state.searchResult = { ...action.payload };
    },
    setIsSearched(state, action) {
      state.isSearched = action.payload;
    },
    startSearching(state) {
      state.isSearching = true;
    },
    stopSearching(state) {
      state.isSearching = false;
    },
  },
});

export default home;

export const homeActions = home.actions;
