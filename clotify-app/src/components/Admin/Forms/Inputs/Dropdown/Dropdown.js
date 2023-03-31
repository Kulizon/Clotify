import { useState } from "react";
import Select from "react-select";

import styles from "./Dropdown.module.css";
const Dropdown = (props) => {
  const [selectedOption, setSelectedOption] = useState(props.defaultValue && props.defaultValue.value);
  const [selectedLabel, setSelectedLabel] = useState(props.defaultValue && props.defaultValue.label);

  return (
    <div className={styles["form-group"] + " " + props.className}>
      <label htmlFor="">{props.label}</label>
      <Select
        ref={props.inputRef}
        value={
          !props.isMulti
            ? selectedOption
            : selectedOption
            ? selectedOption.map((o, i) => {
                return { value: o, label: selectedLabel[i] };
              })
            : null
        }
        defaultValue={props.defaultValue && { value: props.defaultValue }}
        placeholder={
          selectedLabel
            ? selectedLabel
            : `Select ${props.label.slice(0, 1).toLowerCase() + props.label.slice(1, -1)}...`
        }
        onChange={(e) => {
          if (props.isMulti) {
            setSelectedOption(e.map((o) => o.value));
            setSelectedLabel(e.map((o) => o.label));
            return;
          }

          setSelectedOption(e.value);
          setSelectedLabel(e.label);
        }}
        options={props.options}
        isMulti={props.isMulti}
      />
    </div>
  );
};

export default Dropdown;
