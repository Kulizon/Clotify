import { useDispatch, useSelector } from "react-redux";
import { homeActions } from "../../../../../store/home";

import styles from "./AlbumTrack.module.css";

import PlayIcon from "../../../../../assets/UI/PlayIcon";
import FavouriteButton from "../../../../UI/FavouriteButton/FavouriteButton";
import AddToPlaylistButton from "../../../../UI/AddToPlaylistButton/AddToPlaylistButton";
import { userActions } from "../../../../../store/user";

const AlbumTrack = (props) => {
  const dispatch = useDispatch();

  const playHandler = () => {
    dispatch(
      homeActions.playSong({
        id: props.id,
        audio: props.audio,
        name: props.title,
        image: props.image,
        author: props.author,
      })
    );
    dispatch(
      userActions.addToListeningHistory({
        id: props.id,
        name: props.title,
        author: props.author,
        image: props.image,
        type: "song",
        audio: props.audio,
      })
    );
  };

  const likedSongs = useSelector((state) => state.user.user.likedSongs);

  const isFavourite = likedSongs.includes(props.id);

  const likeSongHandler = () => {
    dispatch(userActions.likeSong(props.id));
  };

  const dislikeSongHandler = () => {
    dispatch(userActions.dislikeSong(props.id));
  };

  return (
    <div className={`${props.className} ${styles.track} ${props.highlighted ? styles.highlighted : ""}`}>
      <button className={styles.play} onClick={playHandler}>
        <PlayIcon></PlayIcon>
      </button>

      <p className={styles.order}>{props.order}</p>
      <div>
        <h6>{props.title}</h6>
        <p>{props.author}</p>
      </div>

      <div className={styles.actions}>
        <AddToPlaylistButton
          song={{
            id: props.id,
            audio: props.audio,
            name: props.title,
            image: props.image,
            author: props.author,
            songLength: props.length,
            album: props.album,
          }}
        ></AddToPlaylistButton>
        <FavouriteButton
          isFavourite={isFavourite}
          likeHandler={likeSongHandler}
          dislikeHandler={dislikeSongHandler}
        ></FavouriteButton>
      </div>

      <p>{props.length}</p>
    </div>
  );
};

export default AlbumTrack;
