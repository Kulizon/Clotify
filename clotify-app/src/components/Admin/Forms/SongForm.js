import { Navigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useRef, useState } from "react";
import { fetchAdminData } from "../../../store/admin";
import hostUrl from "../../../utilities/data/hostUrl";

import TextInput from "./Inputs/TextInput/TextInput";
import Dropdown from "./Inputs/Dropdown/Dropdown";
import AddButtons from "./AddButtons/AddButtons";

const SongForm = (props) => {
  const dispatch = useDispatch();
  const params = useParams();
  const nameRef = useRef();
  const audioRef = useRef();
  const songLengthRef = useRef();
  const authorRef = useRef();
  const albumRef = useRef();

  const [navigateRoute, setNavigateRoute] = useState();

  let { authors, albums } = useSelector((state) => state.admin.data);
  if (!authors || !albums) return <></>;

  authors = authors.map((a) => {
    return { value: a._id, label: a.name };
  });

  albums = albums.map((a) => {
    return { value: a._id, label: `${a.author} - ${a.name}`, img: a.image };
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!nameRef.current.value || !audioRef.current.value) return;

    const albumImage = albums.filter((a) => a.value === albumRef.current.props.value)[0].img;

    const newSong = {
      name: nameRef.current.value,
      audio: audioRef.current.value,
      songLength: songLengthRef.current.value,
      image: albumImage,
      author: authorRef.current.props.placeholder,
      authorID: authorRef.current.props.value,
      album: albumRef.current.props.placeholder.split("-")[1],
      albumID: albumRef.current.props.value,
    };

    let url = `${hostUrl}/songs/create`;

    if (props.toChange) url = `${hostUrl}/songs/update/${params.id}`;

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(newSong),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    fetchAdminData(dispatch);

    if (result.code === 200) {
      if (e.nativeEvent.submitter.id === "featured") setNavigateRoute("/admin/list/songs");
      else if (e.nativeEvent.submitter.id === "normal") {
        nameRef.current.value = "";
        audioRef.current.value = "";
        songLengthRef.current.value = "";
        authorRef.current.setValue("");
        albumRef.current.setValue("");
      }
    } else {
      console.log(result.message);
    }
  };

  const songInfo = props.songToChange;

  return (
    <>
      {navigateRoute && <Navigate to={navigateRoute}></Navigate>}
      <form onSubmit={submitHandler}>
        <TextInput label="Name:" name="name" inputRef={nameRef} defaultValue={songInfo && songInfo.name}></TextInput>
        <TextInput
          label="Song Length:"
          inputRef={songLengthRef}
          defaultValue={songInfo && songInfo.songLength}
        ></TextInput>
        <TextInput label="Audio:" inputRef={audioRef} defaultValue={songInfo && songInfo.audio}></TextInput>
        <Dropdown
          label="Author:"
          options={authors}
          inputRef={authorRef}
          defaultValue={songInfo && { label: songInfo.author, value: songInfo.authorID }}
          className={songInfo && "disabled"}
        ></Dropdown>
        <Dropdown
          label="Album:"
          options={albums}
          inputRef={albumRef}
          defaultValue={songInfo && { label: songInfo.album, value: songInfo.albumID }}
          className={songInfo && "disabled"}
        ></Dropdown>
        <AddButtons></AddButtons>
      </form>
    </>
  );
};

export default SongForm;
