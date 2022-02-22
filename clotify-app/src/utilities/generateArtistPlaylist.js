import { nanoid } from "nanoid";
import hostUrl from "./data/hostUrl";
import { homeActions } from "../store/home";
import mixColors from "./data/mixColors";

const generateArtistPlaylist = async (dispatch, usedAuthorsIDs) => {
  const artistProposition = [];

  try {
    const response = await fetch(`${hostUrl}/authors/random`);
    const result = await response.json();

    if (!result) return;

    const artistName = result.name;
    const artistID = result._id;

    if (usedAuthorsIDs.includes(artistID)) return false;

    const albums = result.albums.map((a) => a.id);

    const albumsResponse = await fetch(`${hostUrl}/albums/${albums}`);
    const albumsResult = await albumsResponse.json();

    if (!albumsResult) return;

    albumsResult.forEach((a) => {
      artistProposition.push({ ...a, type: "album" });
    });

    let songsUrl = "";
    albumsResult.forEach((a) => {
      a.songs.forEach((s) => {
        songsUrl += s.id + ",";
      });
    });

    const songsResponse = await fetch(`${hostUrl}/songs/${songsUrl}`);
    const songsResult = await songsResponse.json();

    if (!songsResult) return;

    // Select random songs
    for (let i = 0; i < 9 - artistProposition.length; i++) {
      const mixSongs = [];
      const selectedIndexes = [];

      for (let n = 0; n < 10; n++) {
        const r = Math.floor(Math.random() * songsResult.length);
        if (selectedIndexes.includes(r)) continue;
        mixSongs.push(songsResult[r]);
        selectedIndexes.push(r);
      }

      const newMix = {
        name: `${artistName} Mix ${i + 1}`,
        songs: [...mixSongs],
        image: mixSongs[0].image,
        type: "artist-playlist",
        description: artistName,
        id: nanoid(),
        mixColor: mixColors[Math.floor(Math.random() * mixColors.length)],
      };
      artistProposition.push(newMix);
    }

    dispatch(homeActions.addProposition(artistProposition));
    dispatch(homeActions.addUsedAuthor(artistID));

    return artistID;
  } catch (e) {
    console.log(e);
  }
};

export default generateArtistPlaylist;
