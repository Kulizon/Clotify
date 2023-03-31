import { useRef } from "react";
import { useNavigate } from "react-router";

import styles from "./Categories.module.css";

import Select from "react-select";
import CategoryTile from "./CategoryTile/CategoryTile";

const options = [
  { value: "playlists", label: "Playlists" },
  { value: "podcasts", label: "Podcasts" },
  { value: "albums", label: "Albums" },
  { value: "authors", label: "Authors" },
];

const Categories = () => {
  const navigate = useNavigate();
  const categoryRef = useRef();

  const changeCategoryHandler = () => {
    navigate(`/library/${categoryRef.current.state.focusedOption.value}`);
  };

  return (
    <>
      <ul className={styles.categories}>
        <CategoryTile category="Playlists"></CategoryTile>
        <CategoryTile category="Podcasts"></CategoryTile>
        <CategoryTile category="Authors"></CategoryTile>
        <CategoryTile category="Albums"></CategoryTile>
      </ul>
      <Select
        options={options}
        placeholder="Playlists"
        defaultValue="playlists"
        ref={categoryRef}
        className={styles["categories-dropdown"]}
        onChange={changeCategoryHandler}
 
      />
    </>
  );
};

export default Categories;
