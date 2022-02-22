import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { homeActions } from "../../../store/home";

import styles from "./Search.module.css";

import Display from "../../UI/Display/Display";
import SpinningWheel from "../../UI/SpinningWheel/SpinningWheel";

const Search = () => {
  const dispatch = useDispatch();
  const { searchResult, isSearched, isSearching } = useSelector((state) => state.home);

  const searchHistory = useSelector((state) => state.user.user.history);

  useEffect(() => {
    return () => {
      dispatch(homeActions.setIsSearched(false));
    };
  }, [dispatch]);

  const results = [];

  if (isSearched) {
    searchResult.results.forEach((r) => {
      results.push({ ...r, type: searchResult.type.toLowerCase().slice(0, -1) });
    });
  }

  return (
    <main className={`main ${styles.search}`}>
      <SpinningWheel isLoading={isSearching} className={styles.loading}></SpinningWheel>
      {isSearched ? (
        searchResult.results.length > 0 ? (
          <Display
            heading={`${searchResult.results.length} ${
              searchResult.results.length > 1
                ? searchResult.type.toLowerCase()
                : searchResult.type.toLowerCase().slice(0, -1)
            } found for "${searchResult.query}".`}
            items={results.reverse()}
            countToHistory={true}
          ></Display>
        ) : (
          <h1>{`No ${searchResult.type.toLowerCase()} were found for "${searchResult.query}". Try another search.`}</h1>
        )
      ) : searchHistory.length > 0 ? (
        <Display heading="Recent Searches" items={[...searchHistory].reverse()} history={true}></Display>
      ) : (
        <h1>No recent searches. Try searching for something.</h1>
      )}
    </main>
  );
};

export default Search;
