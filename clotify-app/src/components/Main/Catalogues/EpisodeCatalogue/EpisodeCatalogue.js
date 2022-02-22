import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../../../store/user";
import { homeActions } from "../../../../store/home";

import styles from "./EpisodeCatalogue.module.css";

import PlayButton from "../../../UI/PlayButton/PlayButton";
import FavouriteButton from "../../../UI/FavouriteButton/FavouriteButton";

const EpisodeCatalogue = (props) => {
  const dispatch = useDispatch();
  const likedEpisodes = useSelector((state) => state.user.user.likedEpisodes);
  const isFavourite = likedEpisodes.includes(props.episode._id);

  const likeHandler = () => {
    dispatch(userActions.likeEpisode(props.episode._id));
  };

  const dislikeHandler = () => {
    dispatch(userActions.dislikeEpisode(props.episode._id));
  };

  const playPodcastHandler = () => {
    dispatch(
      homeActions.playSong({
        id: props.episode._id,
        name: props.episode.name,
        author: props.episode.podcast,
        image: props.episode.image,
        type: "episode",
        audio: props.episode.audio,
      })
    );
  };

  return (
    <div className={styles["episode-catalogue"]}>
      <div className={styles.actions}>
        <PlayButton onClick={playPodcastHandler}></PlayButton>
        <FavouriteButton
          isFavourite={isFavourite}
          likeHandler={likeHandler}
          dislikeHandler={dislikeHandler}
        ></FavouriteButton>
      </div>

      <h2>Episode description</h2>
      <p>{props.episode.description}</p>

      <Link to={`/library/podcast/${props.episode.podcastID}`}>
        <button>SHOW ALL EPISODES</button>
      </Link>
    </div>
  );
};

export default EpisodeCatalogue;
