import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../../../store/user";


import styles from "./AuthorCatalogue.module.css";

import PlaylistCatalogue from "../PlaylistCatalogue/PlaylistCatalogue";
import Display from "./../../../UI/Display/Display";

const AuthorCatalogue = (props) => {
  const dispatch = useDispatch();

  const albums = props.albums.map((a) => {
    return { ...a, type: "album" };
  });

  const following = useSelector((state) => state.user.user.following);

  const isFollowing = following.includes(props.id);

  const followHandler = () => {
    dispatch(userActions.follow(props.id));
  };

  const unfollowHandler = () => {
    dispatch(userActions.unfollow(props.id));
  };

  return (
    <div className={styles["author-catalogue"]}>
      <div className={styles.buttons}>
        {!isFollowing ? (
          <button className={styles["follow-button"]} onClick={followHandler}>
            Follow
          </button>
        ) : (
          <button className={styles["follow-button"] + " " + styles["following"]} onClick={unfollowHandler}>
            Following
          </button>
        )}
      </div>
      <PlaylistCatalogue songs={props.songs} hidePlay={true} hideFrame={true}></PlaylistCatalogue>
      <Display heading="Albums" items={albums}></Display>
    </div>
  );
};

export default AuthorCatalogue;
