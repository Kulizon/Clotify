import { useSelector } from "react-redux";

import styles from "./PlaylistsList.module.css";

import Playlist from "./Playlist/Playlist";

const PlaylistsList = () => {
  const userPlaylists = useSelector((state) => state.user.user.playlists);

  if (!userPlaylists) return <></>;
  const playlists = userPlaylists.filter((p) => p.type === "playlist");
  
  return (
    <ul className={styles.list}>
      {playlists.map((p) => (
        <Playlist key={p._id} to={`/library/playlist/${p._id}`}>
          {p.name}
        </Playlist>
      ))}
    </ul>
  );
};

export default PlaylistsList;
