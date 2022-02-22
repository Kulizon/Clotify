import styles from "./UserCatalogue.module.css";

import PlaylistCatalogue from "../PlaylistCatalogue/PlaylistCatalogue";
import Display from "../../../UI/Display/Display";

const UserCatalogue = (props) => {
  return (
    <div className={styles["user-catalogue"]}>
      {props.featuredSongs.length > 0 && (
        <>
          <h2>Favourite Songs</h2>
          <PlaylistCatalogue songs={props.featuredSongs} hidePlay={true} hideFrame={true}></PlaylistCatalogue>
        </>
      )}

      {props.featuredAlbums.length > 0 && <Display heading="Favourite Albums" items={props.featuredAlbums}></Display>}
    </div>
  );
};

export default UserCatalogue;
