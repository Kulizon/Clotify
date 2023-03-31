import { useLocation } from "react-router";
import { Link } from "react-router-dom";

import styles from "./CategoryTile.module.css";

const CategoryTile = (props) => {
  const location = useLocation();

  const pathName = props.category.toLowerCase();

  return (
    <Link to={"/library/" + pathName}>
      <li className={`${styles.tile} ${location.pathname === "/library/" + pathName ? styles.active : ""}`}>
        {props.category}
      </li>
    </Link>
  );
};

export default CategoryTile;
