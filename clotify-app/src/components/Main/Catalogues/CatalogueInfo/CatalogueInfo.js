import styles from "./CatalogueInfo.module.css";

const CatalogueInfo = (props) => {
  return (
    <div className={styles["info"]}>
      <div className={styles["image-wrap"]}>
        {(props.type === "playlist" || props.type === "user") && !props.image ? (
          <div className={`${styles["image-placeholder"]} ${props.type === "user" && styles.circle}`}>
            <p>{props.heading}</p>
          </div>
        ) : (
          <img
            src={props.image}
            alt="Cover"
            className={props.type === "author" ? "circle" : props.type === "podcast" ? "rounded" : ""}
          />
        )}
        <div>
          {props.type === "artist-playlist" ||
            (props.type === "mix" && (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                  <path
                    fill={`#${props.mixColor}`}
                    fillOpacity="1"
                    d="M0,320L40,298.7C80,277,160,235,240,234.7C320,235,400,277,480,298.7C560,320,640,320,720,282.7C800,245,880,171,960,117.3C1040,64,1120,32,1200,69.3C1280,107,1360,213,1400,266.7L1440,320L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"
                  ></path>
                </svg>{" "}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                  <path
                    fill={`#${props.mixColor}`}
                    fillOpacity="1"
                    d="M0,32L30,58.7C60,85,120,139,180,154.7C240,171,300,149,360,133.3C420,117,480,107,540,117.3C600,128,660,160,720,160C780,160,840,128,900,96C960,64,1020,32,1080,21.3C1140,11,1200,21,1260,37.3C1320,53,1380,75,1410,85.3L1440,96L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
                  ></path>
                </svg>
                <h5>
                  {props.type === "artist-playlist"
                    ? "Artist Mix " + props.heading.slice(-1)
                    : "Daily Mix " + props.heading.slice(-1)}
                </h5>
              </>
            ))}
        </div>
      </div>
      <div>
        <div
          className={
            styles["catalogue-info"] +
            " " +
            (props.type === "author" && props.type === "user" ? styles["user-space"] : "")
          }
        >
          <h4>{props.type.split("-").join([" "]).toUpperCase()}</h4>
          <h2>{props.heading}</h2>
        </div>
        {props.type !== "author" && props.type !== "user" && (
          <div className={styles["user-info"]}>
            {!props.authorProfilePicture ? <div></div> : <img src={props.authorProfilePicture} alt="Profile"></img>}
            <p>
              <span>{props.author}</span> • {props.amount}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CatalogueInfo;
