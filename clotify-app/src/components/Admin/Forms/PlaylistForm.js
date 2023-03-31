import { useSelector, useDispatch } from "react-redux";
import { useState, useRef } from "react";
import { Navigate, useParams } from "react-router";
import { fetchAdminData } from "../../../store/admin";
import hostUrl from "../../../utilities/data/hostUrl";

import TextInput from "./Inputs/TextInput/TextInput";
import Dropdown from "./Inputs/Dropdown/Dropdown";
import AddButtons from "./AddButtons/AddButtons";

const PlaylistForm = (props) => {
  const dispatch = useDispatch();
  const nameRef = useRef();
  const imageRef = useRef();
  const authorRef = useRef();
  const songsRef = useRef();

  const [navigateRoute, setNavigateRoute] = useState();

  const params = useParams();

  let { songs, users } = useSelector((state) => state.admin.data);
  if (!songs || !users) return <></>;

  let songsDropdown = [...songs];
  songsDropdown = songsDropdown.map((a) => {
    return { value: a._id, label: `${a.author} - ${a.name}` };
  });

  users = users.map((u) => {
    return { value: u._id, label: u.name };
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!nameRef.current.value) return;

    const selectedSongs = [...songsRef.current.getValue().map((s) => s.value)];
    const playlistSongs = [];

    songs.forEach((s) => {
      if (selectedSongs.includes(s._id)) playlistSongs.push({ ...s });
    });

    const newPlaylist = {
      name: nameRef.current.value,
      image: imageRef.current.value,
      author: authorRef.current.props.placeholder,
      authorID: authorRef.current.props.value,
      songs: playlistSongs.map((s) => {
        return { ...s };
      }),
      type: "playlist",
      isFromAdmin: true,
    };

    let url = `${hostUrl}/playlists/create`;

    if (props.toChange) url = `${hostUrl}/playlists/update/${params.id}`;

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(newPlaylist),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();

    fetchAdminData(dispatch);

    if (result.code === 200) {
      if (e.nativeEvent.submitter.id === "featured") setNavigateRoute("/admin/list/playlists");
      else if (e.nativeEvent.submitter.id === "normal") {
        nameRef.current.value = "";
        imageRef.current.value = "";
        authorRef.current.setValue("");
        songsRef.current.setValue([]);
      }
    } else {
      console.log(result.message);
    }
  };

  const playlistInfo = props.playlistToChange;

  return (
    <>
      {navigateRoute && <Navigate to={navigateRoute}></Navigate>}

      <form onSubmit={submitHandler}>
        <TextInput label="Name:" inputRef={nameRef} defaultValue={playlistInfo && playlistInfo.name}></TextInput>
        <TextInput label="Image:" inputRef={imageRef} defaultValue={playlistInfo && playlistInfo.image}></TextInput>
        <Dropdown
          label="Author:"
          options={users}
          inputRef={authorRef}
          defaultValue={playlistInfo && { label: playlistInfo.author, value: playlistInfo.authorID }}
          className={playlistInfo && "disabled"}
        ></Dropdown>
        <Dropdown
          label="Songs:"
          options={songsDropdown}
          inputRef={songsRef}
          defaultValue={
            playlistInfo && { label: playlistInfo.songs.map((s) => s.name), value: playlistInfo.songs.map((s) => s.id) }
          }
          isMulti={true}
          className={playlistInfo && "disabled"}
        ></Dropdown>

        <AddButtons></AddButtons>
      </form>
    </>
  );
};

export default PlaylistForm;
