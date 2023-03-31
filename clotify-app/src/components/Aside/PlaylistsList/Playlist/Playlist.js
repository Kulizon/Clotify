import { Link } from "react-router-dom";

import styles from "./Playlist.module.css";

const Playlist = (props) => {
  return (
    <Link to={props.to}>
      <li className={styles.playlist}>{props.children}</li>
    </Link>
  );
};

export default Playlist;
