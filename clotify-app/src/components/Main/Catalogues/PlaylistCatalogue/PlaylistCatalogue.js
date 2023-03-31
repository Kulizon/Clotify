import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import { homeActions } from "../../../../store/home";
import { userActions, editPlaylist } from "../../../../store/user";
import { deletePlaylist } from "../../../../store/user";
import { useParams } from "react-router";
import { useState } from "react";

import styles from "./PlaylistCatalogue.module.css";

import PlaylistTrack from "./PlaylistTrack/PlaylistTrack";
import ClockIcon from "./../../../../assets/MainIcons/ClockIcon";
import PlayButton from "../../../UI/PlayButton/PlayButton";
import FavouriteButton from "../../../UI/FavouriteButton/FavouriteButton";
import SettingsIcon from "./../../../../assets/UI/SettingsIcon";
import TextInput from "./../../../UI/Forms/TextInput/TextInput";
import MainButton from "./../../../UI/Forms/MainButton/MainButton";

const PlaylistCatalogue = (props) => {
  const dispatch = useDispatch();
  const currentUserID = useSelector((state) => state.user.user._id);
  const playlists = useSelector((state) => state.user.user.playlists);
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [redirect, setRedirect] = useState(false);

  let isFavourite = false;
  playlists.forEach((p) => {
    if (p._id === props.id) isFavourite = true;
  });

  const params = useParams();

  const playPlaylistHandler = () => {
    dispatch(homeActions.playPlaylist({ songs: props.songs, author: props.author, image: props.image }));
  };

  const settingsHandler = () => {
    setShowMenu((prevState) => !prevState);
  };

  const startEditingHandler = () => {
    setIsEditing(true);
    setShowMenu(false);
  };

  const editPlaylistHandler = (e) => {
    e.preventDefault();
    const image = e.target[0].value;
    const name = e.target[1].value;

    if (!name) return;

    editPlaylist(props.id, { image, name }, dispatch);

    setIsEditing(false);
  };

  const deletePlaylistHandler = async () => {
    deletePlaylist(props.id, dispatch);
    setRedirect(true);
  };

  const likePlaylistHandler = () => {
    dispatch(
      userActions.likePlaylist({
        _id: props.id,
        name: props.name,
        songs: [...props.songs],
        author: props.author,
        authorID: props.authorID,
        type: "playlist",
      })
    );
  };

  const dislikePlaylistHandler = () => {
    dispatch(userActions.dislikePlaylist(props.id));
  };

  return (
    <>
      {redirect && <Navigate to="/home"></Navigate>}
      <div className={styles["playlist-catalogue"]}>
        {!props.hidePlay && (
          <div className={styles.buttons}>
            <PlayButton onClick={playPlaylistHandler}></PlayButton>
            {params.id !== "favourite-tracks" &&
              params.type !== "mix" &&
              params.type !== "artist-playlist" &&
              params.type !== "favourite-songs" &&
              props.authorID !== currentUserID && (
                <FavouriteButton
                  isFavourite={isFavourite}
                  className={styles.favourite}
                  likeHandler={likePlaylistHandler}
                  dislikeHandler={dislikePlaylistHandler}
                ></FavouriteButton>
              )}
            {props.authorID === currentUserID && (
              <div className={styles.settings}>
                <button onClick={settingsHandler}>
                  <SettingsIcon></SettingsIcon>
                </button>
                {showMenu && (
                  <ul>
                    <li onClick={startEditingHandler}>Edit</li>
                    <li onClick={deletePlaylistHandler}>Delete</li>
                  </ul>
                )}
              </div>
            )}
          </div>
        )}

        {isEditing && (
          <form className={styles["edit-form"]} onSubmit={editPlaylistHandler}>
            <TextInput placeholder="Image URl" defaultValue={props.image}></TextInput>
            <TextInput placeholder="Name" defaultValue={props.name}></TextInput>
            <MainButton>Edit</MainButton>
          </form>
        )}

        {!props.hideFrame && (
          <div className={`${styles.frame} ${styles.header}`}>
            <p>#</p>
            <div>
              <p>TITLE</p>
            </div>
            <p>ALBUM</p>
            <div></div>
            <p>
              <ClockIcon></ClockIcon>
            </p>
          </div>
        )}
        <div className={styles.tracks}>
          {props.songs.length > 0 &&
            props.songs.map((t, i) => (
              <PlaylistTrack
                className={styles.frame}
                order={i + 1}
                key={t._id || t.id}
                id={t._id || t.id}
                image={t.image}
                title={t.name}
                author={t.author}
                album={t.album}
                playlistID={params.id}
                audio={t.audio}
                length={t.songLength}
                type={params.type}
                isDeletable={props.authorID === currentUserID}
              ></PlaylistTrack>
            ))}
        </div>
      </div>
    </>
  );
};

export default PlaylistCatalogue;
