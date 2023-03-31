import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router";
import { useNavigate, Navigate } from "react-router-dom";
import { userActions } from "../../store/user";
import { useEffect } from "react";
import hostUrl from "../../utilities/data/hostUrl";

import Home from "./Home/Home";
import Search from "./Search/Search";
import Library from "./Library/Library";

import generateArtistPlaylist from "./../../utilities/generateArtistPlaylist";
import generateDailyMixes from "./../../utilities/generateDailyMixes";
import { homeActions } from "../../store/home";

const Main = () => {
  const redirect = useNavigate();
  const currentUser = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const userID = localStorage.getItem("userID");

  useEffect(() => {
    const checkForUser = async () => {
      if ((userID || userID) && !currentUser._id !== "null") {
        const response = await fetch(`${hostUrl}/users/${userID}`);
        const result = await response.json();

        dispatch(userActions.setCurrentUser({ ...result }));

        redirect("/home");
      }
    };

    checkForUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const fetchSongs = async () => {
      if (!currentUser || !currentUser._id) return;

      generateDailyMixes(dispatch, currentUser.playlists, currentUser._id);

      let i = 0;
      const usedAuthorsIDs = [];

      const initialArtistID = await generateArtistPlaylist(dispatch, usedAuthorsIDs);
      usedAuthorsIDs.push(initialArtistID);

      while (true) {
        const artistID = await generateArtistPlaylist(dispatch, usedAuthorsIDs);
        if (artistID) {
          i += 1;
          usedAuthorsIDs.push(artistID);
        }
        if (i === 2) break;
      }
    };

    fetchSongs();

    return () => {
      dispatch(homeActions.resetData());
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!currentUser && !currentUser._id && userID && userID !== "null") {
    return <></>;
  } else if (!currentUser || !currentUser._id) {
    return <Navigate to="/login" />;
  }

  return (
    <Routes>
      <Route path="/home" element={<Home></Home>}></Route>
      <Route path="/search" element={<Search></Search>}></Route>
      <Route path="/library" element={<Library></Library>}>
        <Route path=":type" element={<Library></Library>}>
          <Route path=":id" element={<Library></Library>} />
        </Route>
      </Route>

      <Route path="*" exact element={<Navigate to="/home" />}></Route>
    </Routes>
  );
};

export default Main;
