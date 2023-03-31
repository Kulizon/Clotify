import { createSlice } from "@reduxjs/toolkit";
import hostUrl from "../utilities/data/hostUrl";

const userInitialState = { mixes: [], user: {} };

const updateUser = async (user) => {
  await fetch(`${hostUrl}/users/${user.userID}/update`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const user = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    setMixes(state, action) {
      state.mixes = action.payload;
    },
    setCurrentUser(state, action) {
      state.user = action.payload;
      const mixes = action.payload.playlists.filter((p) => p.type === "mix");
      state.mixes = mixes;
    },
    logout(state) {
      state.user = {};
      state.mixes = [];
      localStorage.setItem("userID", "");
    },
    addToHistory(state, action) {
      let includes = false;
      state.user.history.forEach((i) => {
        if (i.id === action.payload.id) {
          includes = true;
        }
      });

      if (!includes) {
        state.user.history =
          state.user.history.length > 5
            ? [...state.user.history, action.payload].splice(1)
            : [...state.user.history, action.payload];
        updateUser({ ...state.user });
      }
    },
    deleteFromHistory(state, action) {
      const newHistory = [];
      state.user.history.forEach((i) => {
        if (i.id !== action.payload) newHistory.push(i);
      });
      state.user.history = newHistory > 5 ? newHistory.splice(1) : newHistory;
      updateUser({ ...state.user });
    },
    likeAlbum(state, action) {
      state.user.likedAlbums = [...state.user.likedAlbums, action.payload];
      updateUser({ ...state.user });
    },
    dislikeAlbum(state, action) {
      state.user.likedAlbums = [...state.user.likedAlbums].filter((id) => id !== action.payload);
      updateUser({ ...state.user });
    },
    follow(state, action) {
      state.user.following = [...state.user.following, action.payload];
      updateUser({ ...state.user });
    },
    unfollow(state, action) {
      state.user.following = [...state.user.following].filter((id) => id !== action.payload);
      updateUser({ ...state.user });
    },
    followPodcast(state, action) {
      state.user.likedPodcasts = [...state.user.likedPodcasts, action.payload];
      updateUser({ ...state.user });
    },
    unfollowPodcast(state, action) {
      state.user.likedPodcasts = [...state.user.likedPodcasts].filter((id) => id !== action.payload);
      updateUser({ ...state.user });
    },
    likeEpisode(state, action) {
      state.user.likedEpisodes =
        state.user.likedEpisodes.length > 0 ? [...state.user.likedEpisodes, action.payload] : [action.payload];
      updateUser({ ...state.user });
    },
    dislikeEpisode(state, action) {
      state.user.likedEpisodes = [...state.user.likedEpisodes].filter((id) => id !== action.payload);
      updateUser({ ...state.user });
    },
    likeSong(state, action) {
      state.user.likedSongs = [...state.user.likedSongs, action.payload];
      updateUser({ ...state.user });
    },
    dislikeSong(state, action) {
      state.user.likedSongs = [...state.user.likedSongs].filter((id) => id !== action.payload);
      updateUser({ ...state.user });
    },

    addPlaylist(state, action) {
      state.user.playlists = [...state.user.playlists, action.payload];
      updateUser({ ...state.user });
    },
    editPlaylist(state, action) {
      const updatedPlaylist = [...state.user.playlists].filter((p) => p._id === action.payload.id)[0];
      const restOfPlaylist = [...state.user.playlists].filter((p) => p._id !== action.payload.id);

      state.user.playlists = [
        ...restOfPlaylist,
        { ...updatedPlaylist, name: action.payload.name, image: action.payload.image },
      ];

      updateUser({ ...state.user });
    },
    removePlaylist(state, action) {
      console.log(action.payload);
      state.user.playlists = [...state.user.playlists].filter((p) => p._id !== action.payload);
      updateUser({ ...state.user });
    },
    likePlaylist(state, action) {
      state.user.playlists = [...state.user.playlists, { ...action.payload }];
      updateUser({ ...state.user });
    },
    dislikePlaylist(state, action) {
      state.user.playlists = [...state.user.playlists].filter((p) => p._id !== action.payload);
      updateUser({ ...state.user });
    },
    addToListeningHistory(state, action) {
      state.user.listeningHistory = [...state.user.listeningHistory].filter((i) => i.id !== action.payload.id);

      state.user.listeningHistory =
        [...state.user.listeningHistory].length > 7
          ? [...state.user.listeningHistory, action.payload].slice(1)
          : [...state.user.listeningHistory, action.payload];

      updateUser({ ...state.user });
    },
  },
});

export default user;

export const userActions = user.actions;

export const createPlaylist = async (playlistInfo, dispatch) => {
  let randomCode = "";
  for (let i = 0; i < 4; i++) {
    const r = Math.floor(Math.random() * 10);
    randomCode += r;
  }

  const response = await fetch(`${hostUrl}/playlists/create`, {
    method: "POST",
    body: JSON.stringify({ ...playlistInfo, songs: [], name: `Playlist #${randomCode}`, type: "playlist" }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();

  dispatch(userActions.addPlaylist(result));
};

export const editPlaylist = async (playlistID, updateInfo, dispatch) => {
  const updatedPlaylist = { id: playlistID, name: updateInfo.name, image: updateInfo.image };

  const response = await fetch(`${hostUrl}/playlists/update`, {
    method: "POST",
    body: JSON.stringify({ ...updatedPlaylist }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();

  if (result.code === 200) dispatch(userActions.editPlaylist({ ...updatedPlaylist }));
};

export const deletePlaylist = async (playlistID, dispatch) => {
  const response = await fetch(`${hostUrl}/playlists/delete`, {
    method: "POST",
    body: JSON.stringify({ id: playlistID }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();

  if (result.code === 200) dispatch(userActions.removePlaylist(playlistID));
};

export const addToPlaylist = async (playlistID, songInfo, dispatch) => {
  await fetch(`${hostUrl}/playlists/add-to`, {
    method: "POST",
    body: JSON.stringify({ id: playlistID, song: songInfo }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const deleteFromPlaylist = async (playlistID, songID, dispatch) => {
  await fetch(`${hostUrl}/playlists/delete-from`, {
    method: "POST",
    body: JSON.stringify({ id: playlistID, songID: songID }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
