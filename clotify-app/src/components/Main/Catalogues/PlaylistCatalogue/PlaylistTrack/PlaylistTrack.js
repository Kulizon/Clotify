import { useDispatch, useSelector } from "react-redux";
import { homeActions } from "../../../../../store/home";
import { userActions, deleteFromPlaylist } from "../../../../../store/user";
import { useState } from "react";

import styles from "./PlaylistTrack.module.css";

import PlayIcon from "../../../../../assets/UI/PlayIcon";
import FavouriteButton from "../../../../UI/FavouriteButton/FavouriteButton";
import AddToPlaylistButton from "../../../../UI/AddToPlaylistButton/AddToPlaylistButton";
import DeleteIcon from "./../../../../../assets/UI/DeleteIcon";

const PlaylistTrack = (props) => {
  const dispatch = useDispatch();
  const [hideTrack, setHideTrack] = useState(false);

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

  const deleteFromPlaylistHandler = () => {
    deleteFromPlaylist(props.playlistID, props.id, dispatch);
    setHideTrack(true);
  };

  const toDelete = props.type === "playlist" ? true : false;

  return !hideTrack ? (
    <div className={`${props.className} ${styles.track}`}>
      <button className={styles.play} onClick={playHandler}>
        <PlayIcon></PlayIcon>
      </button>
      <p className={styles.order}>{props.order}</p>
      <div>
        <img src={props.image} alt="Album Cover" />
        <div>
          <h6>{props.title}</h6>
          <p>{props.author}</p>
        </div>
      </div>
      <p>{props.album}</p>
      <div className={styles.actions}>
        {props.isDeletable ? (
          toDelete === "playlist" ? (
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
          ) : (
            <button className={styles["delete-button"]} onClick={deleteFromPlaylistHandler}>
              <DeleteIcon></DeleteIcon>
            </button>
          )
        ) : (
          <span></span>
        )}
        <FavouriteButton
          isFavourite={isFavourite}
          likeHandler={likeSongHandler}
          dislikeHandler={dislikeSongHandler}
        ></FavouriteButton>
      </div>

      <p>{props.length}</p>
    </div>
  ) : (
    <></>
  );
};

export default PlaylistTrack;
