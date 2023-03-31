import { useParams, Navigate } from "react-router";
import { useSelector } from "react-redux";

import CatalogueInfo from "./CatalogueInfo/CatalogueInfo";
import PlaylistCatalogue from "./PlaylistCatalogue/PlaylistCatalogue";
import AlbumWrap from "./Wraps/AlbumWrap";
import SongWrap from "./Wraps/SongWrap";
import AuthorWrap from "./Wraps/AuthorWrap";
import FavouriteSongsWrap from "./Wraps/FavouriteSongsWrap";
import FavouriteEpisodesWrap from "./Wraps/FavouriteEpisodesWrap";
import PlaylistWrap from "./Wraps/PlaylistWrap";
import UserWrap from "./Wraps/UserWrap";
import PodcastWrap from "./Wraps/PodcastWrap";
import EpisodeWrap from "./Wraps/EpisodeWrap";

const Catalogues = () => {
  const params = useParams();

  const { user, mixes } = useSelector((state) => state.user);
  const propositions = useSelector((state) => state.home.propositions);

  let content;
  if (params.type === "mix") {
    let mix;
    mix = mixes.filter((m) => m.num === parseInt(params.id))[0];

    if (!mix) {
      content = <Navigate to="/home"></Navigate>;
    } else {
      content = (
        <>
          <CatalogueInfo
            type={params.type}
            heading={mix.name}
            image={mix.image}
            mixColor={mix.mixColor}
            authorProfilePicture=""
            author={user.username}
            amount={`${mix.songs.length} tracks`}
          ></CatalogueInfo>
          <PlaylistCatalogue songs={mix.songs}></PlaylistCatalogue>
        </>
      );
    }
  } else if (params.type === "artist-playlist") {
    let propositionInfo;

    for (let i = 0; i < propositions.length; i++) {
      const list = propositions[i];

      for (let n = 0; n < list.length; n++) {
        const p = list[n];

        if (p.id === params.id) {
          propositionInfo = { ...p };
        }
      }
    }

    if (!propositionInfo) {
      content = <Navigate to="/home"></Navigate>;
    } else {
      content = (
        <>
          <CatalogueInfo
            type={params.type}
            heading={propositionInfo.name}
            image={propositionInfo.image}
            mixColor={propositionInfo.mixColor}
            authorProfilePicture=""
            author={propositionInfo.author}
            amount={`${propositionInfo.songs.length} tracks`}
          ></CatalogueInfo>
          <PlaylistCatalogue songs={propositionInfo.songs}></PlaylistCatalogue>
        </>
      );
    }
  } else if (params.type === "favourite-songs") {
    content = (
      <>
        <FavouriteSongsWrap></FavouriteSongsWrap>
      </>
    );
  } else if (params.type === "your-episodes") {
    content = (
      <>
        <FavouriteEpisodesWrap></FavouriteEpisodesWrap>
      </>
    );
  } else if (params.type === "album") {
    content = <AlbumWrap albumID={params.id}></AlbumWrap>;
  } else if (params.type === "song") {
    content = <SongWrap songID={params.id}></SongWrap>;
  } else if (params.type === "author") {
    content = <AuthorWrap authorID={params.id}></AuthorWrap>;
  } else if (params.type === "playlist") {
    content = <PlaylistWrap playlistID={params.id}></PlaylistWrap>;
  } else if (params.type === "user") {
    content = <UserWrap userID={params.id}></UserWrap>;
  } else if (params.type === "podcast") {
    content = <PodcastWrap podcastID={params.id}></PodcastWrap>;
  } else if (params.type === "episode") {
    content = <EpisodeWrap episodeID={params.id}></EpisodeWrap>;
  }

  return <>{content}</>;
};

export default Catalogues;
