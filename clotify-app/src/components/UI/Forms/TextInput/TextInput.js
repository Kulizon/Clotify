import styles from "./TextInput.module.css";

const TextInput = (props) => {
  const type = props.type ? props.type : "text";

  return (
    <input
      type={type}
      className={styles.input}
      ref={props.inputRef}
      placeholder={props.placeholder}
      defaultValue={props.defaultValue}
    />
  );
};

export default TextInput;
