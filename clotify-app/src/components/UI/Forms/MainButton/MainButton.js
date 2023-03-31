import styles from "./MainButton.module.css";

const MainButton = (props) => {
  return (
    <button onClick={props.onClick} className={styles.button + " " + props.className}>
      {props.children}
    </button>
  );
};

export default MainButton;
