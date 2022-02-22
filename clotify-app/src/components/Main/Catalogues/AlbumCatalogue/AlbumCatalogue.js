import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { homeActions } from "../../../../store/home";
import { userActions } from "../../../../store/user";
import hostUrl from "../../../../utilities/data/hostUrl";

import styles from "./AlbumCatalogue.module.css";

import AlbumTrack from "./AlbumTrack/AlbumTrack";
import PlayButton from "../../../UI/PlayButton/PlayButton";
import FavouriteButton from "../../../UI/FavouriteButton/FavouriteButton";
import ClockIcon from "../../../../assets/MainIcons/ClockIcon";

const AlbumCatalogue = (props) => {
  const dispatch = useDispatch();
  const [songs, setSongs] = useState();

  const likedAlbums = useSelector((state) => state.user.user.likedAlbums);

  const isFavourite = likedAlbums.includes(props.id);

  useEffect(() => {
    const getSongsData = async () => {
      let url = "";
      props.songs.forEach((s) => {
        url += s.id + ",";
      });
      const response = await fetch(`${hostUrl}/songs/${url}`);
      const result = await response.json();
      setSongs(result);
    };

    getSongsData();
  }, [props.songs]);

  const playAlbumHandler = () => {
    dispatch(homeActions.playPlaylist({ songs: props.songs, author: props.author, image: props.image }));
    dispatch(
      userActions.addToListeningHistory({
        id: props.id,
        name: props.name,
        author: props.author,
        image: props.image,
        type: "album",
        songs: [...props.songs],
      })
    );
  };

  const likeAlbumHandler = () => {
    dispatch(userActions.likeAlbum(props.id));
  };

  const dislikeAlbumHandler = () => {
    dispatch(userActions.dislikeAlbum(props.id));
  };

  if (!songs) return <></>;

  return (
    <div className={styles["album-catalogue"]}>
      <div className={styles.buttons}>
        <PlayButton onClick={playAlbumHandler}></PlayButton>
        <FavouriteButton
          isFavourite={isFavourite}
          likeHandler={likeAlbumHandler}
          dislikeHandler={dislikeAlbumHandler}
        ></FavouriteButton>
      </div>

      <div className={`${styles.frame} ${styles.header}`}>
        <p>#</p>
        <p>TITLE</p>
        <div></div>
        <p>
          <ClockIcon></ClockIcon>
        </p>
      </div>
      <div className={styles.tracks}>
        {songs.map((t, i) => (
          <AlbumTrack
            className={styles.frame}
            order={i + 1}
            key={t._id}
            id={t._id}
            image={t.image}
            title={t.name}
            author={t.author}
            album={t.album}
            audio={t.audio}
            length={t.songLength}
            highlighted={t._id === props.highlightedID}
          ></AlbumTrack>
        ))}
      </div>
    </div>
  );
};

export default AlbumCatalogue;
