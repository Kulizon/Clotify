import styles from "./FavouriteButton.module.css";

import FavouriteIcon from "../../../assets/AsideIcons/FavouriteIcon";
import HeartOutlineIcon from "../../../assets/MainIcons/HeartOutlineIcon";

const FavouriteButton = (props) => {
  return props.isFavourite ? (
    <button className={styles.favourite + " " + props.className} onClick={props.dislikeHandler}>
      <FavouriteIcon></FavouriteIcon>
    </button>
  ) : (
    <button className={styles["not-favourite"] + " " + props.className} onClick={props.likeHandler}>
      <HeartOutlineIcon></HeartOutlineIcon>
    </button>
  );
};

export default FavouriteButton;
