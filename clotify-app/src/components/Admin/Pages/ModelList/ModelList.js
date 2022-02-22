import { useSelector } from "react-redux";
import { useParams } from "react-router";

import styles from "./ModelList.module.css";

import ListItem from "./ListItem/ListItem";
import AdminAside from "./../../AdminAside/AdminAside";
import ListHeader from "./ListHeader/ListHeader";

const ModelList = () => {
  const params = useParams();
  const items = useSelector((state) => state.admin.data[params.model]);

  if (!items || items.length < 1)
    return (
      <main className={styles.main}>
        <AdminAside></AdminAside>
        <div>
          <h1>No {params.model} has been found.</h1>
        </div>
      </main>
    );

  const isAlbum = items[0].album ? true : false;
  const isAuthor = items[0].author ? true : false;

  let gridColNum = 4;
  if (!isAlbum) gridColNum -= 1;
  if (!isAuthor) gridColNum -= 1;

  return (
    <main className={styles.main}>
      <AdminAside></AdminAside>
      <div>
        <ListHeader
          className={`${styles["grid"]} ${styles["grid-" + gridColNum]}`}
          isAlbum={isAlbum}
          isAuthor={isAuthor}
        ></ListHeader>
        <article>
          {items.map((item) => (
            <ListItem
              className={`${styles["grid"]} ${styles["grid-" + gridColNum]}`}
              name={item.name}
              album={item.album}
              albumID={item.albumID}
              author={item.author}
              authorID={item.authorID}
              id={item._id}
              key={item._id}
              hideLink={params.model === "users"}
            ></ListItem>
          ))}
        </article>
      </div>
    </main>
  );
};

export default ModelList;
