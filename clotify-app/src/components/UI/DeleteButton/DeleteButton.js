import styles from "./DeleteButton.module.css";

import DeleteIcon from "./../../../assets/UI/DeleteIcon";

const DeleteButton = (props) => {
  return (
    <button className={styles.button + " " + props.className} onClick={props.onClick}>
      <DeleteIcon></DeleteIcon>
    </button>
  );
};

export default DeleteButton;
