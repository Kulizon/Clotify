import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { homeActions } from "../../../../../store/home";
import useWindowDimensions from "./../../../../../utilities/hooks/useWIndowDimensions";

import styles from "./PodcastEpisode.module.css";

import PlayButton from "../../../../UI/PlayButton/PlayButton";

const PodcastEpisode = (props) => {
  const dispatch = useDispatch();

  const { width } = useWindowDimensions();

  const playPodcastHandler = () => {
    dispatch(
      homeActions.playSong({
        id: props.id,
        name: props.name,
        author: props.podcast,
        image: props.image,
        type: "episode",
        audio: props.audio,
      })
    );
  };

  return (
    <Link to={`/library/episode/${props.id}`}>
      <div className={styles.episode}>
        <img src={props.image} alt={`Episode ${props.title}`} />
        <div>
          <h4>{props.name}</h4>
          <p>{width > 700 ? props.description.slice(0, 210) : props.description.slice(0, 140)}...</p>
          <PlayButton onClick={playPodcastHandler}></PlayButton>
        </div>
      </div>
    </Link>
  );
};

export default PodcastEpisode;
