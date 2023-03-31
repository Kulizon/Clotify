import { useSelector } from "react-redux";
import useWindowDimensions from "../../../../utilities/hooks/useWIndowDimensions";

import styles from "./Latest.module.css";

import GlassTile from "./GlassTile/GlassTile";

const Latest = (props) => {
  const listeningHistory = useSelector((state) => state.user.user.listeningHistory);
  const { width } = useWindowDimensions();

  let items = [...listeningHistory];

  if (width > 1700) {
    items = items.slice(0, 8);
  } else if (width > 1350) {
    items = items.slice(0, 6);
  } else {
    items = items.slice(0, 4);
  } 

  return (
    <div className={styles["latest"]}>
      {listeningHistory.length > 0 ? (
        [...items]
          .reverse()
          .map((i) => (
            <GlassTile
              key={i.id}
              image={i.image}
              text={i.name}
              author={i.author}
              to={`/library/${i.type}/${i.id}`}
              type={i.type}
              audio={i.audio}
              songs={i.songs}
            ></GlassTile>
          ))
      ) : (
        <h4>You haven't listened to anything yet. Try searching for your favourite songs.</h4>
      )}
    </div>
  );
};

export default Latest;
