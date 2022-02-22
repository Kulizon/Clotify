import styles from "./TextInput.module.css";

const TextInput = (props) => {
  return (
    <div className={styles["form-group"]}>
      <label htmlFor={props.name}>{props.label}</label>
      <input type="text" name={props.name} ref={props.inputRef} defaultValue={props.defaultValue} />
    </div>
  );
};

export default TextInput;
