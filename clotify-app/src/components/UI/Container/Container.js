import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { homeActions } from "../../../store/home";
import { userActions } from "../../../store/user";

import styles from "./Container.module.css";

import PlayButton from "../PlayButton/PlayButton";
import DeleteButton from "../DeleteButton/DeleteButton";

const Container = (props) => {
  const dispatch = useDispatch();

  let isHistory = true;
  if (!props.history) isHistory = false;
  else isHistory = props.history;

  const randomColor = props.mixColor;

  const clickHandler = (e) => {
    if (props.countToHistory) {
      dispatch(
        userActions.addToHistory({
          description: props.description,
          name: props.heading,
          id: props.id,
          image: props.image,
          songs: props.songs,
          type: props.type,
        })
      );
      return;
    }
  };

  const playHandler = (e) => {
    if (e.target.tagName.toLowerCase() === "button") {
      e.preventDefault();

      if (props.type === "song") {
        dispatch(
          homeActions.playSong({
            audio: props.audio,
            author: props.description,
            image: props.image,
            name: props.heading,
          })
        );
        dispatch(
          userActions.addToListeningHistory({
            id: props.id,
            name: props.heading,
            author: props.description,
            image: props.image,
            type: "song",
            audio: props.audio,
          })
        );
      } else {
        dispatch(homeActions.playPlaylist({ songs: props.songs, author: props.description, image: props.image }));

        if (props.type === "album") {
          dispatch(
            userActions.addToListeningHistory({
              id: props.id,
              name: props.heading,
              author: props.description,
              image: props.image,
              type: "album",
              songs: [...props.songs],
            })
          );
        }
      }
    }
  };

  const deleteFromHistoryHandler = (e) => {
    if (e.target.tagName.toLowerCase() === "button") {
      e.preventDefault();
      dispatch(userActions.deleteFromHistory(props.id));
    }
  };

  return (
    <Link to={`/library/${props.type}/${props.id ? props.id : props.num}`} key={props.id} onClick={clickHandler}>
      <div className={styles.wrap}>
        {isHistory ? (
          <DeleteButton className={styles["delete-button"]} onClick={deleteFromHistoryHandler}></DeleteButton>
        ) : (
          <></>
        )}
        <div className={styles.container}>
          <div>
            {(props.type === "playlist" || props.type === "user") && !props.image ? (
              <>
                <img
                  src="https://altimadental.pl/wp-content/uploads/2015/01/default-placeholder.png"
                  alt=""
                  className={styles["hidden-image"]}
                />
                <div className={`${styles["image-placeholder"]} ${props.type === "user" ? "circle" : ""}`}>
                  <p>{props.heading}</p>
                </div>
              </>
            ) : (
              <img
                src={props.image}
                alt="Cover"
                className={props.type === "author" || props.type === "user" ? "circle" : ""}
              />
            )}
            {props.type === "song" ||
            (props.type === "playlist") | (props.type === "mix") ||
            props.type === "album" ||
            props.type === "artist-playlist" ? (
              <PlayButton className={styles["play-button"]} onClick={playHandler}></PlayButton>
            ) : (
              <></>
            )}
            {props.type === "artist-playlist" || props.type === "mix" ? (
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                  <path
                    fill={`#${randomColor}`}
                    fillOpacity="1"
                    d="M0,320L40,298.7C80,277,160,235,240,234.7C320,235,400,277,480,298.7C560,320,640,320,720,282.7C800,245,880,171,960,117.3C1040,64,1120,32,1200,69.3C1280,107,1360,213,1400,266.7L1440,320L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"
                  ></path>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                  <path
                    fill={`#${randomColor}`}
                    fillOpacity="1"
                    d="M0,32L30,58.7C60,85,120,139,180,154.7C240,171,300,149,360,133.3C420,117,480,107,540,117.3C600,128,660,160,720,160C780,160,840,128,900,96C960,64,1020,32,1080,21.3C1140,11,1200,21,1260,37.3C1320,53,1380,75,1410,85.3L1440,96L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
                  ></path>
                </svg>
                <h5>
                  {props.type === "artist-playlist"
                    ? "Artist Mix " + props.heading.slice(-1)
                    : "Daily Mix " + props.heading.slice(-1)}
                </h5>
              </div>
            ) : (
              <></>
            )}
          </div>
          <div>
            <h3>{props.heading}</h3>
            {props.type !== "podcast" && props.type !== "episode" && <p>{props.description}</p>}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Container;
