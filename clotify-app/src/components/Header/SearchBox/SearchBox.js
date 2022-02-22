import { useRef } from "react";
import { useDispatch } from "react-redux";
import { homeActions } from "../../../store/home";
import hostUrl from "../../../utilities/data/hostUrl";

import styles from "./SearchBox.module.css";

import Select from "react-select";
import SearchIcon from "../../../assets/HeaderIcons/SearchIcon";

const options = [
  { value: "Song", label: "Songs" },
  { value: "Album", label: "Albums" },
  { value: "Author", label: "Authors" },
  { value: "Playlist", label: "Playlists" },
  { value: "Podcast", label: "Podcasts" },
  { value: "Episode", label: "Episodes" },
  { value: "User", label: "Users" },
];

const SearchBox = () => {
  const dispatch = useDispatch();
  const searchQueryRef = useRef();
  const typeRef = useRef();

  const searchHandler = async (e) => {
    e.preventDefault();
    const searchQuery = searchQueryRef.current.value;
    const type = typeRef.current.getValue()[0];

    if (!searchQuery) return;
    if (!type) return;

    dispatch(homeActions.startSearching());

    const response = await fetch(`${hostUrl}/search`, {
      method: "POST",
      body: JSON.stringify({ searchQuery, type }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (result.code === 200) {
      dispatch(homeActions.setSearchResult(result));
      dispatch(homeActions.setIsSearched(true));
      dispatch(homeActions.stopSearching());
    }
  };

  return (
    <form onSubmit={searchHandler} className={styles["search-box"]}>
      <input type="text" ref={searchQueryRef} placeholder="Artists, songs or podcasts" />
      <button>
        <SearchIcon></SearchIcon>
      </button>
      <Select options={options} placeholder="Type" ref={typeRef} />
    </form>
  );
};

export default SearchBox;
