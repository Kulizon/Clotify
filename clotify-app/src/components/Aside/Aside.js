import { createPlaylist } from "../../store/user";
import { useSelector, useDispatch } from "react-redux";

import styles from "./Aside.module.css";

import TileButton from "./TileButton/TileButton";
import PlaylistsList from "./PlaylistsList/PlaylistsList";

import HomeIcon from "./../../assets/AsideIcons/HomeIcon";
import SearchIcon from "./../../assets/AsideIcons/SearchIcon";
import LibraryIcon from "./../../assets/AsideIcons/LibraryIcon";
import AddIcon from "../../assets/AsideIcons/AddIcon";
import FavouriteIcon from "../../assets/AsideIcons/FavouriteIcon";
import PodcastIcon from "./../../assets/AsideIcons/PodcastIcon";

const Aside = () => {
  const dispatch = useDispatch();
  const { _id, name } = useSelector((state) => state.user.user);

  const createPlaylistHandler = (e) => {
    e.preventDefault();
    createPlaylist({ authorID: _id, author: name }, dispatch);
  };

  return (
    <aside className={styles.aside}>
      <div className={styles["main-menu"]}>
        <TileButton text="Home" to="/home">
          <HomeIcon></HomeIcon>
        </TileButton>
        <TileButton text="Search" to="/search">
          <SearchIcon></SearchIcon>
        </TileButton>
        <TileButton text="Library" to="/library/playlists">
          <LibraryIcon></LibraryIcon>
        </TileButton>
      </div>
      <div className={styles["playlist-menu"]}>
        <TileButton text="Create Playlist" to="/create-playlist" onClick={createPlaylistHandler}>
          <AddIcon></AddIcon>
        </TileButton>
        <TileButton text="Favourite Songs" to="/library/favourite-songs">
          <FavouriteIcon></FavouriteIcon>
        </TileButton>
        <TileButton text="Your Episodes" to="/library/your-episodes">
          <PodcastIcon></PodcastIcon>
        </TileButton>
      </div>
      <hr></hr>
      <PlaylistsList></PlaylistsList>
    </aside>
  );
};

export default Aside;
