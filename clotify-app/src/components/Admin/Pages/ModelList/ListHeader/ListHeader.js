import styles from "./ListHeader.module.css";

const ListHeader = (props) => {
  return (
    <div className={styles.header + " " + props.className}>
      <div></div>
      <h4>NAME</h4>
      {props.isAlbum && <h4>ALBUM</h4>}
      {props.isAuthor && <h4>AUTHOR</h4>}
      <h4>ID</h4>
    </div>
  );
};

export default ListHeader;
