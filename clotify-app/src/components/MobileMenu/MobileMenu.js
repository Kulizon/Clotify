import { Link } from "react-router-dom";

import HomeIcon from "../../assets/AsideIcons/HomeIcon";
import LibraryIcon from "../../assets/AsideIcons/LibraryIcon";
import SearchIcon from "../../assets/AsideIcons/SearchIcon";

import styles from "./MobileMenu.module.css";

const MobileMenu = () => {
  return (
    <div className={styles["mobile-menu"]}>
      <Link to="/home">
        <button>
          <HomeIcon></HomeIcon>
          Home
        </button>
      </Link>
      <Link to="/library/playlists">
        <button>
          <LibraryIcon></LibraryIcon>
          Library
        </button>
      </Link>
      <Link to="/search">
        <button>
          <SearchIcon></SearchIcon>
          Search
        </button>
      </Link>
    </div>
  );
};

export default MobileMenu;
