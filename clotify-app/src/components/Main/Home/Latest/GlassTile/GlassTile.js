import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { homeActions } from "../../../../../store/home";

import styles from "./GlassTile.module.css";

import PlayButton from "../../../../UI/PlayButton/PlayButton";

const GlassTile = (props) => {
  const dispatch = useDispatch();

  const playHandler = (e) => {
    if (e.target.tagName.toLowerCase() === "button") {
      e.preventDefault();

      if (props.type === "song") {
        dispatch(
          homeActions.playSong({
            id: props.id,
            audio: props.audio,
            name: props.text,
            image: props.image,
            author: props.author,
          })
        );
      } else if (props.type === "album") {
        dispatch(homeActions.playPlaylist({ songs: props.songs, author: props.author, image: props.image }));
      }
    }
  };

  return (
    <Link to={props.to}>
      <div className={styles.tile}>
        <img src={props.image} alt="Playlist Cover" />
        <h3>{props.text}</h3>
        <PlayButton onClick={playHandler}></PlayButton>
      </div>
    </Link>
  );
};

export default GlassTile;
