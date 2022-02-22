import { Link } from "react-router-dom";

import styles from "./TileButton.module.css";

const TileButton = (props) => {
  return (
    <Link to={props.to} onClick={props.onClick}>
      <button className={styles.tile}>
        {props.children}
        {props.text}
      </button>
    </Link>
  );
};

export default TileButton;
