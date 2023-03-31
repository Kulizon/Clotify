import { Link } from "react-router-dom";

import styles from "./FeaturedContainer.module.css";

const FeaturedContainer = (props) => {
  return (
    <Link to={props.to} className={`${styles["featured-container"]} ${props.alternative ? styles.alternative : ""}`}>
      <div>
        {props.description}
        <div>
          <h3>{props.heading}</h3>
          <h4>{props.subheading}</h4>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedContainer;
