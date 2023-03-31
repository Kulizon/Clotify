import { useLocation } from "react-router";

import styles from "./Header.module.css";

import HistoryControls from "./HistoryControls/HistoryControls";
import ProfileMenu from "./ProfileMenu/ProfileMenu";
import SearchBox from "./SearchBox/SearchBox";
import Categories from "./Categories/Categories";

const Header = () => {
  const location = useLocation();

  const libraryPathnames = [
    "/library",
    "/library/playlists",
    "/library/podcasts",
    "/library/authors",
    "/library/albums",
  ];

  return (
    <header className={`${styles.header} ${location.pathname === "/search" && styles.search}`}>
      <HistoryControls></HistoryControls>
      {location.pathname === "/search" ? <SearchBox></SearchBox> : <></>}
      {libraryPathnames.includes(location.pathname) ? <Categories></Categories> : <></>}
      <ProfileMenu></ProfileMenu>
    </header>
  );
};

export default Header;
