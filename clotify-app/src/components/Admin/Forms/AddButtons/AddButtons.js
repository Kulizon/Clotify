import styles from "./AddButtons.module.css";

const AddButtons = (props) => {
  return (
    <div className={styles.buttons}>
      <button id="normal">Save and add another</button>
      <button id="featured" className={styles.featured}>
        SAVE
      </button>
    </div>
  );
};

export default AddButtons;
