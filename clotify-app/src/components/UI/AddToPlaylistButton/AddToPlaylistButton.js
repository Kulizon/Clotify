import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToPlaylist } from "../../../store/user";
import AddToPlaylistIcon from "./../../../assets/UI/AddToPlaylistIcon";

import styles from "./AddToPlaylistButton.module.css";

const AddToPlaylistButton = (props) => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  let playlists = useSelector((state) => state.user.user.playlists);
  playlists = playlists.filter((p) => p.type === "playlist");

  const addToPlaylistHandler = (e) => {
    console.log({ ...props.song });
    addToPlaylist(e.target.id, { ...props.song }, dispatch);
  };

  return (
    <button
      className={styles.button}
      onClick={() => {
        setShowMenu((prevState) => !prevState);
      }}
    >
      <AddToPlaylistIcon></AddToPlaylistIcon>
      {showMenu && (
        <ul>
          {playlists.map((p) => (
            <li id={p._id} key={p._id} onClick={addToPlaylistHandler}>
              {p.name}
            </li>
          ))}
        </ul>
      )}
    </button>
  );
};

export default AddToPlaylistButton;
