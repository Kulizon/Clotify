import styles from "./HistoryControls.module.css";

import LeftArrowIcon from "./../../../assets/HeaderIcons/LeftArrowIcon";
import RightArrowIcon from "./../../../assets/HeaderIcons/RightArrowIcon";

const HistoryControls = () => {
  return (
    <div className={styles["history-controls"]}>
      <button
        onClick={() => {
          window.history.go(-1);
        }}
      >
        <LeftArrowIcon></LeftArrowIcon>
      </button>
      <button
        onClick={() => {
          window.history.go(1);
        }}
      >
        <RightArrowIcon></RightArrowIcon>
      </button>
    </div>
  );
};

export default HistoryControls;
