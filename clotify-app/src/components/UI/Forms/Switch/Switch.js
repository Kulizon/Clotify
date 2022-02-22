import styles from "./Switch.module.css";

const Switch = (props) => {
  return (
    <div className={styles.switch}>
      <label>{props.children}</label>
      <div>
        <input type="checkbox" ref={props.inputRef}></input>
        <span></span>
      </div>
    </div>
  );
};

export default Switch;
