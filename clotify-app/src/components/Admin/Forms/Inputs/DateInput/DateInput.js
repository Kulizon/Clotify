import styles from "./DateInput.module.css";

const DateInput = (props) => {
  const [year, month, day] = props.defaultValue ? props.defaultValue.date.split("-") : ["", "", ""];

  return (
    <div className={styles["form-group"] + " " + props.className}>
      <label htmlFor="">{props.label}</label>
      <div>
        <input
          type="date"
          ref={props.inputRef.dateRef}
          defaultValue={`${year}-${month}-${
            Number.isInteger(parseInt(day.substring(0, 2))) ? day.substring(0, 2) : day.substring(0, 1)
          }`}
        />
      </div>
    </div>
  );
};

export default DateInput;
