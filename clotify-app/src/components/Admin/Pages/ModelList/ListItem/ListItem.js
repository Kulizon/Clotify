import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { fetchAdminData } from "./../../../../../store/admin";
import hostUrl from "../../../../../utilities/data/hostUrl";

import styles from "./ListItem.module.css";

import DeleteIcon from "./../../../../../assets/UI/DeleteIcon";

const ListItem = (props) => {
  const { model } = useParams();
  const dispatch = useDispatch();

  const deleteHandler = async () => {
    await fetch(`${hostUrl}/${model}/delete`, {
      method: "POST",
      body: JSON.stringify({ id: props.id, albumID: props.albumID, authorID: props.authorID }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    fetchAdminData(dispatch);
  };

  return (
    <div className={styles.item + " " + props.className}>
      <DeleteIcon onClick={deleteHandler}></DeleteIcon>
      {!props.hideLink ? (
        <Link to={`/admin/change/${model}/${props.id}`}>
          <h4>{props.name}</h4>
        </Link>
      ) : (
        <h4>{props.name}</h4>
      )}
      {props.album && <h4>{props.album}</h4>}
      {props.author && <h4>{props.author}</h4>}
      <h4>{props.id}</h4>
    </div>
  );
};

export default ListItem;
