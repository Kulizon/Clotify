import styles from "./PlayButton.module.css";

import PlayIcon from "./../../../assets/UI/PlayIcon";

const PlayButton = (props) => {
  return (
    <button className={styles.button + " " + props.className} onClick={props.onClick}>
      <PlayIcon></PlayIcon>
    </button>
  );
};

export default PlayButton;
