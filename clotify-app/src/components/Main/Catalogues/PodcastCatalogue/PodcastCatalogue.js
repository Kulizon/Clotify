import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../../../store/user";


import styles from "./PodcastCatalogue.module.css";

import PodcastEpisode from "./PodcastEpisode/PodcastEpisode";

const PodcastCatalogue = (props) => {
  const dispatch = useDispatch();

  const podcasts = useSelector((state) => state.user.user.likedPodcasts);
  const ifFollowing = podcasts.includes(props.id);

  const followHandler = () => {
    dispatch(userActions.followPodcast(props.id));
  };

  const unfollowHandler = () => {
    dispatch(userActions.unfollowPodcast(props.id));
  };



  return (
    <div className={styles["podcast-catalogue"]}>
      {!props.hideFollow && (
        <>
          {!ifFollowing ? (
            <button className={styles["follow-button"]} onClick={followHandler}>
              Follow
            </button>
          ) : (
            <button className={styles["follow-button"] + " " + styles["following"]} onClick={unfollowHandler}>
              Following
            </button>
          )}
        </>
      )}

      <div className={styles.template}>
        <div className={styles.episodes}>
          {props.episodes.map((ep) => (
            <PodcastEpisode
              key={ep._id}
              id={ep._id}
              image={ep.image}
              name={ep.name}
              podcast={ep.podcast}
              audio={ep.audio}
              description={ep.description}
              isFavourite={ep.isFavourite}
            ></PodcastEpisode>
          ))}
        </div>
        {!props.hideDescription && (
          <div className={styles.info}>
            <h2>Informations</h2>
            <p>{props.description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PodcastCatalogue;
