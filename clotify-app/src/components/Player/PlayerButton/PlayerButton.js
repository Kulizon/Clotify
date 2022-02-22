import styles from "./PlayerButton.module.css";

const PlayerButton = (props) => {
  return (
    <button
      onClick={props.onClick}
      className={`${styles.button} ${props.featured ? styles.featured : ""}`}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default PlayerButton;
