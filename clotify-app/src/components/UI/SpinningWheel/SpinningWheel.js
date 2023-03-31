import styles from "./SpinningWheel.module.css";

const SpinningWheel = (props) => {
  let content = <></>;

  props.isLoading &&
    (content = (
      <div className={styles["lds-spinner"] + " " + props.className}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    ));

  return content;
};

export default SpinningWheel;
